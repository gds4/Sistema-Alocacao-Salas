package com.ifba.edu.turmas_ms.models;

import com.ifba.edu.turmas_ms.dtos.TurmaDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Turma {
	
	// Atributos
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Schema(name = "id", example = "1", description = "Identificador único da turma")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "disciplina_id", nullable = false)
	@NotNull(message = "A disciplina não pode ser nula")
	private Disciplina disciplina;

	@Column(nullable = false, length = 14)
	@Size(min = 6, max = 12, message = "O semestre da turma deve ter entre 6 e 12 caracteres")
	private String semestre;

    @Column(nullable = false)
	private Long idProfessor;

    // Constructors

	public Turma(){
		super();
	}
   
	public Turma(Long id, Disciplina disciplina, String semestre, Long id_professor) {
		super();
		this.id = id;
		this.disciplina = disciplina;
		this.semestre = semestre;
		this.idProfessor = id_professor;
	}
	
	
	public Turma(TurmaDTO turmaDTO) {
		super();
		this.id = turmaDTO.id();
		this.disciplina = new Disciplina(turmaDTO.disciplinaDTO());
		this.semestre = turmaDTO.semestre();
		this.idProfessor = turmaDTO.idProfessor();
	}

    
	// Métodos
    
	public Long getId() {
		return id;
	}

	
	public void setId(Long id) {
		this.id = id;
	}

	
	public Disciplina getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(Disciplina disciplina) {
		this.disciplina = disciplina;
	}
	

	public String getSemestre() {
		return semestre;
	}

	
	public void setSemestre(String semestre) {
		this.semestre = semestre;
	}
	

	public Long getIdProfessor() {
		return idProfessor;
	}

	
	public void setIdProfessor(Long id_professor) {
		this.idProfessor = id_professor;
	}
	

}
