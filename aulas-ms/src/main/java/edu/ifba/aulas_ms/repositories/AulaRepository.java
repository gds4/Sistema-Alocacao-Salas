package edu.ifba.aulas_ms.repositories;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.ifba.aulas_ms.enums.DiaSemana;
import edu.ifba.aulas_ms.enums.Semestre;
import edu.ifba.aulas_ms.models.Aula;

public interface AulaRepository extends JpaRepository<Aula, Long> {

    @Query(value = "SELECT * FROM aula a " +
    "WHERE a.sala_id = :salaId " +
    "  AND a.dia_semana = :diaSemana " +
    "  AND a.semestre = :semestreName " + 
    "  AND (a.horario_inicio < :horarioFim " +
    "       AND (a.horario_inicio + (a.duracao * interval '1 minute')) > :horarioInicio)",
    nativeQuery = true)
List<Aula> buscarConflitos(@Param("salaId") Long salaId,
                           @Param("diaSemana") String diaSemana,
                           @Param("horarioInicio") LocalTime horarioInicio,
                           @Param("horarioFim") LocalTime horarioFim,
                           @Param("semestreName") String semestreName);

    
    List<Aula> findBySalaId(Long salaId);
    List<Aula> findByTurmaId(Long salaId);
    List<Aula> findByProfessorId(Long professorId);
    List<Aula> findByTurmaIdIn(List<Long> ids);
    List<Aula> findByProfessorIdAndDiaSemana(Long professorId, DiaSemana diaSemana);
    List<Aula> findByProfessorIdAndDiaSemanaAndSemestre(Long professorId, DiaSemana diaSemana, Semestre semestre);

}