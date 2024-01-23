document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file with error handling
  fetch("details.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Call the display functions with the loaded JSON data if available
      if (data) {
        displaySkills(data.skills);
        displayEducationTimeline(data.educationEvents);
        displayCompanies(data.companiesData);
        displayProjects(data.projectsData);
      } else {
        console.error("Empty JSON data received.");
      }
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // Function to display skills on the webpage
  const displaySkills = (skills) => {
    const skillsContainer = document.querySelector(".skills-container");

    skills.forEach((skill) => {
      const skillTile = document.createElement("div");
      skillTile.classList.add("skill-tile");

      skillTile.innerHTML = `
            <h3>${skill.title}</h3>
            <p>${skill.description}</p>
          `;

      skillsContainer.appendChild(skillTile);
    });
  };

  // Function to display education events on the webpage
  const displayEducationTimeline = (educationEvents) => {
    const timelineContainer = document.querySelector(".timeline");

    educationEvents.forEach((event) => {
      const educationEvent = document.createElement("div");
      educationEvent.classList.add("event");
      educationEvent.setAttribute("data-date", event.date);

      educationEvent.innerHTML = `
            <div class="university-image">
              <img src="${event.image}" alt="${event.name}" />
            </div>
            <div class="event-details">
              <div class="event-header">
                <div class="course-name">
                  ${event.name}
                  <div class="courseCompletion">${event.completion}</div>
                  <div class="aboutStudy">
                    <ul>${event.studyDetails
                      .map((detail) => `<li>${detail}</li>`)
                      .join("")}</ul>
                  </div>
                </div>
                <div class="courseSchool">
                  ${
                    event.schoolImage
                      ? `<span><img src="${event.schoolImage}" alt="${event.school}" /></span>`
                      : ""
                  }
                  <p>${event.school}</p>
                </div>
              </div>
            </div>
          `;

      timelineContainer.appendChild(educationEvent);
    });
  };

  // Function to display company profiles on the webpage
  const displayCompanies = (companiesData) => {
    const companiesContainer = document.querySelector(".allCompanies");

    companiesData.forEach((company) => {
      const companyProfile = document.createElement("div");
      companyProfile.classList.add("company");

      companyProfile.innerHTML = `
            <div class="company-image">
              <img src="${company.image}" alt="${company.companyTitle}" />
            </div>
            <div class="aboutCompany">
              <div class="role">
                <span>${company.role}</span>
              </div>
              <div class="companyTitle">${company.companyTitle}</div>
              <div class="companyTime">${company.companyTime}</div>
              <div class="about">
                <ul>${company.about
                  .map((detail) => `<li>${detail}</li>`)
                  .join("")}</ul>
              </div>
            </div>
          `;

      companiesContainer.appendChild(companyProfile);
    });
  };

  // Function to display project tiles on the webpage
  const displayProjects = (projectsData) => {
    const projectsContainer = document.querySelector(".projects-tiles");

    projectsData.forEach((project) => {
      const projectTile = document.createElement("a");
      projectTile.href = project.href;
      projectTile.target = "_blank";
      projectTile.classList.add("project-tile");

      projectTile.innerHTML = `
              <div class="preview">
                <img src="${project.previewSrc}" alt="${project.title} Project Preview" />
              </div>
              <div class="about">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
              </div>
            `;

      projectsContainer.appendChild(projectTile);
    });
  };
});
