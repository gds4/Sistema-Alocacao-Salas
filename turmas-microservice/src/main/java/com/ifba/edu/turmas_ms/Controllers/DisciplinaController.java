package com.ifba.edu.turmas_ms.Controllers;

import java.net.URI;
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
import org.springframework.web.util.UriComponentsBuilder;

import com.ifba.edu.turmas_ms.dtos.DisciplinaDTO;
import com.ifba.edu.turmas_ms.dtos.TurmaDTO;
import com.ifba.edu.turmas_ms.services.DisciplinaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {
	
	// Atributos
	
	private DisciplinaService disciplinaService;
	
	// Constructor
	
	public DisciplinaController(DisciplinaService disciplinaService) {
		this.disciplinaService = disciplinaService;
	}
	
	
	// Métodos
	
	@Operation(summary = "Cadastrar Dsiciplina", description = "Cadastra uma disciplina no sistema")
	@ApiResponse(responseCode = "201", description = "Disciplinia cadastrada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DisciplinaDTO.class)))
	@PostMapping
	public ResponseEntity<DisciplinaDTO> cadastrarDisciplina(@RequestBody DisciplinaDTO disciplinaDTO, UriComponentsBuilder uriBuilder){
		DisciplinaDTO disciplina = this.disciplinaService.cadasdrarDisciplina(disciplinaDTO);
		URI uri = uriBuilder
				.path("")
				.buildAndExpand()
				.toUri();
		return ResponseEntity.created(uri).body(disciplina);		
	}

	
	@Operation(summary = "Listar Disciplinas", description = "Lista as disciplinas do sistema")
	@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DisciplinaDTO.class)))	
	@GetMapping
	public List<DisciplinaDTO> listarDisciplinas(){
		return this.disciplinaService.listarDisciplinas();
	}
	

	@Operation(summary = "Editar Disciplina", description = "Edita uma disciplina do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Disciplina atualizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DisciplinaDTO.class))),
            @ApiResponse(responseCode = "404", description = "Disciplina não encontrada")})
	@PutMapping("/{id}")
	public ResponseEntity<DisciplinaDTO> editarDisciplina(@PathVariable("id") Long id, @RequestBody DisciplinaDTO disciplinaDTO){
		DisciplinaDTO disciplina = this.disciplinaService.editarDisciplina(id, disciplinaDTO);
		if(disciplina == null) 
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok().body(disciplina);
	}
	
	
	@Operation(summary = "Excluir Disciplina", description = "Exclui uma Disciplina do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Disciplina removida com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DisciplinaDTO.class))),
            @ApiResponse(responseCode = "404", description = "Disciplina não encontrada")
    })
	@DeleteMapping("/{id}")
	public ResponseEntity<DisciplinaDTO> excluirDisciplina(@PathVariable("id") Long salaId){
		DisciplinaDTO disciplina = this.disciplinaService.excluirDisciplina(salaId);
		if(disciplina == null) 
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok().body(disciplina);
	}
	
	
    @Operation(summary = "Listar Disciplinas por Professor", description = "Retorna a lista de disciplinas ministradas por um professor específico, baseado no ID do professor.")
    @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Lista de disciplinas encontrada com sucesso",content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = DisciplinaDTO.class)))),
    @ApiResponse(responseCode = "404", description = "Nenhuma disciplina encontrada para o professor informado")
    })
    @GetMapping("/professor/{idProfessor}")
    public List<DisciplinaDTO> listarDisciplinasPorProfessor(@PathVariable Long idProfessor) {
        return this.disciplinaService.listarDisciplinasPorProfessor(idProfessor);
    }

		
		@GetMapping("/{disciplinaId}/turmas")
    public ResponseEntity<List<TurmaDTO>> getTurmasByDisciplina(@PathVariable Long disciplinaId) {
			List<TurmaDTO> turmas = disciplinaService.getTurmasByDisciplina(disciplinaId);
      
			if(turmas == null){
				return ResponseEntity.notFound().build();
			}

			return ResponseEntity.ok().body(turmas);
    }
	
}
	