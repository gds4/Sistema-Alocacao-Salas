FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app
COPY . .
# Lista os arquivos após a cópia para debug
RUN ls -la
RUN mvn clean package -DskipTests
# Lista o conteúdo do diretório target após o build
RUN ls -la /app/target

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app


COPY --from=builder /app/target/app.jar app.jar
# Verifica se o JAR foi copiado
RUN ls -la
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]