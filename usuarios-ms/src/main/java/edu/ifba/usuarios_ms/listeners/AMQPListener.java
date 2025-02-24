package edu.ifba.usuarios_ms.listeners;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import edu.ifba.usuarios_ms.dtos.NotificacaoSalaDTO;
import edu.ifba.usuarios_ms.dtos.NotificacaoTurmaDTO;
import edu.ifba.usuarios_ms.services.UsuarioService;

@Component
public class AMQPListener {

  private UsuarioService usuarioService;

  
  public AMQPListener(UsuarioService usuarioService) {
    this.usuarioService = usuarioService;
  }

  @RabbitListener(queues = "aulaParaUsuarioSalaRemocao.notificacao")
    public void receberMensagemNotificacaoSala(NotificacaoSalaDTO salaDTO) {
      this.usuarioService.processarEnvioEmailsSala(salaDTO);
      
    }

    @RabbitListener(queues = "aulaParaUsuarioTurmaRemocao.notificacao")
    public void receberMensagemNotificacaoSala(NotificacaoTurmaDTO turmaDTO) {
      this.usuarioService.processarEnvioEmailsTurma(turmaDTO);
      
    }
}