# -*- coding: utf-8 -*-
{
    'name': "tienda_videojuegos",
    'summary': "Gestión de inventario para tienda de videojuegos",
    'description': """
Módulo para gestionar el inventario de una tienda de videojuegos.
Características:
- Gestión de juegos por consola
- Control de stock
- Cálculo automático de precios con descuentos
- Valoración del inventario
    """,
    'author': "My Company",
    'website': "https://www.yourcompany.com",
    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',
    # any module necessary for this one to work correctly
    'depends': ['base'],
    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/videojuego_views.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo_data.xml',
    ],
}