class ResearchCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('data-title') || '';
        const date = this.getAttribute('data-date') || '';
        const image = this.getAttribute('data-image') || '';
        const alt = this.getAttribute('data-alt') || '';
        const link = this.getAttribute('data-link') || '';
        const linkText = this.getAttribute('data-link-text') || 'Learn More';
        const tagsStr = this.getAttribute('data-tags') || '';
        const tags = tagsStr ? tagsStr.split(',') : [];

        const descriptionSlot = this.querySelector('[slot="description"]');
        const notesSlot = this.querySelector('[slot="notes"]');

        const entryHeader = document.createElement('header');
        entryHeader.className = 'entry-header';
        
        const h3 = document.createElement('h3');
        h3.textContent = title;
        
        entryHeader.appendChild(h3);
        
        if (date) {
            const dateSpan = document.createElement('span');
            dateSpan.className = 'date';
            dateSpan.textContent = date;
            entryHeader.appendChild(dateSpan);
        }

        const descriptionUl = descriptionSlot ? descriptionSlot.cloneNode(true) : document.createElement('ul');
        descriptionUl.removeAttribute('slot');

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'tags';
        tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag.trim();
            tagsDiv.appendChild(tagSpan);
        });

        let picture = null;
        if (image) {
            picture = document.createElement('picture');
            const img = document.createElement('img');
            img.src = image;
            img.alt = alt;
            picture.appendChild(img);
        }

        let button = null;
        if (link) {
            button = document.createElement('button');
            button.className = 'redirect-btn';
            button.textContent = linkText;
            button.onclick = () => window.open(link, '_blank');
        }

        const notesUl = notesSlot ? notesSlot.cloneNode(true) : null;
        if (notesUl) notesUl.removeAttribute('slot');

        this.innerHTML = '';
        
        this.appendChild(entryHeader);
        this.appendChild(descriptionUl);
        if (tags.length > 0) this.appendChild(tagsDiv);
        if (picture) this.appendChild(picture);
        if (button) this.appendChild(button);
        if (notesUl) this.appendChild(notesUl);
    }
}
customElements.define('research-card', ResearchCard);