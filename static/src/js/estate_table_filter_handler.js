document.querySelectorAll('#filter_form select, #filter_form input').forEach(el => {
    el.addEventListener('change', () => {
      document.getElementById('filter_form').submit();
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('filter_form');
    const resetBtn = document.getElementById('reset_filters');

    // Submit form automatically on any input change
    form.querySelectorAll('select, input[type="number"], input[type="checkbox"]').forEach(function (input) {
        input.addEventListener('change', function () {
            form.submit();
        });
    });

    // Reset filters button
    resetBtn.addEventListener('click', function () {
        form.reset();
        form.submit();
    });
});