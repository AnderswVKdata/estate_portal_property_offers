/**odoo/module */

document.addEventListener('click', function (e) {
    const image = e.target.closest('.clickable-card img');
    if (image) {
        const card = image.closest('.clickable-card');
        // Use data-href since XML sets that for the URL
        const url = card?.getAttribute('data-href');
        if (url) {
            console.log('🔗 Navigating to:', url);
            window.location.href = url;
        }
    }
});


