package br.com.wellington.agenda.api.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.wellington.agenda.api.dto.ClienteProjection;
import br.com.wellington.agenda.api.model.Cliente;
import br.com.wellington.agenda.api.repository.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	public Cliente save(Cliente cliente) {
		cliente.getTelefones().forEach(telefone -> telefone.setCliente(cliente));
		cliente.getEmails().forEach(email -> email.setCliente(cliente));
		clienteRepository.save(cliente);
		return cliente;
	}

	public Cliente atualizar(Long id, Cliente cliente) {
		Cliente clienteSalvo = findClienteById(id);
		clienteSalvo.getEmails().clear();
		clienteSalvo.getTelefones().clear();
		BeanUtils.copyProperties(cliente, clienteSalvo, "id", "created", "modifiedBy", "createdBy");
		return save(clienteSalvo);
	}
	
	private Cliente findClienteById(Long id) {
		Cliente cliente = clienteRepository.findOne(id);
		if (cliente == null) {
			throw new IllegalArgumentException();
		}
		return cliente;
	}

	public List<ClienteProjection> findAllProjectedBy() {		
		return clienteRepository.findAllProjectedBy();
	}

	public void delete(Long id) {
		clienteRepository.delete(id);		
	}

	public Cliente findOne(Long id) {		
		return clienteRepository.findOne(id);
	}
}
