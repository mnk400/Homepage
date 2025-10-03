// Homelab Homepage JavaScript


class HomelabDashboard {
    constructor() {
        this.services = [];
        this.docsPanel = document.getElementById('docs-panel');
        this.init();
    }

    async init() {
        this.displayRandomCat();
        await this.loadServices();
        this.renderServices();
        this.setupEventListeners();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    displayRandomCat() {
        const randomCat = ASCII_CATS[Math.floor(Math.random() * ASCII_CATS.length)];
        const headerTitle = document.querySelector('header h1');
        headerTitle.innerHTML = `<pre>${randomCat}</pre>`;
    }

    async loadServices() {
        try {
            const response = await fetch('services.json');
            const data = await response.json();
            this.services = data.services;
            this.updateServiceCount();
        } catch (error) {
            console.error('Failed to load services:', error);
            this.services = [];
        }
    }

    renderServices() {
        const grid = document.getElementById('services-grid');

        // Group services by category
        const categories = this.groupByCategory();

        grid.innerHTML = '';

        Object.keys(categories).forEach(category => {
            const categorySection = this.createCategorySection(category, categories[category]);
            grid.appendChild(categorySection);
        });
    }

    groupByCategory() {
        return this.services.reduce((acc, service) => {
            const category = service.category || 'misc';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(service);
            return acc;
        }, {});
    }

    createCategorySection(categoryName, services) {
        const section = document.createElement('div');
        section.className = 'category-section';

        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = categoryName;
        section.appendChild(title);

        services.forEach(service => {
            const serviceItem = this.createServiceItem(service);
            section.appendChild(serviceItem);
        });

        return section;
    }

    createServiceItem(service) {
        const item = document.createElement('a');
        item.className = 'service-item';
        item.href = service.url;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';

        const name = document.createElement('span');
        name.className = 'service-name';
        name.textContent = service.name;
        item.appendChild(name);

        if (service.docs) {
            const actions = document.createElement('div');
            actions.className = 'service-actions';

            const docsBtn = document.createElement('button');
            docsBtn.className = 'docs-btn';
            docsBtn.textContent = '?';
            docsBtn.title = 'View documentation';
            docsBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showDocs(service);
            };

            actions.appendChild(docsBtn);
            item.appendChild(actions);
        }

        return item;
    }

    async showDocs(service) {
        const docsTitle = document.getElementById('docs-title');
        const docsContent = document.getElementById('docs-content');

        docsTitle.textContent = `${service.name} Documentation`;
        docsContent.innerHTML = '<p>Loading documentation...</p>';

        // Open the docs panel
        this.docsPanel.classList.add('open');

        try {
            const response = await fetch(service.docs);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);
            docsContent.innerHTML = html;
        } catch (error) {
            docsContent.innerHTML = `
                <p>Failed to load documentation for ${service.name}</p>
                <p>Error: ${error.message}</p>
                <p>Expected file: ${service.docs}</p>
            `;
        }
    }

    setupEventListeners() {
        // Close docs panel when clicking the X
        const closeBtn = document.getElementById('close-docs');
        closeBtn.onclick = () => {
            this.docsPanel.classList.remove('open');
        };

        // Close docs panel with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.docsPanel.classList.contains('open')) {
                this.docsPanel.classList.remove('open');
            }
        });
    }

    updateServiceCount() {
        const countElement = document.getElementById('service-count');
        countElement.textContent = `${this.services.length} services available`;
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HomelabDashboard();
});