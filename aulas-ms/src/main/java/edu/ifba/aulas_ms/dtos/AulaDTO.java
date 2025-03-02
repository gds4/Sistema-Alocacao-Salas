package edu.ifba.aulas_ms.dtos;

import java.time.LocalTime;

import edu.ifba.aulas_ms.enums.DiaSemana;
import io.swagger.v3.oas.annotations.media.Schema;

public record AulaDTO(
    @Schema(name = "turmaId", example = "1") Long turmaId,
    @Schema(name = "salaId", example = "3") Long salaId,
    @Schema(name = "diaSemana", example = "SEGUNDA") DiaSemana diaSemana,
    @Schema(name = "horarioInicio", example = "08:00") LocalTime horarioInicio,
    @Schema(name = "duracao", example = "50") Integer duracao,
    @Schema(name = "professorId", example = "4") Long professorId,
    @Schema(name = "semestre", example = "2025.1") String semestre
) {}
