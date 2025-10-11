# Nextcloud

## Overview
Nextcloud is a self-hosted file sync and collaboration platform that gives you control over your data.

## Quick Access
- **Web Interface**: http://localhost:8080
- **Default Setup**: Create admin account during first run

## Core Features
- **File Sync**: Automatic synchronization across devices
- **Collaboration**: Share files and folders with others
- **Calendar & Contacts**: Built-in calendar and contact management
- **Office Suite**: Online document editing with Collabora or OnlyOffice

## Desktop & Mobile Apps
- **Desktop**: Available for Windows, macOS, and Linux
- **Mobile**: iOS and Android apps for file access and sync
- **WebDAV**: Access files through any WebDAV-compatible client

## Configuration

### Storage Setup
- Default data directory: `/var/www/html/data`
- External storage can be configured for S3, FTP, SMB, etc.
- Encryption can be enabled for sensitive data

### User Management
- Create users in Settings → Users
- Assign users to groups for easier permission management
- Set storage quotas per user or group

### Apps & Extensions
- Install apps from the Nextcloud App Store
- Popular apps: Calendar, Contacts, Mail, Talk, Deck
- Enable/disable apps in Settings → Apps

## Security
- Enable two-factor authentication for all users
- Use HTTPS with valid SSL certificates
- Regular backups of data and database
- Keep Nextcloud updated to latest version

## Troubleshooting
- Check logs in Settings → Logging
- Verify file permissions on data directory
- Ensure database connection is working
- Check PHP memory limits and execution time