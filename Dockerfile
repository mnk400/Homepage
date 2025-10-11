# Use the official Nginx Alpine image for smaller size
FROM nginx:alpine

# Copy all website files to the Nginx html directory
COPY . /usr/share/nginx/html

# Create a custom Nginx configuration for better performance
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create the config directory that can be mounted as a volume
RUN mkdir -p /config

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]