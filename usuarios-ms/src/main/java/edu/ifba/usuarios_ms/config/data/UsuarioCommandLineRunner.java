package edu.ifba.usuarios_ms.config.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.ifba.usuarios_ms.models.Role;
import edu.ifba.usuarios_ms.models.Usuario;
import edu.ifba.usuarios_ms.repositories.RoleRepository;
import edu.ifba.usuarios_ms.repositories.UsuarioRepository;

import java.util.List;

@Configuration
public class UsuarioCommandLineRunner {

    @Bean
    public CommandLineRunner loadData(UsuarioRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.count() == 0) {
                Role professorRole = new Role();
                professorRole.setDescricao("ROLE_PROFESSOR");
                Role adminRole = new Role();
                adminRole.setDescricao("ROLE_ADMIN");
                Role userRole = new Role();
                userRole.setDescricao("ROLE_USUARIO");
                roleRepository.saveAll(List.of(professorRole, adminRole, userRole));
            }

            if (userRepository.buscarUsuarioPorEmail("projetopweb091@gmail.com").isEmpty()) {
                Usuario adminUser = new Usuario();
                adminUser.setNome("Admin");
                adminUser.setEmail("projetopweb091@gmail.com");
                adminUser.setPassword(passwordEncoder.encode("123456"));
                adminUser.setRoles(roleRepository.findAll());

                userRepository.save(adminUser);
            }
        };
    }
}