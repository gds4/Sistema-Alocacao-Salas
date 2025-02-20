package edu.ifba.usuarios_ms.services;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.ifba.usuarios_ms.dtos.UsuarioDTO;
import edu.ifba.usuarios_ms.dtos.UsuarioResponseDTO;
import edu.ifba.usuarios_ms.models.Usuario;
import edu.ifba.usuarios_ms.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private JWTokenService tokenService;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JWTokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public UsuarioResponseDTO cadastrar(UsuarioDTO usuarioCriacaoDto){
        Usuario novoUsuario = new Usuario(usuarioCriacaoDto);
        novoUsuario.setPassword(passwordEncoder.encode(novoUsuario.getPassword()));
        novoUsuario = this.usuarioRepository.save(novoUsuario);

        return new UsuarioResponseDTO(novoUsuario);
    }

    public UsuarioResponseDTO editarUsuario(Long userId, UsuarioDTO usuarioDto){

        Optional<Usuario> usuarioOptional = this.usuarioRepository.findById(userId);

        if(usuarioOptional.isEmpty()){
            return null;
        }

        Usuario usuario = usuarioOptional.get();

        usuario.setEmail(usuarioDto.email());
        usuario.setNome(usuarioDto.nome());

        usuario = usuarioRepository.save(usuario);

        return new UsuarioResponseDTO(usuario);

    }


    public UsuarioResponseDTO remover(Long id){
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if(usuarioOptional.isEmpty()){
            return null;
        }

        Usuario usuarioRemovido = usuarioOptional.get();
        
        usuarioRepository.deleteById(id);
        
        return new UsuarioResponseDTO(usuarioRemovido); 
    }

    public UsuarioResponseDTO dadosUsuario(String email){

        Optional<Usuario> usuarioOptional = usuarioRepository.buscarUsuarioPorEmail(email);

        if(usuarioOptional.isEmpty()){
            return null;
        }
        return new UsuarioResponseDTO(usuarioOptional.get());
        
    }
}
