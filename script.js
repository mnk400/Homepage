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
        // Try to load from external config first, then fallback to default
        const configPaths = [
            '/config/services.json',     // External config (Docker volume)
            'default-config/services.json' // Default config
        ];
        
        for (const configPath of configPaths) {
            try {
                console.log(`Attempting to load services from: ${configPath}`);
                const response = await fetch(configPath);
                
                if (response.ok) {
                    const data = await response.json();
                    this.services = data.services;
                    this.configPath = configPath.includes('/config/') ? '/config/' : 'default-config/';
                    console.log(`✓ Successfully loaded services from: ${configPath}`);
                    this.updateServiceCount();
                    return;
                }
            } catch (error) {
                console.warn(`Failed to load from ${configPath}:`, error.message);
            }
        }
        
        console.error('❌ Failed to load services from any configuration source');
        this.services = [];
        this.configPath = 'default-config/';
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
        
        // Try to load docs from external config first, then fallback to default
        const docsPaths = [
            `/config/${service.docs.replace('docs/', '')}`,  // External config docs
            `default-config/${service.docs}`                 // Default config docs
        ];
        
        for (const docsPath of docsPaths) {
            try {
                console.log(`Attempting to load docs from: ${docsPath}`);
                const response = await fetch(docsPath);
                
                if (response.ok) {
                    const markdown = await response.text();
                    const html = marked.parse(markdown);
                    docsContent.innerHTML = html;
                    console.log(`✓ Successfully loaded docs from: ${docsPath}`);
                    return;
                }
            } catch (error) {
                console.warn(`Failed to load docs from ${docsPath}:`, error.message);
            }
        }
        
        // If all attempts failed
        docsContent.innerHTML = `
            <p>❌ Failed to load documentation for ${service.name}</p>
            <p>Tried paths:</p>
            <ul>
                ${docsPaths.map(path => `<li><code>${path}</code></li>`).join('')}
            </ul>
            <p>Make sure the documentation file exists in your config directory.</p>
        `;
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