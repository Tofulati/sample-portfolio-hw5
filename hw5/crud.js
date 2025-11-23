document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crud-form');
    const container = document.getElementById('crud-container');
    const idSelect = document.getElementById('id-select'); // new select element for IDs
    const typeSelect = form.querySelector('select[name="type"]');

    function loadData(type) {
        const data = JSON.parse(localStorage.getItem(type) || '[]');
        console.log(`[loadData] Loaded ${data.length} items from localStorage for type="${type}"`);
        return data;
    }

    function saveData(type, data) {
        localStorage.setItem(type, JSON.stringify(data));
        console.log(`[saveData] Saved ${data.length} items to localStorage for type="${type}"`);
        console.log(data);
        updateIdOptions(type, data);
    }

    function renderCards(type, data) {
        console.log(`[renderCards] Rendering ${data.length} cards for type="${type}"`);
        container.innerHTML = '';
        data.forEach(entry => {
            const cardTag = type === 'research' ? 'research-card' : 'project-card';
            const card = document.createElement(cardTag);
            card.data = entry;
            container.appendChild(card);
        });
    }

    function updateIdOptions(type, data) {
        // Clear current options
        idSelect.innerHTML = '<option value="">--Select ID--</option>';
        data.forEach(entry => {
            const option = document.createElement('option');
            option.value = entry.id;
            option.textContent = `${entry.title} (${entry.id})`;
            idSelect.appendChild(option);
        });
    }

    // Update ID dropdown whenever type changes
    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        const data = loadData(type);
        updateIdOptions(type, data);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const type = formData.get('type'); 
        const action = e.submitter.value;
        const selectedId = idSelect.value;

        console.log(`[submit] Action="${action}", Type="${type}"`);
        let data = loadData(type);

        const id = selectedId || Date.now().toString(); // use dropdown value or generate new

        const entry = {
            id,
            title: formData.get('title'),
            date: formData.get('date'),
            image: formData.get('image'),
            alt: formData.get('alt'),
            link: formData.get('link'),
            linkText: formData.get('linkText') || 'Learn More',
            tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [],
            description: formData.get('description') ? formData.get('description').split(';').map(d => d.trim()) : [],
            notes: formData.get('notes') ? formData.get('notes').split(';').map(n => n.trim()) : []
        };

        console.log('[submit] Entry to process:', entry);

        if(action === 'create') {
            data.push(entry);
            console.log('[submit] Entry created.');
        } else if(action === 'update') {
            const index = data.findIndex(d => d.id.toString() === id.toString());
            if(index !== -1) {
                data[index] = {...data[index], ...entry};
                console.log(`[submit] Entry updated at index ${index}.`);
            } else {
                console.warn(`[submit] Entry not found for update, ID="${id}"`);
                alert('Entry not found for update');
                return;
            }
        } else if(action === 'delete') {
            const lengthBefore = data.length;
            data = data.filter(d => d.id !== id);
            console.log(`[submit] Entry deleted, ${lengthBefore - data.length} removed.`);
        } else {
            console.warn(`[submit] Unknown action="${action}"`);
            return;
        }

        saveData(type, data);
        renderCards(type, data);
        form.reset();
    });

    // Initial render and ID options
    ['research','projects'].forEach(type => {
        const data = loadData(type);
        renderCards(type, data);
        if(type === typeSelect.value) updateIdOptions(type, data);
    });
});
