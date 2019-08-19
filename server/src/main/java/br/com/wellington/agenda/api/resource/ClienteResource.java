package br.com.wellington.agenda.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.wellington.agenda.api.dto.ClienteProjection;
import br.com.wellington.agenda.api.event.RecursoCriadoEvent;
import br.com.wellington.agenda.api.model.Cliente;
import br.com.wellington.agenda.api.service.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private ClienteService service;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR') and #oauth2.hasScope('read')")
	public List<ClienteProjection> listar() {
		return service.findAllProjectedBy();
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR') and #oauth2.hasScope('write')")
	public ResponseEntity<Cliente> cria(@Valid @RequestBody Cliente cliente, HttpServletResponse response) {
		cliente = service.save(cliente);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, cliente.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR') and #oauth2.hasScope('write')")
	public void excluir(@PathVariable Long id) {
		service.delete(id);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Cliente> buscaPeloCodigo(@PathVariable Long id) {
		Cliente cliente= service.findOne(id);		 
		 return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR') and #oauth2.hasScope('write')")
	public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @Valid @RequestBody Cliente cliente) {
		try {
			cliente = service.atualizar(id, cliente);
			return ResponseEntity.ok(cliente);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
