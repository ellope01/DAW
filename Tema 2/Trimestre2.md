# Sistemas de Gestión Empresarial 

## 1. Personalizar correo de bienvenida

Para ello vamos a necesitar los siguientes pasos

- Lo primero que tenemos que hacer es ponerlo en modo desarrollador (para saber que estamos en modo desarrollador debe de sale un bicho al lado de los mennsajes)
- Accedemos a las plantillas del correo electrónico y creamos una nueva


- En aplicar a : Orden de ventas
- Asunto: pedido de venta
- Contenido: 
    nombreEmpresa 
    Recuerda pagar el pedido antes del: Fecha Pago
    Gracias por tu su compra. nombreEmpresa

Donde esta nombreEmpresa y Fecha Pago, nos saldran los datos que queremos visualizar, sin tener que poner como object.name o object.partnner_id.name , para que quede más visual a la hora de escribirla.

Nos tendria que quedar así

![Imagen Ejemplo Plantilla](./imagenes/imagen1.png)

*Para poder ver la fecha de pago primero habrá que ponerla en el pedido*


Para poder visualizarlo solo tenemos que darle a vista previa, que en mi caso se verías así

![Imagen Ejemplo Vista Previa](./imagenes/Imagen2.png)


### 1.1 Mandarlo manualmente 
Para que funcione nos tenemos que ir a ventas y medidos de ventas y al enviar un mensaje nuevo tendremos que selecionar la plantilla que acabamos de crear [Costum] Mensaje Bienvenida. (sale en la parte de abajo).


### 1.2 Mandarlo automatizado
Si automatizamos el mensaje cada vez que nos hagan un pedido se enviará automaticamente y no tendremos que enviarla cada vez, para ello debemos de seguir los siguientes pasos
- Tenemos que ponerlo en modo desarrollador si no lo tenemos ya
- Y dentro de tecnico nos metemos en acciones de servidor y creamos uno nuevo
    - Le ponemos un nombre, en este caso [COSTUM] Crear correo electronico automatico en venta
    - En el tipo seleccionamos: Enviar como electrónico
    - Modelo: Orden de ventas
    - Grupos permitidos, este campo lo vamos a dejar en vacio pero sirve para restringir la entrada a las personas que necesiten este campo.
    - En la plantilla de correo electronico ponemos la que habiamos creado [Costum] Mensaje de Bienvenida
    - Y en enviar correo electrónico como, lo dejamos como mensaje.

Nos quedaría una cosa asi
![Imagen Ejemplo Automatizado](./imagenes/imagen3.png)

Ahora cada vez que confirmemos el pedido se tiene que generar automaticamente esta acción, pero aun nos queda un paso que es crear la automatización. Para ello debemos hacer los siguiente:
- Nos tenemos que ir a aplicaciones, borrar lo que nos sale por defecto y buscar autom, y  **activamos base_automation**
- Volvemos a tecnico y nos ponemos en regla de automatización
- Creamos una nueva
    - Nombre: envío mail venta automatica
    - Modelo: pedido de ventas
    - Activador: El estado esta establecido como - orden de venta
    - Lo demás se queda igual
    - Ejecutar acciones existentes y seleccionamos la creada




# Sistemas de Gestión Empresarial 

## 1. Personalizar correo de bienvenida

Para ello vamos a necesitar los siguientes pasos

- Lo primero que tenemos que hacer es ponerlo en modo desarrollador (para saber que estamos en modo desarrollador debe de sale un bicho al lado de los mennsajes)
- Accedemos a las plantillas del correo electrónico y creamos una nueva


- En aplicar a : Orden de ventas
- Asunto: pedido de venta
- Contenido: 
    nombreEmpresa 
    Recuerda pagar el pedido antes del: Fecha Pago
    Gracias por tu su compra. nombreEmpresa

Donde esta nombreEmpresa y Fecha Pago, nos saldran los datos que queremos visualizar, sin tener que poner como object.name o object.partnner_id.name , para que quede más visual a la hora de escribirla.

Nos tendria que quedar así

![Imagen Ejemplo Plantilla](./imagenes/imagen1.png)

*Para poder ver la fecha de pago primero habrá que ponerla en el pedido*


Para poder visualizarlo solo tenemos que darle a vista previa, que en mi caso se verías así

![Imagen Ejemplo Vista Previa](./imagenes/Imagen2.png)


### 1.1 Mandarlo manualmente 
Para que funcione nos tenemos que ir a ventas y medidos de ventas y al enviar un mensaje nuevo tendremos que selecionar la plantilla que acabamos de crear [Costum] Mensaje Bienvenida. (sale en la parte de abajo).


