package br.com.wellington.agenda.api.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.wellington.agenda.api.dto.EnderecoViaCEPDTO;
import br.com.wellington.agenda.api.model.Cidade;
import br.com.wellington.agenda.api.model.Uf;
import br.com.wellington.agenda.api.service.LocalidadesService;

@RestController
@RequestMapping
public class LocalidadesResource {

	@Autowired
	private LocalidadesService localidadesService;
	
	@GetMapping("/ufs")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR') and #oauth2.hasScope('read')")
	public List<Uf> listar() {
		return localidadesService.listaTodasUfs();
	}
	
	@GetMapping("/cidades/{uf}")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR') and #oauth2.hasScope('read')")
	public List<Cidade> listar(@PathVariable String uf) {
		return localidadesService.buscaCidadesPorUf(uf);
	}
	
	@GetMapping("/cep/{cep}")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR') and #oauth2.hasScope('read')")
	public ResponseEntity<EnderecoViaCEPDTO> buscaEnderecoPor(@PathVariable String cep) {
		EnderecoViaCEPDTO endereco = localidadesService.buscaEnderecoPor(cep);		 
		 return endereco != null ? ResponseEntity.ok(endereco) : ResponseEntity.noContent().build();
	}
}
