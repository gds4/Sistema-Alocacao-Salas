package edu.ifba.salas_ms.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtUtil {
    
    @Value("${api.security.token.secret}")
    private String secret;

    public List<String> extractRoles(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getClaim("roles").asList(String.class);
    }

    public boolean validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("Projeto Final PWEB")
                .build();
            verifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}