### 1.2 Mandarlo automatizado
Si automatizamos el mensaje cada vez que nos hagan un pedido se enviará automaticamente y no tendremos que enviarla cada vez, para ello debemos de seguir los siguientes pasos
- Tenemos que ponerlo en modo desarrollador si no lo tenemos ya
- Y dentro de tecnico nos metemos en acciones de servidor y creamos uno nuevo
    - Le ponemos un nombre, en este caso [COSTUM] Crear correo electronico automatico en venta
    - En el tipo seleccionamos: Enviar como electrónico
    - Modelo: Orden de ventas
    - Grupos permitidos, este campo lo vamos a dejar en vacio pero sirve para restringir la entrada a las personas que necesiten este campo.
    - En la plantilla de correo electronico ponemos la que habiamos creado [Costum] Mensaje de Bienvenida
    - Y en enviar correo electrónico como, lo dejamos como mensaje.

Nos quedaría una cosa asi
![Imagen Ejemplo Automatizado](./imagenes/imagen3.png)

Ahora cada vez que confirmemos el pedido se tiene que generar automaticamente esta acción, pero aun nos queda un paso que es crear la automatización. Para ello debemos hacer los siguiente:
- Nos tenemos que ir a aplicaciones, borrar lo que nos sale por defecto y buscar autom, y  **activamos base_automation**
- Volvemos a tecnico y nos ponemos en regla de automatización
- Creamos una nueva
    - Nombre: envío mail venta automatica
    - Modelo: pedido de ventas
    - Activador: El estado esta establecido como - orden de venta
    - Lo demás se queda igual
    - Ejecutar acciones existentes y seleccionamos la creada




## 2. Configuración del Sitio Web en ODOO

### 2.1 Instalación y Configuración Básica

**Instalación del Módulo Sitio Web:**
1. Accede a **Aplicaciones**
2. Busca "Sitio web" en la barra de búsqueda
3. Haz clic en **Instalar** en el módulo "Sitio Web"
4. Espera a que se complete la instalación (puede tomar algunos minutos)

**Configuración Inicial del Sitio Web:**
1. Desde el menú lateral, accede a **Sitio web**
2. En la primera configuración, selecciona:
   - **Plantilla inicial:** Elige entre las opciones disponibles (Negocios, Tienda, Portfolio, etc.)
   - **Tema:** Selecciona un tema que se ajuste a tu marca
   - **Nombre del sitio:** Ingresa el nombre de tu empresa
   - **Dominio:** Configura tu dominio si ya lo tienes

### 2.2 Gestión de Catálogo de Productos

**Creación de Categorías:**
1. Accede a **Sitio web** → **Comercio electrónico** → **Categorías**
2. Haz clic en **Nuevo** para crear una categoría
3. Configura los siguientes campos:
   - **Nombre de categoría:** Ej: "Electrónica", etc.
   - **Categoría padre:** Selecciona si pertenece a una categoría superior
   - **Imagen de categoría:** Sube una imagen representativa
   - **Descripción:** Añade una descripción 

**Publicación de Productos:**
1. Navega a **Ventas** → **Productos**
2. Selecciona el producto que deseas publicar
3. En la pestaña **Ventas**, configura:
   - **¿Está publicado?:** Marcar como **check**


### 2.3 Personalización Avanzada del Sitio Web

**Acceso al Editor:**
1. Desde la vista principal del sitio web, haz clic en **Editar** (botón superior izquierdo)
2. Se activará el editor visual con todas las herramientas disponibles

**Modificación de Contenidos:**
- **Texto:** Haz clic en cualquier texto para editarlo. Aparecerá una barra lateral con opciones de formato, fuente, tamaño y color
- **Botones:** Selecciona un botón para cambiar su texto, color, y en **Editar enlace** asignar URL interna o externa


**Gestión de Secciones:**
- **Añadir sección:** Botón "+" en cualquier parte de la página
- **Eliminar sección:** Seleccionar sección → Papelera en barra de herramientas
- **Reordenar:** Arrastrar y soltar secciones usando el icono de menú
- **Duplicar:** Opción útil para mantener consistencia en diseño



## 3. Desarrollo de Módulos Personalizados en ODOO

### 3.1 Arquitectura de ODOO

**Modelo MVC de ODOO:**
- **Modelos (Python):** Definición de estructura de datos y lógica de negocio
- **Vistas (XML):** Interfaz de usuario y presentación de datos
- **Controladores (Python):** Lógica de aplicación y manejo de peticiones web

**Conexión con Base de Datos:**
- ODOO utiliza PostgreSQL como base de datos
- El **ORM (Object-Relational Mapping)** maneja todas las operaciones CRUD
- Capa de seguridad integrada con sistema de permisos por usuario/grupo

### 3.2 Configuración del Entorno de Desarrollo

**Estructura de Docker Compose:**
```yaml
version: '3.1'
services:
  odoo:
    image: odoo:16.0
    depends_on:
      - db
    ports:
      - "8069:8069"
    volumes:
      - ./odoo-data:/var/lib/odoo
      - ./custom-addons:/mnt/extra-addons  # Directorio para módulos personalizados
    environment:
      - HOST=db
      - USER=odoo
      - PASSWORD=odoo

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_USER=odoo
      - POSTGRES_PASSWORD=odoo
```

