from odoo import models, fields, api

class Alumno(models.Model):
    _name = 'academica.alumno'
    _description = 'Alumno'
    
    name = fields.Char(string='Nombre', required=True)
    edad = fields.Integer(string='Edad')
    curso_id = fields.Many2one(
        'academica.curso',
        string='Curso',
        required=True
    )
    coste = fields.Float(
        string='Coste total',
        compute='_compute_coste',
        store=True
    )
    
    @api.depends('curso_id.precio')
    def _compute_coste(self):
        for alumno in self:
            alumno.coste = (alumno.curso_id.precio if alumno.curso_id else 0.0) + 100