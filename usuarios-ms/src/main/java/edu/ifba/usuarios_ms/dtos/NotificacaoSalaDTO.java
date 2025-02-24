package edu.ifba.usuarios_ms.dtos;

import java.util.Set;

public record NotificacaoSalaDTO(SalaDTO sala, Set<Long> professorIds) {
  
}
