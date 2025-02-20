package com.ifba.edu.turmas_ms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ifba.edu.turmas_ms.dtos.TurmaDTO;
import com.ifba.edu.turmas_ms.models.Disciplina;
import com.ifba.edu.turmas_ms.models.Turma;
import com.ifba.edu.turmas_ms.repositories.TurmaRepository;

@Service
public class TurmaService {
	
	// Atributos
	
	private TurmaRepository turmaRepository;
	
	// Constructors
	
	public TurmaService(TurmaRepository turmaRepository) {
		this.turmaRepository = turmaRepository;
	}

	
	// Métodos	
	
	public TurmaDTO cadastrarTurma(TurmaDTO turmaDTO) {
		Turma novaTurma = this.turmaRepository.save(new Turma(turmaDTO));
		return new TurmaDTO(novaTurma);
	}
	
	
	public List<TurmaDTO> listarTurmas(){
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
	    Turma turma = findTurma.get();
	    turma.setDisciplina(new Disciplina(turmaDTO.disciplinaDTO())); 
	    turma.setSemestre(turmaDTO.semestre());
	    turma.setIdProfessor(turmaDTO.idProfessor());
	    
	    return new TurmaDTO(this.turmaRepository.save(turma));
	}

	
	public TurmaDTO excluirTurma (Long id) {
		Optional<Turma> findTurma = this.turmaRepository.findById(id);
		if(findTurma.isEmpty()) 			
			return null;
		Turma turmaParaExcluir = findTurma.get();
		this.turmaRepository.delete(turmaParaExcluir);
		return new TurmaDTO(turmaParaExcluir);
	
	}
	
	
    public List<TurmaDTO> listarTurmasPorProfessor(Long idProfessor) {
        return turmaRepository.findByIdProfessor(idProfessor)
                .stream()
                .map(TurmaDTO::new)
                .collect(Collectors.toList());
    }
  

}
