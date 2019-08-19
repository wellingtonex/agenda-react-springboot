package br.com.wellington.agenda.api.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.wellington.agenda.api.repository.EmailRepository;

@RestController
@RequestMapping("/emails")
public class EmailResource {

	@Autowired
	private EmailRepository emailRepository;

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR') and #oauth2.hasScope('write')")
	public void excluir(@PathVariable Long id) {
		emailRepository.delete(id);
	}	
}
