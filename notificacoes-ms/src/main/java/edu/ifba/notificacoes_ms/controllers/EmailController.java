package edu.ifba.notificacoes_ms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.ifba.notificacoes_ms.dtos.EmailDTO;
import edu.ifba.notificacoes_ms.models.Email;
import edu.ifba.notificacoes_ms.services.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailService service;

    @PostMapping("/send")
    public ResponseEntity<Email> sendEmail(@RequestBody EmailDTO data) {

        return new ResponseEntity<Email>(service.sendEmail(data), HttpStatus.CREATED);
    }

}