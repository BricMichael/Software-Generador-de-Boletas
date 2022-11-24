CREATE DATABASE sistema_boletas;

CREATE TABLE personal (
    id SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    rol VARCHAR(50) NOT NULL, /* director - docente - especialista - coordinador */
    cedula VARCHAR(14),
    especialidad VARCHAR(50), /* area_personal cambiar a especialidad en el back */
    claveuser VARCHAR(100),
    fecha_reg TIMESTAMPTZ DEFAULT Now()
);

INSERT INTO personal(nombre, email, rol, cedula, especialidad, claveuser) 
VALUES('Alberto Jesus Graterol Flores','algcmusic18@gmail.com','coordinador', '12345678','musica', 'clave1234');


CREATE TABLE estudiante (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    cedula_escolar VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(255) NOT NULL,
    genero VARCHAR(50),
    grado VARCHAR(50) NOT NULL, /* nivel 1, nivel 2  y nivel 3 */
    seccion VARCHAR(10),
    boleta_generada VARCHAR(15)
);

CREATE TABLE indicador (
    id SERIAL NOT NULL PRIMARY KEY,
    indicador TEXT NULL,
    momento VARCHAR(17) NOT NULL,
    area VARCHAR(50) NOT NULL,
    condicion_especial VARCHAR(10),
    nombre_docente VARCHAR(80) NOT NULL,
    id_creador VARCHAR(40),
    proposito_general TEXT NULL,
    grado VARCHAR(9), /* nivel 1, nivel 2  y nivel 3 */
    literal VARCHAR(30), /*  muy bien, bien, en proceso, requiere nivelación */
    fecha_creacion TIMESTAMPTZ DEFAULT Now()
);


CREATE TABLE boleta (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    anio_escolar VARCHAR(15) NOT NULL,
    grado VARCHAR (10) NOT NULL, /*Grado es el nivel*/
    seccion VARCHAR(10) NULL,
    cedula_estudiante VARCHAR,
    docente_boleta JSONB NULL,
    momento VARCHAR(10) NOT NULL,
    especialista_boleta JSONB NULL,
    especialidad VARCHAR NULL,
    nombre_estudiante VARCHAR NULL,
    mes_momento_inicio VARCHAR NOT NULL,
    mes_momento_fin  VARCHAR NOT NULL,
    fecha_de_creacion TIMESTAMPTZ DEFAULT Now(),
    observacion TEXT NULL
);

CREATE TABLE materias (
    id SERIAL NOT NULL PRIMARY KEY,
    materia VARCHAR(100) NOT NULL,
    tipo VARCHAR(30) NOT NULL
);

