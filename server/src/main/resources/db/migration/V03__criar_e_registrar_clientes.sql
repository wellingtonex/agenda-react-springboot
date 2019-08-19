CREATE TABLE endereco (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	logradouro VARCHAR(50) NOT NULL,	
	complemento VARCHAR(50),	
	bairro VARCHAR(50) NOT NULL,    
    cep VARCHAR(8) NOT NULL,    
    cidade_id int(11) NOT NULL,
    version BIGINT(20) NOT NULL,   	
	FOREIGN KEY (cidade_id) REFERENCES cidade(id)		
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE cliente (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	cpf BIGINT(20) NOT NULL,
	endereco_id BIGINT(20),
	created DATETIME NOT NULL,
	modified DATETIME NOT NULL,
	user_created VARCHAR(50) NOT NULL,
	user_modified VARCHAR(50),
	version BIGINT(20) NOT NULL,
	FOREIGN KEY (endereco_id) REFERENCES endereco(id)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE telefone (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,	
	numero VARCHAR(11) NOT NULL,
    tipo VARCHAR(20) NOT NULL,    	
    cliente_id BIGINT(20) NOT NULL,
    version BIGINT(20) NOT NULL,    	
	FOREIGN KEY (cliente_id) REFERENCES cliente(id)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE email (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,	
	email VARCHAR(100) NOT NULL,
	cliente_id BIGINT(20) NOT NULL,
	version BIGINT(20) NOT NULL,     	
	FOREIGN KEY (cliente_id) REFERENCES cliente(id)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


