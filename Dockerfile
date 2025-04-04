# Use the latest stable Node.js version for UI build
FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

# Use a stable Node.js version for API build
FROM node:18 AS server-build
WORKDIR /usr/src/app
COPY nodeapi/ ./nodeapi/
RUN cd nodeapi && npm install

# Final production image
FROM node:18
WORKDIR /usr/src/app/

# Copy the server build
COPY --from=server-build /usr/src/app/nodeapi/ ./

# Copy the UI build output
COPY --from=ui-build /usr/src/app/client/dist ./client/dist

# Verify the copied files
RUN ls -al

# Expose required ports
EXPOSE 4200
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
