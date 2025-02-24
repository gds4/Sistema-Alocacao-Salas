package edu.ifba.notificacoes_ms.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import edu.ifba.notificacoes_ms.dtos.EmailDTO;
import edu.ifba.notificacoes_ms.enums.EmailStatus;
import edu.ifba.notificacoes_ms.models.Email;
import edu.ifba.notificacoes_ms.repositories.EmailRepository;

@Service
public class EmailService {
    @Autowired
    private EmailRepository emailRepository;
    @Autowired
    private JavaMailSender emailSender;

    public Email sendEmail(EmailDTO dto) {
        Email data = new Email(dto);
        data.setSendDateEmail(LocalDateTime.now());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(dto.mailFrom());
        message.setTo(dto.mailTo());
        message.setSubject(dto.mailSubject());
        message.setText(dto.mailText());
        data.setStatus(EmailStatus.SENT);
        emailSender.send(message);
        emailRepository.save(data);
        return data;
    }
}
