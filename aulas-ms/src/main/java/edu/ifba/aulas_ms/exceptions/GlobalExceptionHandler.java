package edu.ifba.aulas_ms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

      @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex) {
        return new ResponseEntity<>("Você não tem permissão para acessar este recurso", HttpStatus.FORBIDDEN);
    }

  @ExceptionHandler(DuracaoInvalidaException.class)
  public ResponseEntity<String> handleDuracaoInvalida(DuracaoInvalidaException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }


  @ExceptionHandler(ConflitoHorarioException.class)
  public ResponseEntity<String> handleConflitoHorario(ConflitoHorarioException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
  }

  @ExceptionHandler(HorarioInvalidoException.class)
  public ResponseEntity<String> handleHorarioInvalido(HorarioInvalidoException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleGenericException(Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro inesperado: " + e.getMessage());
  }
}