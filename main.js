fetch('data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get("project");
        const page = projectId == null ? "main" : "project-page";

        renderNavBar(data)
        if (page === "main") {
            renderMainPage(data);
        } else {
            const p = data["project-pages"].find((p) => p.id == projectId);
            console.log("project=", p);
            renderProjectPage(p);
        }
    })

//navbar for all pages 
function renderNavBar(data) {
    const projects = data["project-summary"];

    const projectLinks = projects.map(project => {
        return `
        <li class="nav-item">
          <a class="nav-link" href="?project=${project.id}">
            ${project.bar_name}
          </a>
        </li>`;
    }).join("");

    const navHTML = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href=".">My Portfolio</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href=".">Home</a>
              </li>
              ${projectLinks}
            </ul>
          </div>
        </div>
      </nav>`;

    const body = document.querySelector("body");
    body.innerHTML = navHTML + body.innerHTML
}


//project page specific gen

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
    const main = document.querySelector("main");
    main.className = "cont"
    main.innerHTML = renderProfileSection(data);
    main.innerHTML += renderBioSection(data);
    main.innerHTML += renderNewsSection(data);
    main.innerHTML += renderProjectsSection(data)
}


//render project details section:

function renderProjectHeader(project) {
    const title = project.title;
    const date = project.date
    return `
      <section class="box header">
        <h1>${title}</h1>
        <p>${date}</p>
        </section>`;
}

function renderProjectPreview(project) {
    return `
      <section class="box project-preview">
        <figure class="figure">
          <img src="${project['image-path']}" class="figure-img img-fluid rounded" alt="${project['image-caption']}">
          <figcaption class="figure-caption">${project['image-caption']}</figcaption>
        </figure>
      </section>`;
}

function renderProjectDescription(project) {
    return `
      <section class="box project-description">
        <div class="card text-bg-light mb-3">
          <div class="card-body">
            <h5 class="card-title about-header">About This Project</h5>
            <p class="card-text">
              ${project.description}
            </p>
            <p class="card-text">
              <small class="text-muted">${project['description-date']}</small>
            </p>
          </div>
        </div>
      </section>`;
}

function renderTechnologies(project) {
    const techItems = project.technologies.map(tech => {
        return `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">${tech[0]}</div>
                  ${tech[1]}
                </div>
              </li>`;
    }).join("");
    return `
      <section class="box technologies">
        <h2>Technologies</h2>
        <ol class="list-group">
          ${techItems}
        </ol>
      </section>`;
}

function renderFeatures(project) {
    const featureItems = project.features.map(feature => `<li>${feature}</li>`).join("");
    return `
      <section class="box features">
        <h2>Features</h2>
        <ul>
          ${featureItems}
        </ul>
      </section>`;
}

function renderDevelopmentProcess(project) {
    return `
      <section class="box development-process">
        <h2>Development Process</h2>
        <p>${project['development-process']}</p>
      </section>`;
}

function renderFutureImprovements(project) {
    return `
      <section class="box future-improvements">
        <h2>Future Improvements</h2>
        <p>${project['future-improvements']}</p>
      </section>`;
}

function renderRepository(project) {
    return `
      <section class="box repository">
        <h2>Source Code</h2>
        <a target="_blank" class="mylinks ul" href="${project['repository-link']}">
          Source Code on Github
        </a>
      </section>`;
}


function renderProjectPage(pageData) {
    const main = document.querySelector("main");
    main.className = "project"

    main.innerHTML = renderProjectHeader(pageData);
    main.innerHTML += renderProjectPreview(pageData);
    main.innerHTML += renderProjectDescription(pageData);
    main.innerHTML += renderTechnologies(pageData);
    main.innerHTML += renderFeatures(pageData);
    main.innerHTML += renderDevelopmentProcess(pageData);
    main.innerHTML += renderFutureImprovements(pageData);
    main.innerHTML += renderRepository(pageData);
}