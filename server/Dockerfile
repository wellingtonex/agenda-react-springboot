FROM maven:3.6.1-jdk-8-alpine
COPY . /home/server
WORKDIR /home/server
RUN mvn spring-boot:run
EXPOSE 8080