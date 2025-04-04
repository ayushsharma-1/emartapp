# Use an updated Node.js version for building the frontend
FROM node:latest AS web-build
WORKDIR /usr/src/app

# Copy the client source code
COPY ./ ./client

# Install dependencies and build the project
RUN cd client && npm install && npm run build

# Use a stable version of Nginx for serving the built frontend
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copy the built frontend files to the Nginx directory
COPY --from=web-build /usr/src/app/client/dist/client/ /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the required port
EXPOSE 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
