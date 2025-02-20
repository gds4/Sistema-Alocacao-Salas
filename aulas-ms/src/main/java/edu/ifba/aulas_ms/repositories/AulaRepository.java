package edu.ifba.aulas_ms.repositories;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import edu.ifba.aulas_ms.models.Aula;

public interface AulaRepository extends JpaRepository<Aula, Long> {

    @Query(value = "SELECT * FROM aula a " +
    "WHERE a.sala_id = :salaId " +
    "  AND a.dia_semana = :diaSemana " +
    "  AND (a.horario_inicio < :horarioFim " +
    "       AND (a.horario_inicio + (a.duracao * interval '1 minute')) > :horarioInicio)",
    nativeQuery = true)
    List<Aula> buscarConflitos(@Param("salaId") Long salaId,
                @Param("diaSemana") String diaSemana,
                @Param("horarioInicio") LocalTime horarioInicio,
                @Param("horarioFim") LocalTime horarioFim);

    
    List<Aula> findBySalaId(Long salaId);
    List<Aula> findByProfessorId(Long professorId);

}