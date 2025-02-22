package com.ifba.edu.turmas_ms.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ifba.edu.turmas_ms.dtos.DisciplinaDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Disciplina {

	// Atributos
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(name = "id", example = "1", description = "Identificador único da disciplina")
    private Long id;
    
    
    @Column(nullable = false, length = 10)
    @NotNull(message = "O código não pode ser nulo")
    @Size(min = 3, max = 10, message = "O código deve ter entre 3 e 10 caracteres")
    @Schema(name = "codigo", example = "INF012", description = "Código da disciplina")
    private String codigo;

    
    @Column(nullable = false, length = 100)
    @NotNull(message = "O nome não pode ser nulo")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    @Schema(name = "nome", example = "Matemática", description = "Nome da disciplina")
    private String nome;
    
    @JsonIgnore
    @OneToMany(mappedBy = "disciplina")
    private List<Turma> turmas;
    
   // Constructors
    
		public Disciplina(){
			super();
		}

    public Disciplina(Long id, String codigo, String nome) {
    	super();
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
    }
    
    
    public Disciplina(DisciplinaDTO disciplinaDTO) {
    	super();
    	this.id = disciplinaDTO.id();
        this.codigo = disciplinaDTO.codigo();
        this.nome = disciplinaDTO.nome();
    }

    // Métodos
    
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCodigo() {
		return codigo;
	}


	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}

	
	public DisciplinaDTO toDto() {
		return new DisciplinaDTO(
			this.id,
			this.codigo,
			this.nome
		);
	}
	
}
