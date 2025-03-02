package edu.ifba.usuarios_ms.dtos;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificacaoSalaEmailsDTO(
    @Schema(description = "Informações da sala associada à notificação.") SalaDTO sala,
    @Schema(description = "Lista de emails dos professores que receberão a notificação.", example = "[\"professor1@example.com\", \"professor2@example.com\"]") List<String> emails) {

}
