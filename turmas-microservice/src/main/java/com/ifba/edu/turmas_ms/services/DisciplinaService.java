package com.ifba.edu.turmas_ms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ifba.edu.turmas_ms.dtos.DisciplinaDTO;
import com.ifba.edu.turmas_ms.dtos.TurmaDTO;
import com.ifba.edu.turmas_ms.models.Disciplina;
import com.ifba.edu.turmas_ms.models.Turma;
import com.ifba.edu.turmas_ms.repositories.DisciplinaRepository;
import com.ifba.edu.turmas_ms.repositories.TurmaRepository;

@Service
public class DisciplinaService {
	
	// Atributos
	
	private DisciplinaRepository disciplinaRepository;
	private TurmaRepository turmaRepository;
	
	// Constructors
	
	public DisciplinaService(DisciplinaRepository disciplinaRepository, TurmaRepository turmaRepository) {
		this.disciplinaRepository = disciplinaRepository;
		this.turmaRepository = turmaRepository;
	}
	
	
	// Métodos
	
	public DisciplinaDTO cadasdrarDisciplina(DisciplinaDTO disciplinaDTO) {
		Disciplina novaDisciplina = this.disciplinaRepository.save(new Disciplina(disciplinaDTO));
		return new DisciplinaDTO(novaDisciplina);
	}
	
	
	public List<DisciplinaDTO> listarDisciplinas(){
		return this.disciplinaRepository
				.findAll()
				.stream()
				.map(DisciplinaDTO::new)
				.toList();
	} 
	
	
	public DisciplinaDTO editarDisciplina (Long id, DisciplinaDTO disciplinaDTO) {
		Optional<Disciplina> findDisciplina = this.disciplinaRepository.findById(id);
		if(findDisciplina.isEmpty())
			return null;
		Disciplina disciplinaRecuperada = findDisciplina.get();
		disciplinaRecuperada.setNome(disciplinaDTO.nome());
		disciplinaRecuperada.setCodigo(disciplinaDTO.codigo());
		return new DisciplinaDTO (this.disciplinaRepository.save(disciplinaRecuperada));
	}
	
	
	public DisciplinaDTO excluirDisciplina(Long id) {
		Optional<Disciplina> findDisciplina = this.disciplinaRepository.findById(id);
		if(findDisciplina.isEmpty()) 
			return null;
		Disciplina disciplinaParaExcluir = findDisciplina.get();
		this.disciplinaRepository.delete(disciplinaParaExcluir);
		return new DisciplinaDTO(disciplinaParaExcluir);
	}
	

    public List<DisciplinaDTO> listarDisciplinasPorProfessor(Long idProfessor) {
        return this.turmaRepository.findByIdProfessor(idProfessor)
                .stream()
                .map(turma -> new DisciplinaDTO(turma.getDisciplina()))
                .distinct()
                .collect(Collectors.toList());
    }
	
		
		public List<TurmaDTO> getTurmasByDisciplina(Long disciplinaId) {

			Optional<Disciplina> optionalDisciplina = disciplinaRepository.findById(disciplinaId);

			if(optionalDisciplina.isEmpty()){
				return null;
			}
			// Agora buscamos as turmas associadas à disciplina
			return turmaRepository.findByDisciplinaId(optionalDisciplina.get().getId()).stream().map(TurmaDTO::new).collect(Collectors.toList());
	}
	
}
