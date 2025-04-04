# Use a stable and updated OpenJDK version for building the application
FROM openjdk:17 AS BUILD_IMAGE
WORKDIR /usr/src/app/

# Install required packages
RUN apt update && apt install -y maven && rm -rf /var/lib/apt/lists/*

# Copy only essential files first for better caching
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy the rest of the application files
COPY ./ ./

# Build the application, skipping tests for faster build
RUN mvn install -DskipTests

# Use a clean runtime image
FROM openjdk:17
WORKDIR /usr/src/app/

# Copy the built JAR file from the build stage
COPY --from=BUILD_IMAGE /usr/src/app/target/book-work-0.0.1-SNAPSHOT.jar ./book-work-0.0.1.jar

# Expose application port
EXPOSE 9000

# Start the application
ENTRYPOINT ["java", "-jar", "book-work-0.0.1.jar"]
