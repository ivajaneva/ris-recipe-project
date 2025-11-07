# Use Java 17 base image (lightweight)
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built JAR file from the target folder into the container
# ⚠️ You’ll fix the JAR name here after you build the project
COPY target/vaja1Ris-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (the default Spring Boot port)
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
