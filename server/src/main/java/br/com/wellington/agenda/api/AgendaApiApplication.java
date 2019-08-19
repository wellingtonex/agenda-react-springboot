package br.com.wellington.agenda.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.com.wellington.agenda.api.config.property.AgendaApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(AgendaApiProperty.class)
public class AgendaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendaApiApplication.class, args);
	}
}
