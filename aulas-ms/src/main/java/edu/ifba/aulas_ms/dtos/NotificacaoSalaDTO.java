package edu.ifba.aulas_ms.dtos;

import java.util.Set;

public record NotificacaoSalaDTO(SalaDTO sala, Set<Long> professorIds) {
  
}
