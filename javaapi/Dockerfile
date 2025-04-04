# Use OpenJDK 17 based on Debian for compatibility with apt-get
FROM openjdk:17-slim AS BUILD_IMAGE
WORKDIR /usr/src/app/

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy the application source
COPY ./ /usr/src/app/

# Build the application, skipping tests
RUN mvn install -DskipTests

# Use OpenJDK 17 for runtime
FROM openjdk:17-slim
WORKDIR /usr/src/app/

# Copy the built JAR file from the build stage
COPY --from=BUILD_IMAGE /usr/src/app/target/book-work-0.0.1-SNAPSHOT.jar ./book-work-0.0.1.jar

# Expose the application port
EXPOSE 9000

# Start the application
ENTRYPOINT ["java", "-jar", "book-work-0.0.1.jar"]
