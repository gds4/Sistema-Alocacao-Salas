package com.ifba.edu.turmas_ms.filters;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.ifba.edu.turmas_ms.config.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  public JwtAuthFilter(JwtUtil jwtUtil) {
      this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) 
                                  throws ServletException, IOException {
      
      String authHeader = request.getHeader("Authorization");
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
          filterChain.doFilter(request, response);
          return;
      }

      String token = authHeader.substring(7);
      if (jwtUtil.validateToken(token)) {
          List<String> roles = jwtUtil.extractRoles(token);
          
          // Mapeia as roles diretamente para as SimpleGrantedAuthority
          Collection<SimpleGrantedAuthority> authorities = roles.stream()
              .map(SimpleGrantedAuthority::new)
              .collect(Collectors.toList());

          UsernamePasswordAuthenticationToken authentication = 
              new UsernamePasswordAuthenticationToken(
                  JWT.decode(token).getSubject(),
                  null,
                  authorities
              );

          SecurityContextHolder.getContext().setAuthentication(authentication);
      }
      
      filterChain.doFilter(request, response);
  }
}
