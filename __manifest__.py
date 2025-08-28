{
    'name': 'estate portal property offers',
    'version': '18.0.1.0.0',
    'depends': ['base', 'estate', 'portal'],
    'author': 'Anders',
    'category': 'Estate User Portal',
    'description': 'User portal for estate.',
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
    'assets': {
        'web.assets_frontend': [
            'estate_portal_property_offers/static/src/js/**/*',
        ],
    },
    'data': [
        'security/ir.model.access.csv',
        'views/user_portal_view.xml',
        'views/user_portal_estate_view.xml',
        'views/user_portal_estate_detail_view.xml'
    ],
    
    
}