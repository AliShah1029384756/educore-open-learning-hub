// EduCore discovery UX enhancements. Works alongside the existing app.js search/filter logic.
(() => {
    const inputIds = ['searchInput', 'heroSearchInput'];

    function getInputs() {
        return inputIds.map(id => document.getElementById(id)).filter(Boolean);
    }

    function syncInputs(value, source) {
        getInputs().forEach(input => {
            if (input !== source) input.value = value;
        });
    }

    function focusSearch() {
        const input = document.getElementById('searchInput') || document.getElementById('heroSearchInput');
        if (!input) return;
        input.focus();
        input.select();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function restoreQuery() {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('q');
        if (!query) return;
        const input = document.getElementById('searchInput') || document.getElementById('heroSearchInput');
        if (!input) return;
        input.value = query;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function updateShareableQuery(value) {
        const url = new URL(window.location.href);
        if (value.trim()) url.searchParams.set('q', value.trim());
        else url.searchParams.delete('q');
        window.history.replaceState({}, '', url);
    }

    function init() {
        const inputs = getInputs();
        if (!inputs.length) return;

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                syncInputs(input.value, input);
                updateShareableQuery(input.value);
            });
            input.addEventListener('keydown', event => {
                if (event.key === 'Escape') {
                    input.value = '';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.blur();
                }
            });
        });

        document.addEventListener('keydown', event => {
            const tag = document.activeElement?.tagName?.toLowerCase();
            const typing = ['input', 'textarea', 'select'].includes(tag) || document.activeElement?.isContentEditable;
            if (event.key === '/' && !typing) {
                event.preventDefault();
                focusSearch();
            }
        });

        restoreQuery();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
