from odoo import http
from odoo.http import request


class EstateWebsiteController(http.Controller):
    @http.route(['/estate'], type='http', auth='public')
    def show_playground(self):
        """
        yo
        """
        