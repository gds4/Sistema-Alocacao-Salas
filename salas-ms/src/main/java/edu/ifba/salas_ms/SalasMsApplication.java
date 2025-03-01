package edu.ifba.salas_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SalasMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalasMsApplication.class, args);
	}

}
