# AdGuard Home

## Overview
Network-wide ad blocker that provides DNS filtering for your entire network, blocking ads and trackers at the DNS level.

## Quick Access
- **Admin Interface**: http://localhost:3001
- **Default Setup**: Create admin account during first run

## Configuration

### Network Setup
- Set your router's DNS to point to AdGuard Home's IP address
- Or configure individual devices to use AdGuard Home as DNS server
- **DNS Port**: 53 (default)

### Blocklists
- **Built-in Filters**: AdGuard comes with curated blocklists
- **Additional Sources**: Add blocklists from:
  - AdGuard DNS filter
  - EasyList
  - Malware Domain List
  - StevenBlack's hosts
- **Custom Rules**: Add specific domains or patterns manually

## Features
- **Real-time Blocking**: Blocks ads, trackers, and malicious domains
- **Query Log**: Monitor all DNS requests in real-time
- **Statistics Dashboard**: View blocking stats and top clients
- **Parental Controls**: Block adult content and set safe search
- **Custom Upstream DNS**: Configure your preferred DNS providers

## Device Configuration

### Router Setup (Recommended)
1. Access router admin panel
2. Find DHCP/DNS settings
3. Set primary DNS to AdGuard Home's IP
4. Save and restart router

### Manual Device Setup
- **Windows**: Network settings → Change adapter options → DNS servers
- **macOS**: System Preferences → Network → Advanced → DNS
- **iOS**: Settings → Wi-Fi → Configure DNS
- **Android**: Settings → Network & Internet → Private DNS

## Management
- **Whitelist**: Add domains that are incorrectly blocked
- **Blacklist**: Block additional domains manually
- **Client Settings**: Configure per-device rules and settings
- **Backup/Restore**: Export configuration for backup purposes

## Troubleshooting
- **Websites Breaking**: Check query log, whitelist blocked domains if needed
- **Slow Browsing**: Verify upstream DNS servers are responsive
- **Not Blocking Ads**: Ensure devices are using AdGuard Home as DNS
- **High Memory Usage**: Reduce query log retention period