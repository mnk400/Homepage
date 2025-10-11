// Homelab Homepage JavaScript


class LinkDashboard {
    constructor() {
        this.links = [];
        this.branding = {};
        this.docsPanel = document.getElementById('docs-panel');
        this.searchInput = document.getElementById('search-input');
        this.isLoading = false;
        this.init();
    }

    async init() {
        this.showLoading(true);
        await this.loadConfiguration();
        this.applyBranding();
        this.renderLinks();
        this.setupEventListeners();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        this.showLoading(false);
    }

    showLoading(isLoading) {
        this.isLoading = isLoading;
        const container = document.querySelector('.main-content');
        if (isLoading) {
            container.classList.add('loading');
        } else {
            container.classList.remove('loading');
        }
    }

    applyBranding() {
        // Update page title
        if (this.branding.title) {
            document.title = this.branding.title;
            const pageTitle = document.getElementById('page-title');
            pageTitle.textContent = `$ ${this.branding.title.toLowerCase()}`;
        }

        // Show/hide ASCII art
        if (this.branding.showAsciiArt !== false) {
            this.displayRandomCat();
        }
    }

    displayRandomCat() {
        const randomCat = ASCII_CATS[Math.floor(Math.random() * ASCII_CATS.length)];
        const headerTitle = document.querySelector('header h1');
        headerTitle.innerHTML = `<pre>${randomCat}</pre>`;
    }

    async loadConfiguration() {
        // Try to load from external config first, then fallback to default
        const configPaths = [
            '/config/links.json',     // External config (Docker volume)
            'default-config/links.json' // Default config
        ];

        for (const configPath of configPaths) {
            try {
                console.log(`Attempting to load configuration from: ${configPath}`);
                const response = await fetch(configPath);

                if (response.ok) {
                    const data = await response.json();
                    this.links = data.links || [];
                    this.branding = data.branding || {};
                    this.configPath = configPath.includes('/config/') ? '/config/' : 'default-config/';
                    console.log(`✓ Successfully loaded configuration from: ${configPath}`);
                    this.updateLinkCount();
                    return;
                }
            } catch (error) {
                console.warn(`Failed to load from ${configPath}:`, error.message);
            }
        }

        console.error('❌ Failed to load configuration from any source');
        this.showError('Failed to load configuration. Please check your setup.');
        this.links = [];
        this.branding = {};
        this.configPath = 'default-config/';
    }

    showError(message) {
        const grid = document.getElementById('links-grid');
        grid.innerHTML = `<div class="error-state">${message}</div>`;
    }

    renderLinks() {
        const grid = document.getElementById('links-grid');

        // Group links by category
        const categories = this.groupByCategory();

        grid.innerHTML = '';

        Object.keys(categories).forEach(category => {
            const categorySection = this.createCategorySection(category, categories[category]);
            grid.appendChild(categorySection);
        });
    }

    groupByCategory() {
        return this.links.reduce((acc, link) => {
            const category = link.category || 'misc';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(link);
            return acc;
        }, {});
    }

    createCategorySection(categoryName, links) {
        const section = document.createElement('div');
        section.className = 'category-section';

        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = categoryName;
        section.appendChild(title);

        links.forEach(link => {
            const linkItem = this.createLinkItem(link);
            section.appendChild(linkItem);
        });

        return section;
    }

    createLinkItem(link) {
        const item = document.createElement('a');
        item.className = 'link-item';
        item.href = link.url;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
        item.dataset.description = link.description || '';

        const name = document.createElement('span');
        name.className = 'link-name';
        name.textContent = link.name;
        name.title = link.description || '';
        item.appendChild(name);

        if (link.docs) {
            const actions = document.createElement('div');
            actions.className = 'link-actions';

            const docsBtn = document.createElement('button');
            docsBtn.className = 'docs-btn';
            docsBtn.textContent = '?';
            docsBtn.title = 'View documentation';
            docsBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showDocs(link);
            };

            actions.appendChild(docsBtn);
            item.appendChild(actions);
        }

        return item;
    }

    async showDocs(link) {
        const docsTitle = document.getElementById('docs-title');
        const docsContent = document.getElementById('docs-content');

        docsTitle.textContent = `${link.name} Documentation`;
        docsContent.innerHTML = '<p>Loading documentation...</p>';

        // Open the docs panel
        this.docsPanel.classList.add('open');

        // Try to load docs from external config first, then fallback to default
        const docsPaths = [
            `/config/${link.docs.replace('docs/', '')}`,  // External config docs
            `default-config/${link.docs}`                 // Default config docs
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
            <p>❌ Failed to load documentation for ${link.name}</p>
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

        // Search functionality
        this.searchInput.addEventListener('input', (event) => {
            this.filterLinks(event.target.value);
        });

        // Clear search on Escape
        this.searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.searchInput.value = '';
                this.filterLinks('');
            }
        });
    }

    filterLinks(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const categories = document.querySelectorAll('.category-section');

        categories.forEach(category => {
            const links = category.querySelectorAll('.link-item');
            let hasVisibleLinks = false;

            links.forEach(link => {
                const linkName = link.querySelector('.link-name').textContent.toLowerCase();
                const linkDesc = link.dataset.description?.toLowerCase() || '';

                if (term === '' || linkName.includes(term) || linkDesc.includes(term)) {
                    link.classList.remove('hidden');
                    hasVisibleLinks = true;
                } else {
                    link.classList.add('hidden');
                }
            });

            // Hide category if no links are visible
            if (hasVisibleLinks || term === '') {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        });
    }

    updateLinkCount() {
        const countElement = document.getElementById('link-count');
        countElement.textContent = `${this.links.length} links available`;
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
    new LinkDashboard();
});