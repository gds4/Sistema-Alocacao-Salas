package edu.ifba.usuarios_ms.dtos;

import java.util.List;

public record NotificacaoTurmaEmailsDTO(TurmaDTO turma, List<String> emails) {

}
