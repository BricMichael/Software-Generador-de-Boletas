CREATE DATABASE sistema_boletas;

CREATE TABLE personal (
    id SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rol VARCHAR(50) NOT NULL,
    cedula VARCHAR(14) NOT NULL;
    area_personal VARCHAR(50) NOT NULL,
    claveuser VARCHAR(100) NOT NULL,
    fecha_reg DATE NOT NULL
);

INSERT INTO personal(nombre, email, rol, cedula,area_personal, claveuser, estado, fecha_reg) 
VALUES('Alberto Jesus Graterol Flores','algcmusic18@gmail.com','departamento de evaluacion', '2787564',
	   'Directivo', 'clave8346', 'Activo', DATE '26-07-2021');



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
    id SERIAL NOT NULL PRIMARY KEY,
    indicador VARCHAR(1200) NOT NULL,
    momento VARCHAR(17) NOT NULL,,
    area VARCHAR(50) NOT NULL,
    condicion_especial VARCHAR(10),
    id_creador VARCHAR(6) NOT NULL,
    grado VARCHAR(9),
    literal VARCHAR(10), 
    fecha_creacion VARCHAR(8) NOT NULL,
);


CREATE TABLE boleta (
    id_boleta BIGSERIAL NOT NULL PRIMARY KEY,
    ano_escolar VARCHAR(15) NOT NULL,
    momento VARCHAR(10) NOT NULL,
    personalidad_estudiante text NOT NULL,
    fecha_de_creacion DATE NOT NULL
);

CREATE TABLE materias (
    id SERIAL NOT NULL PRIMARY KEY,
    materia VARCHAR(35) NOT NULL,
    tipo VARCHAR(18) NOT NULL,
);



select jsonb_pretty(data::jsonb) from jsoon where data ->> 'edad' = '15' and data ->> 'ciudad' = 'trujillito';   -----.