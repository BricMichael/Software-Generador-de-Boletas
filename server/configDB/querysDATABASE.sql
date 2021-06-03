CREATE DATABASE sistema_boletas;

CREATE TABLE personal (
    id_personal SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rol VARCHAR(50) NOT NULL,
    area_personal VARCHAR(50) NOT NULL,
    contraseña VARCHAR(100) NOT NULL UNIQUE,
    estado VARCHAR(10),
    fecha_reg DATE NOT NULL
);


INSERT INTO personal(nombre, email, rol, area_personal, contraseña, estado, fecha_reg) VALUES
('alberto','algcmusic18@gmail.com', 'administrador', 'Directivo', 'DptoEvaluacion', 'Activo', DATE '01-06-2021');


CREATE TABLE grado (
  id_grado SERIAL NOT NULL PRIMARY KEY,
  nombre VARCHAR(15) NOT NULL,
  seccion VARCHAR(5) NOT NULL
  );
  


CREATE TABLE estudiante (
    id_estudiante BIGSERIAL NOT NULL PRIMARY KEY,
    cedula_escolar VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(255) NOT NULL,
    genero VARCHAR(50),
    grado VARCHAR(50) NOT NULL,
    seccion VARCHAR(10) NOT NULL
);

CREATE TABLE indicador (
    id_indicador BIGSERIAL NOT NULL PRIMARY KEY,
    descripcion VARCHAR(1050) NOT NULL,
    literal VARCHAR(10) NOT NULL,
    area VARCHAR(50) NOT NULL,
    condicion_especial VARCHAR(30) NULL,
    fecha_creacion DATE NOT NULL
);

CREATE TABLE boleta (
    id_boleta BIGSERIAL NOT NULL PRIMARY KEY,
    año_escolar VARCHAR(15) NOT NULL,
    momento VARCHAR(10) NOT NULL,
    personalidad_estudiante VARCHAR(1300) NOT NULL,
    fecha_de_creacion DATE NOT NULL
);


