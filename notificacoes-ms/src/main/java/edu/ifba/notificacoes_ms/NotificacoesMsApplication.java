package edu.ifba.notificacoes_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class NotificacoesMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificacoesMsApplication.class, args);
	}

}
