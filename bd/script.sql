create database atvii;
use atvii;

CREATE TABLE usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE email (
  id_email INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  id INT NOT NULL,
  PRIMARY KEY (id_email),
  CONSTRAINT fk_usuario_email FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);
