package edu.ifba.aulas_ms.listeners;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import edu.ifba.aulas_ms.dtos.SalaDTO;
import edu.ifba.aulas_ms.dtos.TurmaDTO;
import edu.ifba.aulas_ms.services.AulaService;

@Component
public class AMQPListener {

  private AulaService aulaService;

  
  public AMQPListener(AulaService aulaService) {
    this.aulaService = aulaService;
  }

  @RabbitListener(queues = "salaParaAulaRemocao.notificacao")
    public void receberMensagem(SalaDTO salaDTO) {
      this.aulaService.processarRemocaoSala(salaDTO);
    }


    @RabbitListener(queues = "turmaParaAulaRemocao.notificacao")
    public void receberMensagemTurma(TurmaDTO turmaDTO) {
      this.aulaService.processarRemocaoTurma(turmaDTO);

    }
}
