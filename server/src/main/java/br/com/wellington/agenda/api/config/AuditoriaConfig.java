package br.com.wellington.agenda.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import br.com.wellington.agenda.api.aud.AuditorAwareImpl;


@Configuration
@EnableJpaAuditing(auditorAwareRef="auditorProvider")
public class AuditoriaConfig {
     
    @Bean
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }
}