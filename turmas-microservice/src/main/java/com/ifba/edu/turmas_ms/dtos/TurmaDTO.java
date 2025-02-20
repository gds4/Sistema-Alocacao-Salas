package com.ifba.edu.turmas_ms.dtos;

import com.ifba.edu.turmas_ms.models.Turma;

import io.swagger.v3.oas.annotations.media.Schema;

public record TurmaDTO(
	@Schema(name = "id", example = "1", description = "Identificador único da turma")Long id,
	@Schema(name = "disciplina", description = "Referência para a disciplina da turma") DisciplinaDTO  disciplinaDTO,
	@Schema(name = "semestre", example = "2024.2", description = "Semestre da disciplina") String semestre,
	@Schema(name = "idProfessor", example = "1", description = "ID do professor da disciplina") Long idProfessor)
{

	public TurmaDTO (Turma turma) {
		this(
			turma.getId(),
			turma.getDisciplina().toDto(),
			turma.getSemestre(),
			turma.getIdProfessor());
	}	
	

}
