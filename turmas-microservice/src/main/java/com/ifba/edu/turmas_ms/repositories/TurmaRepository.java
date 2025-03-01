package com.ifba.edu.turmas_ms.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ifba.edu.turmas_ms.models.Disciplina;
import com.ifba.edu.turmas_ms.models.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    List<Turma> findByIdProfessor(Long idProfessor);
    List<Turma> findByIdIn(List<Long> ids);
    List<Turma> findByDisciplinaId(Long id);
    List<Turma> findBySemestre(String semestre);
    List<Turma> findByIdProfessorAndSemestre(Long idProfessor, String semestre);
    List<Turma> findByIdInAndSemestre(List<Long> ids, String semestre);
   
}
