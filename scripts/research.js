class ResearchCard extends HTMLElement {
    constructor() {
        super();
    }

    set data(research) {
        this.render(research);
    }

    render(research) {
        const { title='', date='', image='', alt='', link='', linkText='Learn More', tags=[], description=[], notes=[] } = research;

        this.innerHTML = '';
        this.className = 'research-entry';

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

customElements.define('research-card', ResearchCard);


document.addEventListener('DOMContentLoaded', () => {
    const researchContainer = document.querySelector('#research-container');
    const loadLocalBtn = document.getElementById('load-local');
    const loadRemoteBtn = document.getElementById('load-remote');

    function renderresearch(research) {
        researchContainer.innerHTML = '';
        research.forEach(research => {
            const card = document.createElement('research-card');
            card.data = research;
            researchContainer.appendChild(card);
        });
    }

    loadLocalBtn?.addEventListener('click', () => {
        const research = JSON.parse(localStorage.getItem('research') || '[]');
        renderresearch(research);
    });

    loadRemoteBtn?.addEventListener('click', async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/Tofulati/sample-portfolio-hw5/research');
            if(!response.ok) throw new Error('Failed to fetch research');
            const research = await response.json();

            renderresearch(research);

            localStorage.setItem('research', JSON.stringify(research));
        } catch(err) {
            console.error(err);
            alert('Failed to load research from remote server.');
        }
    });
});
