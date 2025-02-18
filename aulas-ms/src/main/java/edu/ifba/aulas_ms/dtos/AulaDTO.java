package edu.ifba.aulas_ms.dtos;

import java.time.LocalTime;

import edu.ifba.aulas_ms.enums.DiaSemana;

public record AulaDTO(Long disciplinaId, Long salaId, DiaSemana diaSemana, LocalTime horarioInicio, Integer duracao) {
  
}
