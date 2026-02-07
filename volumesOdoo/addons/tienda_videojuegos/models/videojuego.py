# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Videojuego(models.Model):
    _name = 'tienda.videojuego'
    _description = 'Videojuego'
    _rec_name = 'nombre'

    nombre = fields.Char(
        string='Nombre del Juego',
        required=True,
        help='Título del videojuego'
    )
    
    consola = fields.Selection(
        selection=[
            ('ps5', 'PS5'),
            ('xbox', 'Xbox'),
            ('switch', 'Switch'),
            ('pc', 'PC'),
        ],
        string='Consola',
        required=True,
        help='Plataforma del videojuego'
    )
    
    precio_base = fields.Float(
        string='Precio Base',
        required=True,
        digits=(10, 2),
        help='Precio sin impuestos ni descuentos'
    )
    
    unidades = fields.Integer(
        string='Unidades en Stock',
        required=True,
        default=0,
        help='Cantidad de unidades disponibles'
    )
    
    estado = fields.Selection(
        selection=[
            ('nuevo', 'Nuevo'),
            ('segunda_mano', 'Segunda Mano'),
        ],
        string='Estado',
        required=True,
        default='nuevo',
        help='Condición del videojuego'
    )
    
    descuento = fields.Boolean(
        string='Aplicar Descuento',
        default=False,
        help='Marcar para aplicar un descuento de 10€'
    )
    
    valor_stock = fields.Float(
        string='Valor del Stock',
        compute='_compute_valor_stock',
        store=True,
        digits=(10, 2),
        help='Valor total del inventario (Precio Base × Unidades)'
    )
    
    precio_final = fields.Float(
        string='Precio Final',
        compute='_compute_precio_final',
        store=True,
        digits=(10, 2),
        help='Precio después de aplicar descuento si corresponde'
    )
    
    @api.depends('precio_base', 'unidades')
    def _compute_valor_stock(self):
        for record in self:
            record.valor_stock = record.precio_base * record.unidades
    
    @api.depends('precio_base', 'descuento')
    def _compute_precio_final(self):
        for record in self:
            if record.descuento:
                record.precio_final = record.precio_base - 10.0
            else:
                record.precio_final = record.precio_base
