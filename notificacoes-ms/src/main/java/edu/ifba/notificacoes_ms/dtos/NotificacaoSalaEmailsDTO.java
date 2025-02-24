package edu.ifba.notificacoes_ms.dtos;

import java.util.List;

public record NotificacaoSalaEmailsDTO(SalaDTO sala, List<String> emails) {
  
}
