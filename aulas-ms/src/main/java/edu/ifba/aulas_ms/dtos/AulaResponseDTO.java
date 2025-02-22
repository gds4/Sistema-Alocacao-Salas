package edu.ifba.aulas_ms.dtos;

import java.time.LocalTime;

import edu.ifba.aulas_ms.models.Aula;

public record AulaResponseDTO(Long id, Long turmaId, Long salaId, String diaSemana, LocalTime horarioInicio, Integer duracao, Long professorId) {

  public AulaResponseDTO(Aula aula){
    this(aula.getId(), aula.getTurmaId(), aula.getSalaId(), aula.getDiaSemana().toString(), aula.getHorarioInicio(), aula.getDuracao(), aula.getProfessorId());
  }
}
