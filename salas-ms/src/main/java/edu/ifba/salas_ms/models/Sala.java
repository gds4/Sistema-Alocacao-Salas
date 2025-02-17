package edu.ifba.salas_ms.models;

import edu.ifba.salas_ms.dtos.SalaDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name="salas")
public class Sala {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	private String nome;
	
	
	public Sala() {
		
	}
	
	
	public Sala(Long id, String nome) {
		this.id = id;
		this.nome = nome;
	}
	
	public Sala(SalaDTO salaDTO) {
		this.id = salaDTO.id();
		this.nome = salaDTO.nome();
	}
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
	
	
	
}
