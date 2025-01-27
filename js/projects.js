document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('project-list');
    const projectDetails = document.getElementById('project-details');
    const projectContent = document.getElementById('project-content');
    const backButton = document.getElementById('back-button');

    let projects = {};

    function loadProjects() {
        fetch('../data/projects.json')
            .then(response => response.json())
            .then(data => {
                projects = data.projects;
                initializePage();
            })
            .catch(error => console.error('Error loading projects:', error));
    }
    

    function loadProjectDetails(index) {
        const project = projects[index];
        if (project) {
            // Populate project details
            projectContent.innerHTML = `
                <h1>${project.title}</h1>
                <br><br>
                <div class="text"><p>${project.details}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" style="bottom:0px;">Project Link</a></div>
            `;
            projectList.style.display = 'none';
            projectDetails.style.display = 'block';
        }
    }

    // takes back to the project list
    function showProjectList() {
        projectList.style.display = 'block';
        projectDetails.style.display = 'none';
    }

    function createProjectCard(index, project) {
        return `
                <a class="box-link"  href="#${index}">
                <div class="compact-box d-flex align-items-center mt-3 " style="background-color: var(--background-color); color: var(--text-color);">
                 <!--
                 <div class="compact-image">
                    <img src="${project.image}" alt="Placeholder Image" "> </div>    
                    -->
                <div class="compact-text  ms-3">
                    <h3 class="header-with-line projeButton">${project.title}</h3>
                    <p>${project.description}</p> </div>

                </div> </a>`;
    }

    function initializePage() {
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            if (hash && projects[hash]) {
                loadProjectDetails(hash);
            } else {
                showProjectList();
            }
        });

        backButton.addEventListener('click', function() {
            window.location.hash = '';
        });

        const initialHash = window.location.hash.substring(1);
        if (initialHash && projects[initialHash]) {
            loadProjectDetails(initialHash);
        } else {
            showProjectList();
        }


        // Generate project cards
        projects.forEach((project, index) => {
            projectList.innerHTML += createProjectCard(index, project);
        });
    }

    loadProjects();

});