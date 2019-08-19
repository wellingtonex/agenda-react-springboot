package br.com.wellington.agenda.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wellington.agenda.api.model.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade, Integer> {

	List<Cidade> findByUfSigla(String uf);
	Cidade findByIbgeAndNome(Integer ibge, String nome);
}
