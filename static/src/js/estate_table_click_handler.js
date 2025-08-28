document.addEventListener('click', function (e) {

   const star = e.target.closest('.favorite-star');
if (star) {
    e.stopPropagation();
    const isActive = star.classList.contains('active-star');

    // Toggle UI immediately
    if (isActive) {
        star.innerHTML = '&#9734;';
        star.style.color = 'gray';
        star.classList.remove('active-star');
    } else {
        star.innerHTML = '&#9733;';
        star.style.color = 'gold';
        star.classList.add('active-star');
    }

    // Then send update to server
    const propertyId = parseInt(star.getAttribute('data-id'), 10);
    if (!propertyId) return;

    fetch('/my/estate/favorite/toggle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            // Include CSRF token here if needed
        },
        body: JSON.stringify({property_id: propertyId}),
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Favorite toggle response:', data);
        const result = data.result || {};
        if (!result.success) {
            alert('Failed to update favorite: ' + (typeof result.error === 'string' ? result.error : JSON.stringify(result.error) || 'Unknown error'));

            // Optionally revert UI change if server update failed
            if (isActive) {
                // Revert back to active star since server failed to update off
                star.innerHTML = '&#9733;';
                star.style.color = 'gold';
                star.classList.add('active-star');
            } else {
                // Revert back to inactive star
                star.innerHTML = '&#9734;';
                star.style.color = 'gray';
                star.classList.remove('active-star');
            }
        }
    })
    .catch(err => alert('Network error: ' + err.message));

    return;
    }

    // Existing row click logic
    const row = e.target.closest('.clickable-row');
    if (row) {
        if (
            e.target.closest('.favorite-checkbox') || 
            e.target.closest('.favorite-star') || 
            e.target.tagName === 'INPUT' || 
            e.target.tagName === 'LABEL'
        ) {
            return;
        }
        const url = row.getAttribute('data-href');
        if (url) {
            console.log("Redirecting to", url);
            window.location.href = url;
        }
    }
});
