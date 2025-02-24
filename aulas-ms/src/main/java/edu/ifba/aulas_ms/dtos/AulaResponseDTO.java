package edu.ifba.aulas_ms.dtos;

import java.time.LocalTime;

import edu.ifba.aulas_ms.models.Aula;
import io.swagger.v3.oas.annotations.media.Schema;

public record AulaResponseDTO(
  @Schema(name = "id", example = "1")Long id, 
  @Schema(name = "turmaId", example = "2")Long turmaId,
  @Schema(name = "salaId", example = "3")Long salaId, 
  @Schema(name = "diaSemana", example = "Segunda-feira")String diaSemana,
  @Schema(name = "horarioInicio", example = "08:00") LocalTime horarioInicio, 
  @Schema(name = "duracao", example = "50")Integer duracao,
  @Schema(name = "professorId", example = "4") Long professorId) {

  public AulaResponseDTO(Aula aula){
    this(aula.getId(), aula.getTurmaId(), aula.getSalaId(), aula.getDiaSemana().toString(), aula.getHorarioInicio(), aula.getDuracao(), aula.getProfessorId());
  }
}
