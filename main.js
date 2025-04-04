fetch('data.json')
.then(response => {
    return response.json();
})
.then(data => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("project");
    const page = projectId == null ? "main" : "project-detetail";

    if (page === "main") {
      renderNav();
      renderMainPage(data);
    } else {
      renderNav();
      const p = data.projects.find((p) => p.id == projectId);
      console.log("project=", p);
      renderProjectDetails(p);
    }
})

//already have navbar..

function renderProfileSection(data) {
    return `
      <section class="box profile">
        <img
          class="pfp"
          src="${data.about.photo}"
          alt="Profile Image of ${data.about.name}"
        />
        <h1 class="name-header">${data.about.name}</h1>
        <h2 class="title-header">${data.about.title}</h2>
        <h3 class="contact-header ul">Contact info</h3>
        <p>
          <i class="fa-solid fa-square-envelope"></i>
          <a class="mylinks shift-link" href="mailto:${data.about['email-url']}">
            Email: ${data.about['email-url']}
          </a>
          <br />
          <i class="fa fa-github" aria-hidden="true"></i>
          <a class="mylinks shift-link" href="${data.about['git1-url']}">
            Github: Hllx
          </a>
          <br />
          <i class="fa fa-github" aria-hidden="true"></i>
          <a class="mylinks shift-link" href="${data.about['git2-url']}">
            Github: Old Account
          </a>
          <br />
          <i class="fa fa-linkedin-square" aria-hidden="true"></i>
          <a class="mylinks shift-link" href="${data.about['linkedin-url']}">
            LinkedIn: Profile Page
          </a>
        </p>
      </section>`;
}

function renderBioSection(data) {
    return `
      <section class="box bio">
        <div class="card text-bg-light mb-3">
          <div class="card-body">
            <h5 class="card-title about-header">About Me</h5>
            <p class="card-text">
              ${data.about.bio.text}
            </p>
            <p class="card-text">
              <small class="text-muted">${data.about.bio["update-date"]}</small>
            </p>
          </div>
        </div>
      </section>`;
}
  
function renderNewsSection(data) {
    const newsItems = data.news.map(item => {
      return `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">${item.title}</div>
                  ${item.date}
                </div>
              </li>`;
    }).join("");
    return `
      <section class="box news">
        <h2 class="news-header">News</h2>
        <ol class="list-group">
          ${newsItems}
        </ol>
      </section>`;
}
  
function renderProjectsSection(data) {
    const projectsItems = data["project-summary"].map(project => {
      let optionalLink = "";
      if (project["optional-link"] && project["optional-link"].src) {
        optionalLink = `<a class="mylinks shift-link" href="${project["optional-link"].src}">
                          <i class="fa fa-code-fork" aria-hidden="true"></i> Github
                        </a>`;
      }
      return `<div class="project-item">
                <h3 class="text-bg-light">
                  <a class="mylinks" href="?project=${project.id}">
                    ${project.title}
                  </a>
                </h3>
                <ul>
                  <li>
                    <b>Function:</b>
                    <p>${project["function-text"]}</p>
                  </li>
                  <li>
                    <b>Purpose:</b>
                    <p>${project["purpose-text"]}</p>
                    ${optionalLink}
                  </li>
                </ul>
              </div>`;
    }).join("");
    return `
      <section class="box projects">
        <h2>Projects</h2>
        ${projectsItems}
      </section>`;
}

function renderMainPage(data) {
    const profileSection = renderProfileSection(data);
    const bioSection = renderBioSection(data);
    const newsSection = renderNewsSection(data);
    const projectsSection = renderProjectsSection(data);
  
    const mainContent = `
      <main class="cont">
        ${profileSection}
        ${bioSection}
        ${newsSection}
        ${projectsSection}
      </main>`;
    
    document.querySelector("main").innerHTML = mainContent;
}
  