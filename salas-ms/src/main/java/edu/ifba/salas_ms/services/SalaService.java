package edu.ifba.salas_ms.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.ifba.salas_ms.dtos.SalaDTO;
import edu.ifba.salas_ms.models.Sala;
import edu.ifba.salas_ms.repositories.SalaRepository;

@Service
public class SalaService {

	private SalaRepository salaRepository;
	
	public SalaService (SalaRepository salaRepository) {
		this.salaRepository = salaRepository;
	}
	
	
	
	public SalaDTO cadastrarSala(SalaDTO salaDTO) {
		
		Sala novaSala = new Sala(salaDTO);
		novaSala = this.salaRepository.save(novaSala);
		
		return new SalaDTO(novaSala);
	}
	
	
	
	public List<SalaDTO> listarSalas(){
		
		return this.salaRepository.findAll().stream().map(SalaDTO::new).toList();
	}
	
	
	
	public SalaDTO editarSala(Long id, SalaDTO salaDTO) {
		Optional<Sala> salaOptional = this.salaRepository.findById(id);
		
		if(salaOptional.isEmpty()) {
			return null;
		}
		
		Sala sala = salaOptional.get();
		sala.setNome(salaDTO.nome());
		
		sala = salaRepository.save(sala);
		
		return new SalaDTO(sala);
	}
	
	
	
	public SalaDTO excluirSala(Long id) {
		
		Optional<Sala> salaOptional = this.salaRepository.findById(id);
		
		if(salaOptional.isEmpty()) {
			return null;
		}
		
		Sala salaExcluida = salaOptional.get();
		salaRepository.deleteById(id);
		
		return new SalaDTO(salaExcluida);
	}
	
	
}
