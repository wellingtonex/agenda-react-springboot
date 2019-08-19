package br.com.wellington.agenda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.wellington.agenda.api.model.Telefone;

@Repository
public interface TelefoneRepository extends JpaRepository<Telefone, Long>{
	
}
