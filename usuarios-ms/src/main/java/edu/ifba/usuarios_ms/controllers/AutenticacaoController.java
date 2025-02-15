package edu.ifba.usuarios_ms.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.ifba.usuarios_ms.dtos.DadosAutenticacao;
import edu.ifba.usuarios_ms.dtos.DadosTokenJWT;
import edu.ifba.usuarios_ms.models.Usuario;
import edu.ifba.usuarios_ms.services.JWTokenService;

@RestController
@RequestMapping("/login")
public class AutenticacaoController {

  private AuthenticationManager manager;

  private JWTokenService tokenService;

  public AutenticacaoController(AuthenticationManager manager, JWTokenService tokenService) {
    this.manager = manager;
    this.tokenService = tokenService;
  }

  @PostMapping
  public ResponseEntity<DadosTokenJWT> efetuarLogin(@RequestBody DadosAutenticacao dados) {
    var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
    var authentication = manager.authenticate(authenticationToken);

    var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());

    return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));

  }
}
