package edu.ifba.salas_ms.dtos;

import edu.ifba.salas_ms.models.Sala;
import io.swagger.v3.oas.annotations.media.Schema;

public record SalaDTO(
	@Schema(name = "id", example = "1") Long id,
	@Schema(name = "nome", example = "Lab 5") String nome) {

	public SalaDTO(Sala sala) {
		this(sala.getId(), sala.getNome());
	}
}
