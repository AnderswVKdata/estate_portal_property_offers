/**odoo/module */

    const table = document.querySelector('table.table-hover');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th.sortable');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            console.log('Header clicked:', header.getAttribute('data-sort-key'));
            const field = header.getAttribute('data-sort-key');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // Determine current sort order (asc/desc toggle)
            let asc = !header.classList.contains('asc');
            headers.forEach(h => h.classList.remove('asc', 'desc')); // reset all
            header.classList.add(asc ? 'asc' : 'desc');

            rows.sort((a, b) => {
                const aText = a.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
                const bText = b.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();

                // Parse as float, fallback to string
                const aVal = parseFloat(aText.replace(/[^0-9.\-]+/g, '')) || aText.toLowerCase();
                const bVal = parseFloat(bText.replace(/[^0-9.\-]+/g, '')) || bText.toLowerCase();

                if (aVal < bVal) return asc ? -1 : 1;
                if (aVal > bVal) return asc ? 1 : -1;
                return 0;
            });

            // Re-append rows in new order
            rows.forEach(row => tbody.appendChild(row));
        });
    });

    

