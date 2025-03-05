FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=builder /app/target/app.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]