from odoo import models, api

class EstateProperty(models.Model):
    _inherit = 'estate.property'



    @api.model
    def property_filters(self, filters):
        domain = []

        type_filter = (filters.get('type') or '').strip()
        if type_filter and type_filter != 'All':
            domain.append(('property_type_id.name', '=', type_filter))

        max_price = filters.get('max_price')

        if max_price:
            try:
                domain.append(('expected_price', '<=', float(max_price)))
            except ValueError:
                pass

        min_living_area = filters.get('min_living_area')

        if min_living_area:
            try:
                domain.append(('living_area', '>=', int(min_living_area)))
            except ValueError:
                pass
        if filters.get('favorites_only'):
            partner = self.env.user.partner_id
            domain.append(('id', 'in', partner.favorite_property_ids.ids))

        if not domain:
            return self.sudo().search([])
        return self.sudo().search(domain)