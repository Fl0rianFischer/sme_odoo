# -*- coding: utf-8 -*-
##############################################################################
#
# Odoo, an open source suite of business apps
# This module copyright (C) 2015 bloopark systems (<http://bloopark.de>).
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
{
    'name': 'Contact Snippet',
    'description': 'Snippet for simple contact form with lead creation',
    'category': 'Themes/Corporate',

    'author': "bloopark systems GmbH & Co. KG",
    'website': "http://www.bloopark.de",

    'version': '1.0',

    'data': [
        'views/assets.xml',
        'views/snippet.xml',
        'static/src/xml/contact_form.xml'
    ],

    'depends': [
        'website',
        'website_crm',
        'website_form'
    ],
}
