package com.ifba.edu.turmas_ms.Controllers;

import java.net.URI;
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
import org.springframework.web.util.UriComponentsBuilder;

import com.ifba.edu.turmas_ms.dtos.TurmaDTO;
import com.ifba.edu.turmas_ms.services.TurmaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/turmas")
public class TurmaController {

	// Atributos

	private TurmaService turmaService;

	// Constructor

	public TurmaController(TurmaService turmaService) {
		this.turmaService = turmaService;
	}

	// Métodos

	@Operation(summary = "Cadastrar Turma", description = "Cadastra uma Turma no sistema")
	@ApiResponse(responseCode = "201", description = "Turma cadastrada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TurmaDTO.class)))
	@PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
	@PostMapping
	public ResponseEntity<TurmaDTO> cadastrarTurma(@RequestBody TurmaDTO turmaDTO, UriComponentsBuilder uriBuilder) {
		TurmaDTO turma = this.turmaService.cadastrarTurma(turmaDTO);
		URI uri = uriBuilder
				.path("")
				.buildAndExpand()
				.toUri();
		return ResponseEntity.created(uri).body(turma);
	}

	@Operation(summary = "Listar Turmas", description = "Lista as turmas do sistema")
	@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TurmaDTO.class)))
	@GetMapping
	public List<TurmaDTO> listarTurmas(@RequestParam(required = false) String semestre) {
		return this.turmaService.listarTurmas(semestre);
	}

	@Operation(summary = "Editar Turma", description = "Edita uma Turma do sistema")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Turma atualizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TurmaDTO.class))),
			@ApiResponse(responseCode = "404", description = "Turma não encontrada") })
	@PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
	@PutMapping("/{id}")
	public ResponseEntity<TurmaDTO> editarTurma(@PathVariable("id") Long id, @RequestBody TurmaDTO turmaDTO) {
		TurmaDTO turma = this.turmaService.editarTurma(id, turmaDTO);
		if (turma == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok().body(turma);
	}

	@Operation(summary = "Excluir Turma", description = "Exclui uma Turma do sistema")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Turma removida com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TurmaDTO.class))),
			@ApiResponse(responseCode = "404", description = "Turma não encontrada")
	})
	@PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
	@DeleteMapping("/{id}")
	public ResponseEntity<TurmaDTO> excluirTurma(@PathVariable("id") Long turmaID) {
		TurmaDTO turma = this.turmaService.excluirTurma(turmaID);
		if (turma == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok().body(turma);
	}

	@Operation(summary = "Listar Turmas por Professor", description = "Retorna a lista de turmas de um professor específico com base no ID do professor.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de turmas encontrada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TurmaDTO.class))),
			@ApiResponse(responseCode = "404", description = "Nenhuma turma encontrada para o professor informado")
	})
	@GetMapping("/professor/{idProfessor}")
	public List<TurmaDTO> listarTurmasPorProfessor(@PathVariable Long idProfessor,
			@RequestParam(required = false) String semestre) {
		if (semestre == null || semestre.isBlank()) {
			return turmaService.listarTurmasPorProfessor(idProfessor);
		} else {
			return turmaService.listarTurmasPorProfessor(idProfessor, semestre);
		}
	}

	@Operation(summary = "Buscar turmas por IDs", description = "Retorna uma lista de turmas com base nos IDs fornecidos. Um semestre opcional pode ser informado para filtrar os resultados.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de turmas encontrada", content = @Content(array = @ArraySchema(schema = @Schema(implementation = TurmaDTO.class))))
	})
	@PostMapping("/buscar-turmas")
	public List<TurmaDTO> buscarTurmasPorIds(@RequestBody List<Long> ids,
			@RequestParam(required = false) String semestre) {
		if (semestre == null || semestre.isBlank()) {
			return turmaService.buscarTurmasPorIds(ids);
		} else {
			return turmaService.buscarTurmasPorIds(ids, semestre);
		}
	}
}
