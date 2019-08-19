package br.com.wellington.agenda.api.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cidade")
public class Cidade {

	@Id
	private Integer id;

	private String nome;

	@ManyToOne
	private Uf uf;

	private Integer ibge;	

}
