CREATE DATABASE sistema_boletas;

CREATE TABLE personal (
    id SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    rol VARCHAR(50) NOT NULL,
    cedula VARCHAR(14) NOT NULL;
    area_personal VARCHAR(50),
    claveuser VARCHAR(100),
    fecha_reg DATE NOT NULL
);

INSERT INTO personal(nombre, email, rol, cedula,area_personal, claveuser, estado, fecha_reg) 
VALUES('Alberto Jesus Graterol Flores','algcmusic18@gmail.com','departamento de evaluacion', '2787564',
	   'Directivo', 'clave8346', 'Activo', DATE '26-07-2021');



CREATE TABLE estudiante (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    cedula_escolar VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(255) NOT NULL,
    genero VARCHAR(50),
    grado VARCHAR(50) NOT NULL,
    seccion VARCHAR(10) NOT NULL,
    boleta_generada VARCHAR(15)
);

CREATE TABLE indicador (
    id SERIAL NOT NULL PRIMARY KEY,
    indicador VARCHAR(1200) NOT NULL,
    momento VARCHAR(17) NOT NULL,
    area VARCHAR(50) NOT NULL,
    condicion_especial VARCHAR(10),
    id_creador VARCHAR(6) NOT NULL,
    grado VARCHAR(9),
    literal VARCHAR(10), 
    fecha_creacion VARCHAR(8) NOT NULL,
);


CREATE TABLE boleta (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    anio_escolar VARCHAR(15) NOT NULL,
    grado VARCHAR (10) NOT NULL,
    seccion VARCHAR(10) NOT NULL,
    indicadores_boleta JSON NOT NULL,
    momento VARCHAR(10) NOT NULL,
    nombre_estudiante VARCHAR NOT NULL,
    nombre_docente VARCHAR NOT NULL,
    cedula_estudiante VARCHAR NOT NULL,
    inicio_momemnto VARCHAR NOT NULL,
    fin_momento VARCHAR NOT NULL,
    fecha_de_creacion VARCHAR NOT NULL
);

CREATE TABLE materias (
    id SERIAL NOT NULL PRIMARY KEY,
    materia VARCHAR(35) NOT NULL,
    tipo VARCHAR(18) NOT NULL,
);

