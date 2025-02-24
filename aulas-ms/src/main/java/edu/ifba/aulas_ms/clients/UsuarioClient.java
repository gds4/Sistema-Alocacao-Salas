package edu.ifba.aulas_ms.clients;

import java.util.Set;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import edu.ifba.aulas_ms.config.FeignConfig;
import edu.ifba.aulas_ms.dtos.NotificacaoSalaDTO;

@FeignClient(name = "usuarios-ms", configuration = FeignConfig.class)
public interface UsuarioClient {
  
  @RequestMapping(method = RequestMethod.POST, value = "/usuarios/notificar/sala")
  public ResponseEntity<Void> notificarRemocaoSala(@RequestBody NotificacaoSalaDTO dados);
}
