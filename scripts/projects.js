class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    set data(project) {
        this.render(project);
    }

    render(project) {
        const { title='', date='', image='', alt='', link='', linkText='Learn More', tags=[], description=[], notes=[] } = project;

        this.innerHTML = '';
        this.className = 'project-entry';

        const entryHeader = document.createElement('header');
        entryHeader.className = 'entry-header';
        const h3 = document.createElement('h3'); h3.textContent = title;
        entryHeader.appendChild(h3);
        if(date){
            const dateSpan = document.createElement('span'); 
            dateSpan.className = 'date'; 
            dateSpan.textContent = date;
            entryHeader.appendChild(dateSpan);
        }
        this.appendChild(entryHeader);

        if(description.length > 0){
            const descUl = document.createElement('ul');
            description.forEach(d => {
                const li = document.createElement('li');
                li.textContent = d;
                descUl.appendChild(li);
            });
            this.appendChild(descUl);
        }

        if(tags.length > 0){
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'tags';
            tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagsDiv.appendChild(tagSpan);
            });
            this.appendChild(tagsDiv);
        }

        if(image){
            const picture = document.createElement('picture');
            const img = document.createElement('img');
            img.src = image;
            img.alt = alt;
            picture.appendChild(img);
            this.appendChild(picture);
        }

        if(link){
            const button = document.createElement('button');
            button.className = 'redirect-btn';
            button.textContent = linkText;
            button.onclick = () => window.open(link, '_blank');
            this.appendChild(button);
        }

        if(notes.length > 0){
            const notesUl = document.createElement('ul');
            notesUl.style.listStyle = 'circle';
            notes.forEach(n => {
                const li = document.createElement('li');
                li.innerHTML = `<em>${n}</em>`;
                notesUl.appendChild(li);
            });
            this.appendChild(notesUl);
        }
    }
}

customElements.define('project-card', ProjectCard);


document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('#projects-container');
    const loadLocalBtn = document.getElementById('load-local');
    const loadRemoteBtn = document.getElementById('load-remote');

    function renderProjects(projects) {
        projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const card = document.createElement('project-card');
            card.data = project;
            projectsContainer.appendChild(card);
        });
    }

    loadLocalBtn?.addEventListener('click', () => {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        renderProjects(projects);
    });

    loadRemoteBtn?.addEventListener('click', async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/Tofulati/sample-portfolio-hw5/projects');
            if(!response.ok) throw new Error('Failed to fetch projects');
            const projects = await response.json();

            renderProjects(projects);

            localStorage.setItem('projects', JSON.stringify(projects));
        } catch(err) {
            console.error(err);
            alert('Failed to load projects from remote server.');
        }
    });
});
