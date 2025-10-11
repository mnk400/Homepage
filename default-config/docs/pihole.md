# Pi-hole

## Overview
Pi-hole is a network-wide ad blocker that acts as a DNS sinkhole, blocking ads and trackers for all devices on your network.

## Quick Access
- **Admin Interface**: http://localhost:8081/admin
- **Default Password**: Set during installation (check logs if forgotten)

## Configuration

### DNS Settings
- **Primary DNS**: Configure your router to use Pi-hole's IP as DNS server
- **Upstream DNS**: Set reliable upstream DNS servers (Cloudflare, Google, etc.)
- **Conditional Forwarding**: Enable for local network name resolution

### Blocklists
- **Default Lists**: Pi-hole comes with curated blocklists
- **Additional Lists**: Add more blocklists from sources like:
  - StevenBlack's hosts
  - Malware Domain List
  - EasyList
- **Custom Blocking**: Add specific domains manually

## Network Setup

### Router Configuration
1. Access your router's admin panel
2. Find DNS settings (usually in DHCP or Network settings)
3. Set primary DNS to Pi-hole's IP address
4. Set secondary DNS to a backup (optional)
5. Save and restart router

### Device-Specific Setup
- **Windows**: Network adapter settings → DNS servers
- **macOS**: System Preferences → Network → Advanced → DNS
- **iOS/Android**: Wi-Fi settings → Configure DNS

## Monitoring
- **Query Log**: See all DNS requests in real-time
- **Statistics**: View blocking statistics and top domains
- **Network Scan**: Discover devices using Pi-hole
- **Long-term Data**: Historical blocking statistics

## Whitelist Management
- Add domains that are incorrectly blocked
- Whitelist can be temporary or permanent
- Use regex for pattern-based whitelisting
- Common whitelist candidates: streaming services, shopping sites

## Troubleshooting
- **Ads Still Showing**: Check if device is using Pi-hole DNS
- **Websites Breaking**: Check query log for blocked domains, whitelist if needed
- **Slow DNS**: Verify upstream DNS servers are responsive
- **High CPU Usage**: Consider reducing log retention or query logging