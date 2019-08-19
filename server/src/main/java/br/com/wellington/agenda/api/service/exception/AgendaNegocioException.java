package br.com.wellington.agenda.api.service.exception;

public class AgendaNegocioException extends RuntimeException {

	private static final long serialVersionUID = 4744067662094824647L;

	public AgendaNegocioException() {
	}

	public AgendaNegocioException(String message, Throwable cause) {
		super(message, cause);
	}

	public AgendaNegocioException(String message) {
		super(message);
	}

	
}
