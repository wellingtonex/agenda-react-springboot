package br.com.wellington.agenda.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "endereco")
public class Endereco {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	
    private String logradouro;    
    
    private String complemento;
    
    private String bairro;
    
    private String cep;
    
    @ManyToOne(optional = false)
    private Cidade cidade;
    
    @Version
	private Long version;
	
}