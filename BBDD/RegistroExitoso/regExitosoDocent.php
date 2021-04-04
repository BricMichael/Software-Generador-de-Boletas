


<?php

$name = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$email = $_POST['email'];
$nEducacion = $_POST['nivelEducacion'];
$seccion = $_POST['seccion'];
$grado = $_POST['grado'];
$telef = $_POST['telefono'];
$rif = $_POST['rif'];
$nAdmin = $_POST['nivelAdmin'];
$hidden = $_POST['ocultar'];
$coordinador = $_POST['coordinador'];
$especialidad = $_POST['especialidad'];

if ( $hidden == 'DOCENTE' ){
    //codigo de envio de los datos a la BBDD;
}
else if( $hidden == 'COORDINADOR' ){
     //codigo de envio de los datos a la BBDD;
}
else if( $hidden == 'ESPECIALISTA' ){
     //codigo de envio de los datos a la BBDD;
}
else if( $hidden == 'DepEVALUACION' ){
     //codigo de envio de los datos a la BBDD;
}else{
     //mostrar error AQUI ;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
</head>
<body>
    <h2>CONTENIDO A MOSTRAR...</h2>
</body>
</html>






