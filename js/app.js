// Application Entry Point

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing LinkDashboard...');
    try {
        new LinkDashboard();
    } catch (error) {
        console.error('Failed to initialize LinkDashboard:', error);
    }
});