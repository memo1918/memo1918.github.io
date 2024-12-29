document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('project-list');
    const projectDetails = document.getElementById('project-details');
    const projectContent = document.getElementById('project-content');
    const backButton = document.getElementById('back-button');


    const template = `
    <h1> {{title}} </h1>

    <div class="image">
        <img src="https://placehold.co/100" alt="Placeholder Image">
    </div>
    <br><br>
    
    <h3> Project Description?</h3>
    <br>    
    <div class="text">
        <p>{{description}}</p>
    </div>
    <br><br>

    <h3> Details</h3>
    <br>
    <div class="text">
        <p>{{details}}</p>
    </div>
    `;

    const projects = {
        project1: {
            title: 'Project 1',
            description: 'Detailed information about Project 1.',
            details: 'This project is about...'
        },
        project2: {
            title: 'Project 2',
            description: 'Detailed information about Project 2.',
            details: 'This project is about...'
        },
        project3: {
            title: 'Project 3',
            description: 'Detailed information about Project 3.',
            description: 'This project is about...'
        }
    };

    

    // loads the project details based on the project id
    function loadProjectDetails(projectId) {
        const project = projects[projectId];
        if (project) {
            const content = template
                .replace('{{title}}', project.title)
                .replace('{{description}}', project.description)
                .replace('{{details}}', project.details);
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

    // listens for hash changes and gets it if exists
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && projects[hash]) {
            loadProjectDetails(hash);
        } else {
            showProjectList();
        }
    });

    // Makes the back button clear hash and go back to the project list
    backButton.addEventListener('click', function() {
        window.location.hash = '';
    });

    // Load the initial state based on the current hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && projects[initialHash]) {
        loadProjectDetails(initialHash);
    } else {
        showProjectList();
    }
});