**Configuración de Directorios Locales:**
```
/proyecto-odoo/
├── docker-compose.yml
├── odoo-data/
└── custom-addons/
    └── mi_modulo/
        ├── __init__.py
        ├── __manifest__.py
        ├── models/
        ├── views/
        └── security/
```

### 3.3 Creación de un Módulo Básico

**Estructura Manual:**
1. Crea la estructura de directorios:
```bash
mkdir -p custom-addons/mi_primer_modulo/{models,views,security}
```

2. **__init__.py** (puede estar vacío o importar subdirectorios):
```python
from . import models
from . import views
```

3. **__manifest__.py** (configuración del módulo):
```python
{
    'name': 'Mi Primer Módulo',
    'version': '1.0',
    'summary': 'Módulo de ejemplo para aprendizaje ODOO',
    'description': '''
        Este módulo es un ejemplo educativo que incluye:
        - Modelos personalizados
        - Vistas básicas
        - Seguridad y permisos
    ''',
    'category': 'Tools',
    'author': 'Tu Nombre',
    'website': 'https://www.tudominio.com',
    'depends': ['base', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'views/mi_vista.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,
}
```

**Uso de Scaffold (Automatizado):**
```bash
# Acceder al contenedor ODOO
docker exec -it nombre_contenedor_odoo bash

# Generar estructura automática
odoo scaffold mi_modulo /mnt/extra-addons/

# La estructura generada incluye:
# - Modelo básico
# - Vista de árbol y formulario
# - Archivos de seguridad
# - Menús de navegación
```

### 3.4 Desarrollo de Modelos y Vistas

**Modelo Python Básico:**
```python
# models/mi_modelo.py
from odoo import models, fields, api

class MiModeloPersonalizado(models.Model):
    _name = 'mi.modulo.modelo'
    _description = 'Modelo Personalizado de Ejemplo'
    
    name = fields.Char(string='Nombre', required=True)
    fecha_creacion = fields.Date(string='Fecha de Creación', default=fields.Date.today)
    estado = fields.Selection([
        ('borrador', 'Borrador'),
        ('confirmado', 'Confirmado'),
        ('cancelado', 'Cancelado')
    ], string='Estado', default='borrador')
    monto = fields.Float(string='Monto')
    activo = fields.Boolean(string='Activo', default=True)
    
    # Relación con otros modelos
    partner_id = fields.Many2one('res.partner', string='Cliente')
    user_id = fields.Many2one('res.users', string='Responsable', default=lambda self: self.env.user)
```

**Vista XML Básica:**
```xml
<!-- views/mi_vista.xml -->
<odoo>
    <data>
        <!-- Vista de árbol (lista) -->
        <record id="vista_arbol_mi_modelo" model="ir.ui.view">
            <field name="name">mi.modulo.tree</field>
            <field name="model">mi.modulo.modelo</field>
            <field name="arch" type="xml">
                <tree>
                    <field name="name"/>
                    <field name="fecha_creacion"/>
                    <field name="estado"/>
                    <field name="monto"/>
                    <field name="partner_id"/>
                </tree>
            </field>
        </record>
        
        <!-- Vista de formulario -->
        <record id="vista_form_mi_modelo" model="ir.ui.view">
            <field name="name">mi.modulo.form</field>
            <field name="model">mi.modulo.modelo</field>
            <field name="arch" type="xml">
                <form>
                    <header>
                        <button name="action_confirmar" type="object" string="Confirmar" 
                                states="borrador" class="btn-primary"/>
                        <button name="action_cancelar" type="object" string="Cancelar" 
                                states="confirmado" class="btn-secondary"/>
                        <field name="estado" widget="statusbar"/>
                    </header>
                    <sheet>
                        <group>
                            <field name="name"/>
                            <field name="fecha_creacion"/>
                            <field name="partner_id"/>
                            <field name="monto"/>
                        </group>
                    </sheet>
                </form>
            </field>
        </record>
        
        <!-- Acciones de menú -->
        <record id="accion_mi_modelo" model="ir.actions.act_window">
            <field name="name">Mis Modelos</field>
            <field name="res_model">mi.modulo.modelo</field>
            <field name="view_mode">tree,form</field>
        </record>
        
        <menuitem id="menu_principal" name="Mi Módulo" 
                  sequence="10" groups="base.group_user"/>
        <menuitem id="submenu_mi_modelo" name="Registros" 
                  parent="menu_principal" sequence="10"/>
        <menuitem id="menu_mi_modelo" name="Todos los Registros" 
                  parent="submenu_mi_modelo" action="accion_mi_modelo" sequence="10"/>
    </data>
</odoo>
```

