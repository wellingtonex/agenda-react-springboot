package br.com.wellington.agenda.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.wellington.agenda.api.dto.EnderecoViaCEPDTO;
import br.com.wellington.agenda.api.model.Cidade;
import br.com.wellington.agenda.api.model.Uf;
import br.com.wellington.agenda.api.repository.CidadeRepository;
import br.com.wellington.agenda.api.repository.UfRepository;

@Service
public class LocalidadesService {
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private UfRepository ufRepository;

	public EnderecoViaCEPDTO buscaEnderecoPor(String cep) {
		RestTemplate restTemplate = new RestTemplate();
		 EnderecoViaCEPDTO enderecoViaCEPDTO = restTemplate.getForObject("https://viacep.com.br/ws/{cep}/json", EnderecoViaCEPDTO.class, cep);
		 
		 Cidade cidade = cidadeRepository.findByIbgeAndNome(enderecoViaCEPDTO.getIbge(), enderecoViaCEPDTO.getLocalidade());
		 enderecoViaCEPDTO.setIdCidade(cidade.getId());
		 return enderecoViaCEPDTO;
	}

	public List<Cidade> buscaCidadesPorUf(String uf) {		
		return cidadeRepository.findByUfSigla(uf);
	}

	public List<Uf> listaTodasUfs() {
		return ufRepository.findAll();
	}

}
