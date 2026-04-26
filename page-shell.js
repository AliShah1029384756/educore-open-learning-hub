(function () {
    const html = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const fallbackTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let theme = savedTheme || fallbackTheme;

    function applyTheme() {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-moon"></i> Theme';
            }
        } else {
            html.removeAttribute('data-theme');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-sun"></i> Theme';
            }
        }
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            applyTheme();
        });
    }

    applyTheme();
})();