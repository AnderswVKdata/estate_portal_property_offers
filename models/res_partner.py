
from odoo import models, fields
class ResPartner(models.Model):
    _inherit = 'res.partner'

    favorite_property_ids = fields.Many2many(
        comodel_name='estate.property',
        string='Favorite Properties',
        relation='res_partner_favorite_property_rel',
        column1='partner_id',
        column2='property_id',
    )