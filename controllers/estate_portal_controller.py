from odoo import http
from odoo.http import request


class EstatePortalController(http.Controller):

    @http.route('/my/estate-available', type='http', auth="user", website=True, csrf=False)
    def portal_estate_available(self, **kwargs):

        filters = {
            'type': kwargs.get('type'),
            'max_price': kwargs.get('max_price'),
            'min_living_area': kwargs.get('min_living_area'),
             'favorites_only': kwargs.get('favorites_only') in ['on', 'true', '1', True],
        }
        properties = request.env['estate.property'].property_filters(filters)
        property_types = request.env['estate.property.type'].sudo().search([])

        return request.render('estate_portal_property_offers.user_portal_estate_view', {
            'properties': properties,
            'page_name': 'portal_estate_available',
            'property_types': property_types,
            'partner': request.env.user.partner_id,
            'selected_type': filters.get('type') or '',
            'selected_max_price': filters.get('max_price'),
            'selected_min_living_area': filters.get('min_living_area'),
            'favorites_only': bool(kwargs.get('favorites_only')),
            
        })

    @http.route('/my/estate/favorite/toggle', type='json', auth='user', methods=['POST'], csrf=False)
    def toggle_favorite(self, **kwargs):
        property_id = int(kwargs.get('property_id') or 0)
        if not property_id:
            return {'success': False, 'error': 'No property_id provided'}
        partner = request.env.user.partner_id
        property_rec = request.env['estate.property'].browse(property_id)
        if not property_rec.exists():
            return {'success': False, 'error': 'Property not found'}

        if property_rec in partner.favorite_property_ids:
            partner.write({'favorite_property_ids': [(3, property_rec.id)]})  # remove
            return {'success': True, 'favorited': False}
        else:
            partner.write({'favorite_property_ids': [(4, property_rec.id)]})  # add
            return {'success': True, 'favorited': True}
    
    @http.route('/my/estate/<int:property_id>', type='http', auth='user', website=True)
    def property_detail(self, property_id, **kw):
        prop = request.env['estate.property'].sudo().browse(property_id)
        if not prop.exists():
            return request.not_found()
        return request.render('estate_portal_property_offers.user_portal_estate_detail_view', {
            'property': prop,
            'partner': request.env.user.partner_id,
        })

    
    
    @http.route('/my/estate/<int:property_id>/offer', type='http', auth='user', website=True, methods=['POST'], csrf=False)
    def submit_offer(self, property_id, price=None, **kwargs):
        if price:
            price = float(price)
            request.env['estate.property.offer'].sudo().create({
                'price': price,
                'partner_id': request.env.user.partner_id.id,
                'property_id': property_id,
            })
        return request.redirect(f'/my/estate/{property_id}')