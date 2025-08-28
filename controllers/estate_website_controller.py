from odoo import http
from odoo.http import request


class EstateWebsiteController(http.Controller):
    @http.route('/my/estate', type='http', auth='public', website=True)
    def estate_public_list(self, **kwargs):
        properties = request.env['estate.property'].sudo().search([])  # Get all properties
        return request.render('estate_portal_property_offers.user_portal_estate_public_view', {
            'properties': properties,
        })

    @http.route('/my/estate/<int:property_id>', type='http', auth='public', website=True)
    def property_detail(self, property_id, **kw):
        prop = request.env['estate.property'].sudo().browse(property_id)
        if not prop.exists():
            return request.not_found()
        return request.render('estate_portal_property_offers.user_portal_estate_detail_view', {
            'property': prop,
        })