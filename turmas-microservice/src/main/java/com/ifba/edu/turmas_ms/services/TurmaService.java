package com.ifba.edu.turmas_ms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ifba.edu.turmas_ms.dtos.TurmaDTO;
import com.ifba.edu.turmas_ms.models.Disciplina;
import com.ifba.edu.turmas_ms.models.Turma;
import com.ifba.edu.turmas_ms.repositories.TurmaRepository;

@Service
public class TurmaService {

	// Atributos

	private TurmaRepository turmaRepository;
	private RabbitTemplate rabbitTemplate;

	// Constructors

	public TurmaService(TurmaRepository turmaRepository, RabbitTemplate rabbitTemplate) {
		this.turmaRepository = turmaRepository;
		this.rabbitTemplate = rabbitTemplate;
	}

	// Métodos

	public TurmaDTO cadastrarTurma(TurmaDTO turmaDTO) {
		Turma novaTurma = this.turmaRepository.save(new Turma(turmaDTO));
		return new TurmaDTO(novaTurma);
	}

	public List<TurmaDTO> listarTurmas() {
		return this.turmaRepository
				.findAll()
				.stream()
				.map(TurmaDTO::new)
				.toList();
	}

	public TurmaDTO editarTurma(Long id, TurmaDTO turmaDTO) {
		Optional<Turma> findTurma = this.turmaRepository.findById(id);
		if (findTurma.isEmpty())
			return null;

		var authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.anyMatch(role -> role.equals("ROLE_ADMIN"));
		if (!isAdmin && !turmaDTO.idProfessor().equals(findTurma.get().getIdProfessor())) {
			return null;
		}

		Turma turma = findTurma.get();
		turma.setDisciplina(new Disciplina(turmaDTO.disciplinaDTO()));
		turma.setSemestre(turmaDTO.semestre());
		turma.setIdProfessor(turmaDTO.idProfessor());

		return new TurmaDTO(this.turmaRepository.save(turma));
	}

	public TurmaDTO excluirTurma(Long id) {
		Optional<Turma> findTurma = this.turmaRepository.findById(id);
		if (findTurma.isEmpty())
			return null;
		Turma turmaParaExcluir = findTurma.get();
		this.turmaRepository.delete(turmaParaExcluir);
		TurmaDTO turmadto = new TurmaDTO(turmaParaExcluir);
		rabbitTemplate.convertAndSend("turmaParaAulaRemocao.notificacao", turmadto);
		return turmadto;

	}

	public List<TurmaDTO> listarTurmasPorProfessor(Long idProfessor) {
		return turmaRepository.findByIdProfessor(idProfessor)
				.stream()
				.map(TurmaDTO::new)
				.collect(Collectors.toList());
	}

	public List<TurmaDTO> buscarTurmasPorIds(List<Long> ids) {

		return turmaRepository.findByIdIn(ids)
				.stream()
				.map(TurmaDTO::new)
				.collect(Collectors.toList());
	}

	public List<TurmaDTO> listarTurmas(String semestre) {
		if (semestre == null || semestre.isBlank()) {
			return turmaRepository.findAll().stream().map(TurmaDTO::new).toList();
		} else {
			return turmaRepository.findBySemestre(semestre).stream().map(TurmaDTO::new).toList();
		}
	}

	public List<TurmaDTO> listarTurmasPorProfessor(Long idProfessor, String semestre) {
		if (semestre == null || semestre.isBlank()) {
			return turmaRepository.findByIdProfessor(idProfessor).stream().map(TurmaDTO::new).collect(Collectors.toList());
		} else {
			return turmaRepository.findByIdProfessorAndSemestre(idProfessor, semestre).stream().map(TurmaDTO::new)
					.collect(Collectors.toList());
		}
	}

	public List<TurmaDTO> buscarTurmasPorIds(List<Long> ids, String semestre) {
		if (semestre == null || semestre.isBlank()) {
			return turmaRepository.findByIdIn(ids).stream().map(TurmaDTO::new).collect(Collectors.toList());
		} else {
			return turmaRepository.findByIdInAndSemestre(ids, semestre).stream().map(TurmaDTO::new)
					.collect(Collectors.toList());
		}
	}

}
