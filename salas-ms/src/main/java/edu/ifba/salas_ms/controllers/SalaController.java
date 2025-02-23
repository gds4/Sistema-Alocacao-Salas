package edu.ifba.salas_ms.controllers;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import edu.ifba.salas_ms.dtos.SalaDTO;
import edu.ifba.salas_ms.services.SalaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/salas")
public class SalaController {

	private SalaService salaService;
	
	
	public SalaController(SalaService salaService) {
		this.salaService = salaService;
	}
	
	
	@Operation(summary = "Cadastrar Sala", description = "Cadastra uma sala no sistema")
	@ApiResponse(responseCode = "201", description = "Sala cadastrada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SalaDTO.class)))
	@PostMapping
	public ResponseEntity<SalaDTO> cadastrar(@RequestBody SalaDTO salaDTO, UriComponentsBuilder uriBuilder){
		
		SalaDTO sala = this.salaService.cadastrarSala(salaDTO);
		URI uri = uriBuilder.path("").buildAndExpand().toUri();
		
		
		return ResponseEntity.created(uri).body(sala);
	}
 
	
	@Operation(summary = "Listar Sala", description = "Lista as salas do sistema")
	@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SalaDTO.class)))	
	@GetMapping
	public List<SalaDTO> listarSalas(){
		return salaService.listarSalas();
	}
	
	@Operation(summary = "Editar Sala", description = "Edita uma sala do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sala atualizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SalaDTO.class))),
            @ApiResponse(responseCode = "404", description = "Sala não encontrada")
    })
	
	@PutMapping("/{id}")
	public ResponseEntity<SalaDTO> editar(@PathVariable("id") Long salaId, @RequestBody SalaDTO salaDTO){
		
		SalaDTO sala = salaService.editarSala(salaId, salaDTO);
		
		if(sala == null) {
			return ResponseEntity.notFound().build();
		}
		
		
		return ResponseEntity.ok().body(sala);
	}
	
	
	@Operation(summary = "Excluir Sala", description = "Exclui uma sala do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sala removida com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SalaDTO.class))),
            @ApiResponse(responseCode = "404", description = "Sala não encontrada")
    })
	@DeleteMapping("/{id}")
	public ResponseEntity<SalaDTO> excluir(@PathVariable("id") Long salaId){
		
		SalaDTO sala = salaService.excluirSala(salaId);
		
		if(sala == null) {
			return ResponseEntity.notFound().build();
		}
		
		
		return ResponseEntity.ok().body(sala);
	}
	
}
