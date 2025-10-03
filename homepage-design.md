# Homelab Homepage Design Document

## Overview
A simple static homepage for accessing homelab services with integrated documentation support.

## Requirements
- Easy to maintain and extend
- Minimal UI and codebase
- Service documentation via markdown files
- Quick access to service links

## Architecture

### File Structure
```
homelab-homepage/
├── index.html          # Main page
├── style.css           # Styling
├── script.js           # JavaScript logic
├── services.json       # Service configuration
└── docs/               # Service documentation
    ├── service1.md
    └── service2.md
```

### Technology Stack
- **Frontend**: Plain HTML/CSS/JavaScript
- **Markdown Parser**: marked.js (CDN)
- **Data Storage**: JSON file
- **Documentation**: Markdown files

## Data Structure

### services.json
```json
{
  "services": [
    {
      "name": "Service Name",
      "category": "category",
      "url": "http://ip:port",
      "docs": "docs/service.md",
      "description": "Brief description"
    }
  ]
}
```

## Features

### Core Features
- Click-to-access service links
- Documentation display system

## Aesthetic
- Minimal Terminal inspired UI
- Refer to inspo.png

### Documentation System
- Markdown files for each service (if needed)
- Client-side parsing with marked.js
- Modal display for documentation
- Support for runbooks, setup notes, troubleshooting

## Implementation Plan

1. Create basic HTML structure
2. Add CSS for grid layout and modal
3. Implement JavaScript for:
   - Loading services from JSON
   - Rendering service cards
   - Fetching and displaying markdown docs
4. Add sample services and documentation

## Maintenance
- Add new services: Update `services.json` and create corresponding `.md` file
- Remove services: Delete from JSON and remove `.md` file
- Update documentation: Edit relevant `.md` files