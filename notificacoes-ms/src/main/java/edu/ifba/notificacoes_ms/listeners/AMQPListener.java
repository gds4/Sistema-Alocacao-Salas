package edu.ifba.notificacoes_ms.listeners;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import edu.ifba.notificacoes_ms.dtos.EmailDTO;
import edu.ifba.notificacoes_ms.dtos.NotificacaoSalaEmailsDTO;
import edu.ifba.notificacoes_ms.dtos.NotificacaoTurmaEmailsDTO;
import edu.ifba.notificacoes_ms.services.EmailService;

@Component
public class AMQPListener {

  private EmailService emailService;
  @Value("${spring.mail.username}")
  private String emailInstitucional;

  public AMQPListener(EmailService emailService) {
    this.emailService = emailService;
  }

  @RabbitListener(queues = "salaRemovida.notificacao")
  public void receberMensagemSala(NotificacaoSalaEmailsDTO dados) {

    dados.emails().forEach((email)->{
      EmailDTO emailDTO = new EmailDTO(emailInstitucional, email, "Remoção de Sala", "Você esta recebendo essa mensagem pois a sala: " + dados.sala().nome() + " foi removida do sistema, por favor alter o local das aulas no sistema.");
      this.emailService.sendEmail(emailDTO);
    });
  }

  @RabbitListener(queues = "turmaRemovida.notificacao")
  public void receberMensagemTurma(NotificacaoTurmaEmailsDTO dados) {

    dados.emails().forEach((email)->{
      EmailDTO emailDTO = new EmailDTO(emailInstitucional, email, "Remoção de Turma", "Você esta recebendo essa mensagem pois a turma da disciplina: " + dados.turma().disciplinaDTO().codigo() + " foi removida do sistema, por favor verifique.");
      this.emailService.sendEmail(emailDTO);
    });
  }
}
