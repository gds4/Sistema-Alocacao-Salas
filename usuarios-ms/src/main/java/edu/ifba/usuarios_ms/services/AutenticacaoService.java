package edu.ifba.usuarios_ms.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.ifba.usuarios_ms.repositories.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

  private UsuarioRepository usuarioRepository;

  public AutenticacaoService(UsuarioRepository usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return usuarioRepository.findByEmail(email);

  }
  
}
