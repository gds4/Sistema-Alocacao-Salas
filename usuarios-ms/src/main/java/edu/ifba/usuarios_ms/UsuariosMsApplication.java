package edu.ifba.usuarios_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class UsuariosMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsuariosMsApplication.class, args);
	}

}
