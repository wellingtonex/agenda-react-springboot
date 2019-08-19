package br.com.wellington.agenda.api.service.exception;

public class PessoaInexistenteOuInativaException extends AgendaNegocioException {

	private static final long serialVersionUID = -3716694058450524639L;

	public PessoaInexistenteOuInativaException() {
		super("pessoa.inativa-ou-inexistente");
	}
}
