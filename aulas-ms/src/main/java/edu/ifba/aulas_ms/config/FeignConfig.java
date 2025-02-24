package edu.ifba.aulas_ms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import feign.RequestInterceptor;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            // Aqui você pega o token do contexto de segurança
            String token = getTokenFromSecurityContext(); 
            requestTemplate.header("Authorization", "Bearer " + token);
        };
    }

    private String getTokenFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getCredentials() != null) {
            return (String) authentication.getCredentials();
        }
        return null;
    }
}