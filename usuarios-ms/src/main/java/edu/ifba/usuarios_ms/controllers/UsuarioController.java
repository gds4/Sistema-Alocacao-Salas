package edu.ifba.usuarios_ms.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import edu.ifba.usuarios_ms.dtos.UsuarioDTO;
import edu.ifba.usuarios_ms.dtos.UsuarioResponseDTO;
import edu.ifba.usuarios_ms.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Operation(summary = "Cadastrar Usuário", description = "Cadastra um novo usuário no sistema")
    @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioResponseDTO.class)))
    @Secured("ROLE_ADMIN")
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@RequestBody UsuarioDTO usuarioCriacaoDto,
            UriComponentsBuilder uriBuilder) {

        UsuarioResponseDTO usuarioResponse = usuarioService.cadastrar(usuarioCriacaoDto);
        URI uri = uriBuilder.path("").buildAndExpand().toUri();
        return ResponseEntity.created(uri).body(usuarioResponse);

    }

    @Operation(summary = "Editar Usuário", description = "Edita um usuário do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário removido com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @Secured("ROLE_ADMIN")
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> editarUsuario(@PathVariable("id") Long userId,
            @RequestBody UsuarioDTO usuarioDto) {

        UsuarioResponseDTO usuarioResponse = usuarioService.editarUsuario(userId, usuarioDto);

        if (usuarioResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(usuarioResponse);
    }

    @Operation(summary = "Remover Usuário", description = "Remove um usuário do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário removido com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> remover(@PathVariable("id") Long userId) {

        UsuarioResponseDTO usuarioResponse = usuarioService.remover(userId);

        if (usuarioResponse == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(usuarioResponse);
    }

    @Operation(summary = "Obter dados do usuário", description = "Retorna as informações do usuário autenticado com base no token JWT.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados do usuário retornados com sucesso", content = @Content(schema = @Schema(implementation = UsuarioResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Token inválido ou não autorizado", content = @Content)
    })
    @GetMapping("/dados-usuario")
    public ResponseEntity<UsuarioResponseDTO> dadosUsuario(@RequestHeader("Authorization") String token) {
        try {

            UsuarioResponseDTO usuarioDTO = usuarioService.dadosUsuario(token);

            return ResponseEntity.ok(usuarioDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(null); // Retorna 401 se o token for inválido
        }
    }

    @Operation(summary = "Listar professores", description = "Retorna uma lista de usuários que possuem a função de professor.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de professores retornada com sucesso", content = @Content(schema = @Schema(implementation = UsuarioResponseDTO.class)))
    })
    @GetMapping("/professores")
    public List<UsuarioResponseDTO> listarUsuariosComRoleProfessor() {

        return usuarioService.listarUsuariosComRoleProfessor();
    }

}
