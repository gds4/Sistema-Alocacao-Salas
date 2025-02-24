package edu.ifba.aulas_ms.dtos;

import java.util.Set;

public record NotificacaoTurmaDTO(TurmaDTO turma, Set<Long> professorIds) {
  
}
