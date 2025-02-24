package edu.ifba.aulas_ms.services;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import edu.ifba.aulas_ms.dtos.AulaDTO;
import edu.ifba.aulas_ms.dtos.AulaResponseDTO;
import edu.ifba.aulas_ms.dtos.NotificacaoSalaDTO;
import edu.ifba.aulas_ms.dtos.NotificacaoTurmaDTO;
import edu.ifba.aulas_ms.dtos.SalaDTO;
import edu.ifba.aulas_ms.dtos.TurmaDTO;
import edu.ifba.aulas_ms.exceptions.ConflitoHorarioException;
import edu.ifba.aulas_ms.exceptions.DuracaoInvalidaException;
import edu.ifba.aulas_ms.models.Aula;
import edu.ifba.aulas_ms.repositories.AulaRepository;

@Service
public class AulaService {
  
  private AulaRepository aulaRepository;    
  private RabbitTemplate rabbitTemplate;

  public AulaService(AulaRepository aulaRepository, RabbitTemplate rabbitTemplate) {
    this.aulaRepository = aulaRepository;
    this.rabbitTemplate = rabbitTemplate;
  }

  public AulaResponseDTO agendarAula(AulaDTO aulaDTO) {

    if (aulaDTO.duracao() % 50 != 0) {
        throw new DuracaoInvalidaException("A duração da aula deve ser múltiplo de 50 minutos.");
    }
    
    LocalTime horarioFim = aulaDTO.horarioInicio().plusMinutes(aulaDTO.duracao());

    List<Aula> conflitos = aulaRepository.buscarConflitos(aulaDTO.salaId(), aulaDTO.diaSemana().toString(), aulaDTO.horarioInicio(), horarioFim);
    if (!conflitos.isEmpty()) {
        throw new ConflitoHorarioException("Conflito de horário: a sala já está alocada para outra aula nesse período.");
    }
    
    Aula aula = new Aula(aulaDTO);
    
    aula = aulaRepository.save(aula);

    return new AulaResponseDTO(aula);
  }

  public AulaResponseDTO editarAula(Long id, AulaDTO aulaDTO) {

    Optional<Aula> aulaOptional = this.aulaRepository.findById(id);

    if(aulaOptional.isEmpty()){
        return null;
    }

    Aula aula = aulaOptional.get();

    aula.setTurmaId(id);
    aula.setDiaSemana(aulaDTO.diaSemana());
    aula.setDuracao(aulaDTO.duracao());
    aula.setSalaId(aulaDTO.salaId());
    aula.setHorarioInicio(aulaDTO.horarioInicio());
    

    aula = aulaRepository.save(aula);

    return new AulaResponseDTO(aula);

  }

   public void deletarAula(Long id) {
    if (!aulaRepository.existsById(id)) {
        throw new IllegalArgumentException("Aula com ID " + id + " não encontrada.");
    }
    aulaRepository.deleteById(id);
  }

  public List<AulaResponseDTO> listarTodasAulas() {
    return aulaRepository.findAll().stream()
        .map(AulaResponseDTO::new)
        .collect(Collectors.toList());
  }

  public List<AulaResponseDTO> listarAulasPorSala(Long salaId) {
    return aulaRepository.findBySalaId(salaId).stream()
        .map(AulaResponseDTO::new)
        .collect(Collectors.toList());
  }

  public List<AulaResponseDTO> listarAulasPorProfessor(Long idProfessor){
    return aulaRepository.findByProfessorId(idProfessor).stream()
    .map(AulaResponseDTO::new)
    .collect(Collectors.toList());
  }

  public AulaResponseDTO obterAula(Long id){
    Optional<Aula> aulaOptional = this.aulaRepository.findById(id);
    
    if(aulaOptional.isEmpty()){
      return null;
    }
    return new AulaResponseDTO(aulaOptional.get());
  }

  public List<AulaResponseDTO> listarAulasPorTurmas(List<Long> ids) {
    return this.aulaRepository.findByTurmaIdIn(ids).stream().map(AulaResponseDTO::new).collect(Collectors.toList());
  }

  public void processarRemocaoSala(SalaDTO sala) {
    List<Aula> aulas = aulaRepository.findBySalaId(sala.id());

    Set<Long> professorIds = new HashSet<>();

    aulas.forEach(aula -> professorIds.add(aula.getProfessorId()));

    NotificacaoSalaDTO notificacao = new NotificacaoSalaDTO(sala, professorIds);
    rabbitTemplate.convertAndSend("aulaParaUsuarioSalaRemocao.notificacao", notificacao);
  }

  public void processarRemocaoTurma(TurmaDTO turmaDTO) {
    List<Aula> aulas = aulaRepository.findByTurmaId(turmaDTO.id());

    Set<Long> professorIds = new HashSet<>();

    aulas.forEach(aula -> professorIds.add(aula.getProfessorId()));

    NotificacaoTurmaDTO notificacao = new NotificacaoTurmaDTO(turmaDTO, professorIds);
    rabbitTemplate.convertAndSend("aulaParaUsuarioTurmaRemocao.notificacao", notificacao);
  }


}
