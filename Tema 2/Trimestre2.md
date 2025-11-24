# Sistemas de Gestión Empresarial 

## 1. Personalizar correo de bienvenida
Para ello vamos a necesitar los siguientes pasos

- Lo primero que tenemos que hacer es ponerlo en modo desarrollador
- Accedemos a las plantillas del correo y creamos una nueva

Añadir imagen de la página

- En aplicar a : Orden ventas
- Asunto: pedido de venta
- Contenido: 
Se pone en modo desarrollador 
Accedemos a plantillas de correo
creamos una nueva
aplica a : Orden ventas
asunyo : pedido de venta
	Para personalizar el asunto hay que hacerlo en contenido, y que ponerlo igual pero con dos {}, es decir, {{ object.name }}
contenido : en el mensaje / y entrar en el antepenultimo # (Marcador de posición dinamico)
cliente (cliente parner id, nombre) = object.partnner_id.name
recuerda pagarlo antes de : object.payment_term_id.name (para esto hay que ponerle condicion de pago al pedido )
gracias por tu pedido object.name



Para ponerla si nos ibamos a ventas y pedido de ventass y mensaje nuevo se puede seleccionar la plantilla que acabamos de crear (en la parte de abajo).

Automatizarlo, para que cada vez que hagamos un pedido salga
Dentro de tecnico nos metemos en acciones de servidor, una vez dentro
Generamos una nueva:
    Lo llamamos crear correo electro, automa. en venta
    En tipo seleccionamos: enviar como electronico
    Modelo: pedido de ventas
    Grupos permitidos: 
    Plantilla de correo electronico: La que hemos creador
    Enviar correo electronico como mensaje 
Y guardamos la accion 
Ahora cuando confirmemos el pedido se tiene que generar automaticamente esta acción
Todavia no sale, por lo que hay que crear la automatizacion
Nos vamos a aplicaciones y buscamos autom
y seleccionamos base_automation
Volvemos al tecnico y nos ponemos en reglas de automatizacion, 
Creamos una nueva
    Nombre: envío mail venta automatica
    Modelo: pedido de ventas
    Activador: El estado esta establecido como - orden de venta
    Lo demás lo dejamos igual.
    Ejecitar acciones existentes
    Y seleccionamos lo que habiamos creado
