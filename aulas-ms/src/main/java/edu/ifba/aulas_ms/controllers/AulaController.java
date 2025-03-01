package edu.ifba.aulas_ms.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ifba.aulas_ms.dtos.AulaDTO;
import edu.ifba.aulas_ms.dtos.AulaResponseDTO;
import edu.ifba.aulas_ms.services.AulaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/aulas")
public class AulaController {
  

  private AulaService aulaService;

  public AulaController(AulaService aulaService) {
    this.aulaService = aulaService;

  }


  @Operation(summary = "Agendar aula", description = "Agenda uma aula nova no sistema")
  @ApiResponse(responseCode = "201", description = "Aula agendada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class)))
  @PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
  @PostMapping
  public ResponseEntity<AulaResponseDTO> agendarAula(@RequestBody AulaDTO novaAula){
    AulaResponseDTO aulaAgendada = this.aulaService.agendarAula(novaAula);

    return ResponseEntity.created(null).body(aulaAgendada);
  }


   @Operation(summary = "Editar Aula", description = "Edita uma aula do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Aula editada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Aula não encontrada")
    })
    @PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
  @PutMapping("/{id}")
  public ResponseEntity<AulaResponseDTO> editarAula(@PathVariable("id") Long id, @RequestBody AulaDTO novaAula){
    AulaResponseDTO aulaEditada = this.aulaService.editarAula(id, novaAula);

    if(aulaEditada == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.created(null).body(aulaEditada);
  }



  @Operation(summary = "Remover Aula", description = "Remove uma aula do sistema")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "204", description = "Aula removida com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class))),
          @ApiResponse(responseCode = "404", description = "Aula não encontrada")
  })
  @PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarAula(@PathVariable("id") Long id) {
    try {
      this.aulaService.deletarAula(id);
      return ResponseEntity.noContent().build();
    } catch (IllegalArgumentException e) {
      return ResponseEntity.notFound().build();
    }
  }



  @Operation(summary = "Listar Aulas", description = "Lista as aulas do sistema")
	@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class)))
  @GetMapping
  public ResponseEntity<List<AulaResponseDTO>> listarTodasAulas() {
    List<AulaResponseDTO> aulas = this.aulaService.listarTodasAulas();
    return ResponseEntity.ok(aulas);
  }


  @Operation(summary = "Listar Aulas por Sala", description = "Lista as aulas para uma sala")
	@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class)))
  @GetMapping("/sala/{salaId}")
  public ResponseEntity<List<AulaResponseDTO>> listarAulasPorSala(@PathVariable("salaId") Long salaId, @RequestParam(required = false) String semestre) {
    List<AulaResponseDTO> aulas = this.aulaService.listarAulasPorSala(salaId, semestre);
    return ResponseEntity.ok(aulas);
  }



  @Operation(summary = "Obter Aula", description = "Busca uma aula no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Aula não encontrada")
    })
  @GetMapping("/{id}")
  public ResponseEntity<AulaResponseDTO> obterAula(@PathVariable("id") Long id){

    AulaResponseDTO aula = this.aulaService.obterAula(id);
    
    if(aula == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(aula);
  }


  @Operation(summary = "Listar Aula por Professor", description = "Lista as aulas para um professor")
  @ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class)))       
  @GetMapping("/professor/{professorId}")
  public ResponseEntity<List<AulaResponseDTO>> listarAulasPorProfessor(@PathVariable("professorId") Long professorId, @RequestParam(required = false) String semestre){

    List<AulaResponseDTO> aula = this.aulaService.listarAulasPorProfessor(professorId, semestre);

    return ResponseEntity.ok().body(aula);
  }


  @Operation(summary = "Listar Aulas por Turmas", description = "Lista as aulas para uma turma")
	@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AulaResponseDTO.class)))
  @PostMapping("/turmas")
  public ResponseEntity<List<AulaResponseDTO>> listarAulasPorTurmas(@RequestBody List<Long> ids){
    List<AulaResponseDTO> aulas = aulaService.listarAulasPorTurmas(ids);
    return ResponseEntity.ok().body(aulas);
  }

}
