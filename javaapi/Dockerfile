# Use an updated OpenJDK version for building
FROM openjdk:17 AS BUILD_IMAGE
WORKDIR /usr/src/app/

# Update package lists and install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy the application source
COPY ./ /usr/src/app/

# Build the application, skipping tests
RUN mvn install -DskipTests

# Use an updated OpenJDK version for runtime
FROM openjdk:17
WORKDIR /usr/src/app/

# Copy the built JAR file from the build stage
COPY --from=BUILD_IMAGE /usr/src/app/target/book-work-0.0.1-SNAPSHOT.jar ./book-work-0.0.1.jar

# Expose the application port
EXPOSE 9000

# Start the application
ENTRYPOINT ["java", "-jar", "book-work-0.0.1.jar"]
