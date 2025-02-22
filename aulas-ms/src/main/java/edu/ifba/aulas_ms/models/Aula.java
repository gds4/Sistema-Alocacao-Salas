package edu.ifba.aulas_ms.models;

import java.time.LocalTime;

import edu.ifba.aulas_ms.dtos.AulaDTO;
import edu.ifba.aulas_ms.enums.DiaSemana;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long turmaId;
    private Long salaId;

    @Enumerated(EnumType.STRING)
    private DiaSemana diaSemana;

    private LocalTime horarioInicio; 
    
    private Integer duracao;

    private Long professorId;

    public Aula() {
    }

    public Aula(Long id, Long turmaId, Long salaId, DiaSemana diaSemana, LocalTime horarioInicio,
        Integer duracao, Long professorId) {
      this.id = id;
      this.turmaId = turmaId;
      this.salaId = salaId;
      this.diaSemana = diaSemana;
      this.horarioInicio = horarioInicio;
      this.duracao = duracao;
      this.professorId = professorId;
    }

    public Aula(AulaDTO auladto){
      this.turmaId = auladto.turmaId();
      this.salaId = auladto.salaId();
      this.diaSemana = auladto.diaSemana();
      this.horarioInicio = auladto.horarioInicio();
      this.duracao = auladto.duracao();
      this.professorId = auladto.professorId();
    }


    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public Long getTurmaId() {
      return turmaId;
    }

    public void setTurmaId(Long turmaId) {
      this.turmaId = turmaId;
    }

    public Long getSalaId() {
      return salaId;
    }

    public void setSalaId(Long salaId) {
      this.salaId = salaId;
    }

    public DiaSemana getDiaSemana() {
      return diaSemana;
    }

    public void setDiaSemana(DiaSemana diaSemana) {
      this.diaSemana = diaSemana;
    }

    public LocalTime getHorarioInicio() {
      return horarioInicio;
    }

    public void setHorarioInicio(LocalTime horarioInicio) {
      this.horarioInicio = horarioInicio;
    }

    public Integer getDuracao() {
      return duracao;
    }

    public void setDuracao(Integer duracao) {
      this.duracao = duracao;
    }

    public Long getProfessorId(){
      return professorId;
    }

    public void setProfessorId(Long professorId){
      this.professorId = professorId;
    }
    
   
}
