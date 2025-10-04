# Use the official Nginx Alpine image for smaller size
FROM nginx:alpine

# Copy all website files to the Nginx html directory
COPY . /usr/share/nginx/html

# Create a custom Nginx configuration for better performance
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 6666
EXPOSE 6666

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]