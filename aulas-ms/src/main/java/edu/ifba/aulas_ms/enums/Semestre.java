package edu.ifba.aulas_ms.enums;

public enum Semestre {
    SEGUNDO_2024("2024.2"),
    PRIMEIRO_2025("2025.1");

    private final String descricao;

    Semestre(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static Semestre fromDescricao(String descricao) {
        for (Semestre s : Semestre.values()) {
            if (s.getDescricao().equals(descricao)) {
                return s;
            }
        }
        return null;
    }
}