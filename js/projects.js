document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('project-list');
    const projectDetails = document.getElementById('project-details');
    const projectContent = document.getElementById('project-content');
    const backButton = document.getElementById('back-button');


    const template = `
    <h1> {{title}} </h1>
    <div class="image"><img src="{{image}}" alt="Image" style="width:100px;height:100px;"> </div>
    <br><br>
    <h3> Project Description</h3>
    <br>    
    <div class="text"><p>{{description}}</p></div>
    <br><br>
    <h3> Details</h3>
    <br>
    <div class="text"><p>{{details}}</p></div>`;

    const colors = ["#cb680bcf","#7c35decf","#d63605cf","#2ec4b5dc"];

    let projects = {};

    function loadProjects() {
        fetch('../data/projects.json')
            .then(response => response.json())
            .then(data => {
                projects = data;
                initializePage();
            })
            .catch(error => console.error('Error loading projects:', error));
    }
    

    // loads the project details based on the project id
    function loadProjectDetails(projectId) {
        const project = projects[projectId];
        if (project) {
            const content = template
                .replace('{{title}}', project.title)
                .replace('{{description}}', project.description)
                .replace('{{details}}', project.details)
                .replace('{{image}}', project.image);
            projectContent.innerHTML = content;
            projectList.style.display = 'none';
            projectDetails.style.display = 'block';
        }
    }

    // takes back to the project list
    function showProjectList() {
        projectList.style.display = 'block';
        projectDetails.style.display = 'none';
    }

    function createProjectCard(projectId, project) {

        const colorIndex = Object.keys(projects).indexOf(projectId) % colors.length;
        const color = colors[colorIndex];
        
        return `
            <div class="container mt-3">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <div class="compact-box d-flex align-items-center" style="background-color: ${color}; color: white;">
                            <div class="compact-image">
                                <img src="${project.image}" alt="Placeholder Image" style="width:80px;height:80px;"> </div>
                            <div class="compact-text ms-3">
                                <h4>${project.title}</h4>
                                <p>${project.description}</p> </div>
                            <div>
                                <button class="btn btn-warning" onclick="location.href='#${projectId}'">Project Details</button>
                            </div></div></div></div></div>`;
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
        for (const projectId in projects) {
            if (projects.hasOwnProperty(projectId)) {
                projectList.innerHTML += createProjectCard(projectId, projects[projectId]);
            }
        }
    }

    loadProjects();

});