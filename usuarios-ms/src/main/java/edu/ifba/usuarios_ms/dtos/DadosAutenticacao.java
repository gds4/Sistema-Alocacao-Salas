package edu.ifba.usuarios_ms.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record DadosAutenticacao(
    @Schema(name = "email", example = "claudio@email.com") String email,
    @Schema(name = "senha", example = "123456") String senha) {
}
