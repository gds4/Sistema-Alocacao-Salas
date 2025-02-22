package com.ifba.edu.turmas_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class DisciplinaMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DisciplinaMsApplication.class, args);
	}
	

}
