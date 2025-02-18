package edu.ifba.aulas_ms.dtos;

import java.time.LocalTime;

import edu.ifba.aulas_ms.models.Aula;

public record AulaResponseDTO(Long id, Long disciplinaId, Long salaId, String diaSemana, LocalTime horarioInicio, Integer duracao) {

  public AulaResponseDTO(Aula aula){
    this(aula.getId(), aula.getDisciplinaId(), aula.getSalaId(), aula.getDiaSemana().toString(), aula.getHorarioInicio(), aula.getDuracao());
  }
}
