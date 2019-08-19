CREATE TABLE usuario (
	codigo BIGINT(20) PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE permissao (
	codigo BIGINT(20) PRIMARY KEY,
	descricao VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE usuario_permissao (
	codigo_usuario BIGINT(20) NOT NULL,
	codigo_permissao BIGINT(20) NOT NULL,
	PRIMARY KEY (codigo_usuario, codigo_permissao),
	FOREIGN KEY (codigo_usuario) REFERENCES usuario(codigo),
	FOREIGN KEY (codigo_permissao) REFERENCES permissao(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO usuario (codigo, nome, email, senha) values (1, 'admin', 'admin@suriteste.com', '$2a$10$Iqi.43LoWXhRdH2TcoisZuz8OCY08i.xa97wM/bwZNUZekZlVx2oO');
INSERT INTO usuario (codigo, nome, email, senha) values (2, 'comum', 'comum@suriteste.com', '$2a$10$rFHOsHDFR1CI1lczYitM7ufERLeRF.PoCf06yKYy9Jp93J9oFg4Xq');

INSERT INTO permissao (codigo, descricao) values (1, 'ROLE_CADASTRAR');
INSERT INTO permissao (codigo, descricao) values (2, 'ROLE_PESQUISAR');



-- admin
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) values (1, 1);
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) values (1, 2);

-- comum
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) values (2, 2);
