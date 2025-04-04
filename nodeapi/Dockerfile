# Use a stable and updated Node.js version for building the API
FROM node:18 AS nodeapi-build
WORKDIR /usr/src/app

# Copy only package.json first to leverage Docker caching
COPY nodeapi/package*.json ./nodeapi/

# Install dependencies
RUN cd nodeapi && npm install

# Copy the rest of the application files
COPY ./ ./nodeapi/

# Final production image
FROM node:18
WORKDIR /usr/src/app/

# Copy built application from the previous stage
COPY --from=nodeapi-build /usr/src/app/nodeapi/ ./

# Debugging step to verify copied files
RUN ls -al

# Expose API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
