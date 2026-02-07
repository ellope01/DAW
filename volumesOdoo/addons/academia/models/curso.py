from odoo import models, fields

class Curso(models.Model):
    _name = 'academica.curso'
    _description = 'Curso'
    
    name = fields.Char(string='Nombre', required=True)
    precio = fields.Float(string='Precio', required=True)
    alumno_ids = fields.One2many(
        'academica.alumno',
        'curso_id',
        string='Alumnos'
)