package edu.ifba.usuarios_ms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.ifba.usuarios_ms.dtos.NotificacaoSalaDTO;
import edu.ifba.usuarios_ms.dtos.NotificacaoSalaEmailsDTO;
import edu.ifba.usuarios_ms.dtos.NotificacaoTurmaDTO;
import edu.ifba.usuarios_ms.dtos.NotificacaoTurmaEmailsDTO;
import edu.ifba.usuarios_ms.dtos.UsuarioDTO;
import edu.ifba.usuarios_ms.dtos.UsuarioResponseDTO;
import edu.ifba.usuarios_ms.models.Usuario;
import edu.ifba.usuarios_ms.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private RabbitTemplate rabbitTemplate;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
            RabbitTemplate rabbitTemplate) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rabbitTemplate = rabbitTemplate;
    }

    public UsuarioResponseDTO cadastrar(UsuarioDTO usuarioCriacaoDto) {
        Usuario novoUsuario = new Usuario(usuarioCriacaoDto);
        novoUsuario.setPassword(passwordEncoder.encode(novoUsuario.getPassword()));
        novoUsuario = this.usuarioRepository.save(novoUsuario);

        return new UsuarioResponseDTO(novoUsuario);
    }

    public UsuarioResponseDTO editarUsuario(Long userId, UsuarioDTO usuarioDto) {

        Optional<Usuario> usuarioOptional = this.usuarioRepository.findById(userId);

        if (usuarioOptional.isEmpty()) {
            return null;
        }

        Usuario usuario = usuarioOptional.get();

        usuario.setEmail(usuarioDto.email());
        usuario.setNome(usuarioDto.nome());

        usuario = usuarioRepository.save(usuario);

        return new UsuarioResponseDTO(usuario);

    }

    public UsuarioResponseDTO remover(Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if (usuarioOptional.isEmpty()) {
            return null;
        }

        Usuario usuarioRemovido = usuarioOptional.get();

        usuarioRepository.deleteById(id);

        return new UsuarioResponseDTO(usuarioRemovido);
    }

    public UsuarioResponseDTO dadosUsuario(String email) {

        Optional<Usuario> usuarioOptional = usuarioRepository.buscarUsuarioPorEmail(email);

        if (usuarioOptional.isEmpty()) {
            return null;
        }
        return new UsuarioResponseDTO(usuarioOptional.get());

    }

    public List<UsuarioResponseDTO> listarUsuariosComRoleProfessor() {

        return usuarioRepository.findByRoleDescricao("ROLE_PROFESSOR")
                .stream()
                .filter(usuario -> usuario.getRoles().stream()
                        .noneMatch(role -> role.getDescricao().equals("ROLE_ADMIN")))
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
    }

    public void processarEnvioEmailsSala(NotificacaoSalaDTO dados) {
        List<Usuario> usuarios = usuarioRepository.findByIdIn(dados.professorIds());

        List<String> emails = usuarios.stream().map(Usuario::getEmail).collect(Collectors.toList());

        NotificacaoSalaEmailsDTO dadosParaEnviar = new NotificacaoSalaEmailsDTO(dados.sala(), emails);

        rabbitTemplate.convertAndSend("salaRemovida.notificacao", dadosParaEnviar);
    }

    public void processarEnvioEmailsTurma(NotificacaoTurmaDTO dados) {
        List<Usuario> usuarios = usuarioRepository.findByIdIn(dados.professorIds());

        List<String> emails = usuarios.stream().map(Usuario::getEmail).collect(Collectors.toList());

        NotificacaoTurmaEmailsDTO dadosParaEnviar = new NotificacaoTurmaEmailsDTO(dados.turma(), emails);

        rabbitTemplate.convertAndSend("turmaRemovida.notificacao", dadosParaEnviar);
    }
}
