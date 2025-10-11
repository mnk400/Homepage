# Jellyfin Media Server

## Overview
Jellyfin is a free and open-source media server that organizes and streams your personal media collection.

## Quick Access
- **Web Interface**: http://localhost:8096
- **Default Admin**: Create during first setup

## Features
- **Media Streaming**: Movies, TV shows, music, and photos
- **Transcoding**: Automatic format conversion for different devices
- **User Management**: Multiple user accounts with permissions
- **Mobile Apps**: Available for iOS, Android, and other platforms

## Common Tasks

### Adding Media Libraries
1. Go to Dashboard → Libraries
2. Click "Add Media Library"
3. Select content type (Movies, TV Shows, Music, etc.)
4. Set the folder path where your media is stored
5. Configure metadata providers

### Transcoding Settings
- Hardware acceleration can be enabled in Dashboard → Playback
- Supports Intel QuickSync, NVIDIA NVENC, AMD VCE
- Adjust quality settings based on your server capabilities

## Mobile Access
- Download Jellyfin app from your device's app store
- Connect using your server's IP address and port
- Use the same login credentials as the web interface

## Troubleshooting
- Check server logs in Dashboard → Logs
- Verify media file permissions and formats
- Ensure firewall allows port 8096
- For remote access, configure port forwarding or reverse proxy