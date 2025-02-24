package edu.ifba.notificacoes_ms.dtos;

import edu.ifba.notificacoes_ms.models.Email;

public record EmailDTO(String mailFrom, String mailTo, String mailSubject, String mailText) {
    public EmailDTO(Email email) {
        this(email.getMailFrom(), email.getMailTo(), email.getMailSubject(), email.getMailText());
    }
}
