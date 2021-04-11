


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
$clave = $_POST['clave'];

if ( $hidden == 'DOCENTE' ){
    //codigo de envio de los datos a la BBDD;
}
else if( $hidden == 'COORDINADOR' ){
     //codigo de envio de los datos a la BBDD;
}
else if( $hidden == 'ESPECIALISTA' ){
     //codigo de envio de los datos a la BBDD;
     echo 'hola especialista: '. $name;
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
    <link rel='shortcut icon' href='../img/logo.ico' type='image/x-icon'>
    <link rel='stylesheet' href='../css/regExitoso.css'> 
    <title>Registro Exitoso</title>
</head>
<body>
    
    <div class='contenido'>
         <div id="h2">
               <h2 >FELICIDADES TE HAS REGISTRADO EXITOSAMENTE</h2>
         </div>
          <div id='enlace'>
               <a href="../Views/index.html">Continuar</a>
          </div>
          
    </div>

</body>
</html>






