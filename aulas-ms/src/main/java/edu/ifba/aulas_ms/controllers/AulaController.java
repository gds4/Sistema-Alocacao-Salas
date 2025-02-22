package edu.ifba.aulas_ms.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.ifba.aulas_ms.dtos.AulaDTO;
import edu.ifba.aulas_ms.dtos.AulaResponseDTO;
import edu.ifba.aulas_ms.services.AulaService;

@RestController
@RequestMapping("/aulas")
public class AulaController {
  

  private AulaService aulaService;

  public AulaController(AulaService aulaService) {
    this.aulaService = aulaService;
  }

  @PostMapping
  public ResponseEntity<AulaResponseDTO> agendarAula(@RequestBody AulaDTO novaAula){
    AulaResponseDTO aulaAgendada = this.aulaService.agendarAula(novaAula);

    return ResponseEntity.created(null).body(aulaAgendada);
  }
  

  @PutMapping("/{id}")
  public ResponseEntity<AulaResponseDTO> editarAula(@PathVariable("id") Long id, @RequestBody AulaDTO novaAula){
    AulaResponseDTO aulaEditada = this.aulaService.editarAula(id, novaAula);

    if(aulaEditada == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.created(null).body(aulaEditada);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarAula(@PathVariable("id") Long id) {
    try {
      this.aulaService.deletarAula(id);
      return ResponseEntity.noContent().build();
    } catch (IllegalArgumentException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping
  public ResponseEntity<List<AulaResponseDTO>> listarTodasAulas() {
    List<AulaResponseDTO> aulas = this.aulaService.listarTodasAulas();
    return ResponseEntity.ok(aulas);
  }


  @GetMapping("/sala/{salaId}")
  public ResponseEntity<List<AulaResponseDTO>> listarAulasPorSala(@PathVariable("salaId") Long salaId) {
    List<AulaResponseDTO> aulas = this.aulaService.listarAulasPorSala(salaId);
    return ResponseEntity.ok(aulas);
  }

  @GetMapping("/{id}")
  public ResponseEntity<AulaResponseDTO> obterAula(@PathVariable("id") Long id){

    AulaResponseDTO aula = this.aulaService.obterAula(id);
    
    if(aula == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(aula);
  }

  @GetMapping("/professor/{professorId}")
  public ResponseEntity<List<AulaResponseDTO>> listarAulasPorProfessor(@PathVariable("professorId") Long professorId){

    List<AulaResponseDTO> aula = this.aulaService.listarAulasPorProfessor(professorId);

    return ResponseEntity.ok().body(aula);
  }
}
