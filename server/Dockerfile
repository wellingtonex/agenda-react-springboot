FROM maven:3.6.1-jdk-8-alpine
COPY . /home/server
WORKDIR /home/server/server
ENTRYPOINT mvn clean spring-boot:run
EXPOSE 8080