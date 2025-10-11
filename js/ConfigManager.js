// Configuration Manager for Link Dashboard

class ConfigManager {
    constructor() {
        this.links = [];
        this.branding = {};
        this.configPath = '';
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
                    return { success: true, data: { links: this.links, branding: this.branding } };
                }
            } catch (error) {
                console.warn(`Failed to load from ${configPath}:`, error.message);
            }
        }

        console.error('❌ Failed to load configuration from any source');
        this.links = [];
        this.branding = {};
        this.configPath = 'default-config/';
        return { success: false, error: 'Failed to load configuration. Please check your setup.' };
    }

    async loadDocs(link) {
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
                    console.log(`✓ Successfully loaded docs from: ${docsPath}`);
                    return { success: true, content: markdown };
                }
            } catch (error) {
                console.warn(`Failed to load docs from ${docsPath}:`, error.message);
            }
        }

        // If all attempts failed
        return {
            success: false,
            error: `Failed to load documentation for ${link.name}`,
            paths: docsPaths
        };
    }

    getLinks() {
        return this.links;
    }

    getBranding() {
        return this.branding;
    }

    getConfigPath() {
        return this.configPath;
    }
}