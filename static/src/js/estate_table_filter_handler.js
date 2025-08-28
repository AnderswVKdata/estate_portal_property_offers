document.querySelectorAll('#filter_form select, #filter_form input').forEach(el => {
    el.addEventListener('change', () => {
      document.getElementById('filter_form').submit();
    });
  });

odoo.define('estate_portal_property_offers.estate_table_filter_handler', [], function(require) {
    "use strict";

    $(document).ready(function () {
        console.log('✅ Reset filter JS loaded');

        const form = document.getElementById('filter_form');
        const resetBtn = document.getElementById('reset_filters');

        if (!form) {
            console.warn('⚠️ filter_form not found!');
            return;
        }

        if (!resetBtn) {
            console.warn('⚠️ reset_filters button not found!');
            return;
        }

        // Auto-submit on change
        form.querySelectorAll('select, input[type="number"], input[type="checkbox"]').forEach(function (input) {
            input.addEventListener('change', function () {
                form.submit();
            });
        });

        // Reset filters
        resetBtn.addEventListener('click', function () {
            console.log('🧹 Reset button clicked');
            form.reset();
            form.submit();
            const baseUrl = window.location.origin + window.location.pathname;
            window.location.href = baseUrl;
        });
    });
  });

    