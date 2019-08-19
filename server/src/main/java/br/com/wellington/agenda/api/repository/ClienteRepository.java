package br.com.wellington.agenda.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.wellington.agenda.api.dto.ClienteProjection;
import br.com.wellington.agenda.api.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{

	List<ClienteProjection> findAllProjectedBy();
}
