package edu.ifba.usuarios_ms.dtos;

import java.util.List;

public record NotificacaoSalaEmailsDTO(SalaDTO sala, List<String> emails) {
  
}
