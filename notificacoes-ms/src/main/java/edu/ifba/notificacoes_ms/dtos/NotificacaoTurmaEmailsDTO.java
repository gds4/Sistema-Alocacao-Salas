package edu.ifba.notificacoes_ms.dtos;

import java.util.List;

public record NotificacaoTurmaEmailsDTO(TurmaDTO turma, List<String> emails) {

}
