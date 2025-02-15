package edu.ifba.usuarios_ms.models;

import org.springframework.security.core.GrantedAuthority;

import edu.ifba.usuarios_ms.dtos.RoleDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "roles")
public class Role implements GrantedAuthority{
  
  public Role(){
    super();
  }

  public Role(Long id, String descricao){
    this.id = id;
    this.descricao = descricao;
  }

  public Role(RoleDTO roleDTO){
    this.id = roleDTO.id();
    this.descricao = roleDTO.descricao();
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String descricao;

  @Override
  public String getAuthority() {
    return descricao;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

}
