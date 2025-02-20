package com.ifba.edu.turmas_ms.dtos;

import com.ifba.edu.turmas_ms.models.Disciplina;

import io.swagger.v3.oas.annotations.media.Schema;

public record DisciplinaDTO(
    @Schema(name = "id", example = "1", description = "Identificador único da disciplina") Long id,
    @Schema(name = "código", example = "INF012", description = "Código da disciplina") String codigo,
    @Schema(name = "nome", example = "Matemática", description = "Nome da disciplina") String nome)
{	
	
    public DisciplinaDTO(Disciplina disciplina) {
		this(
			disciplina.getId(),
			disciplina.getCodigo(),
			disciplina.getNome());
	}
    
    
}
