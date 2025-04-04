# Use an explicitly Ubuntu-based OpenJDK image for building
FROM openjdk:17-jdk AS build_image

# Set working directory
WORKDIR /usr/src/app/

# Install Maven and clean unnecessary files
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy Maven configuration files first to leverage caching
COPY pom.xml ./

# Download dependencies to speed up builds
RUN mvn dependency:go-offline

# Copy the full application source
COPY ./ ./

# Build the application, skipping tests for faster build times
RUN mvn install -DskipTests

# Use a minimal OpenJDK runtime image for running the app
FROM openjdk:17-jdk

# Set working directory
WORKDIR /usr/src/app/

# Copy the built JAR file from the build stage
COPY --from=build_image /usr/src/app/target/book-work-0.0.1-SNAPSHOT.jar ./book-work-0.0.1.jar

# Expose the application port
EXPOSE 9000

# Start the application
ENTRYPOINT ["java", "-jar", "book-work-0.0.1.jar"]
