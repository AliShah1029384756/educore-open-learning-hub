(function () {
    async function injectPartial(placeholderId, filePath) {
        const node = document.getElementById(placeholderId);
        if (!node) {
            return;
        }

        try {
            const response = await fetch(filePath, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Unable to load ' + filePath);
            }
            node.innerHTML = await response.text();
        } catch (error) {
            console.warn(error.message);
        }
    }

    function applyActiveNav() {
        const fileName = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.global-nav-link').forEach(link => {
            const target = link.getAttribute('data-nav');
            const isActive = target === fileName;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        const mediaQuery = window.matchMedia
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null;
        return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
    }

    function setupThemeToggle() {
        const html = document.documentElement;
        const button = document.getElementById('globalThemeToggle');
        let theme = getPreferredTheme();

        function renderTheme() {
            const dark = theme === 'dark';
            html.setAttribute('data-theme', dark ? 'dark' : 'light');

            if (button) {
                button.setAttribute('aria-pressed', String(dark));
                button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
                button.innerHTML = dark
                    ? '<i class="fas fa-moon" aria-hidden="true"></i> Theme'
                    : '<i class="fas fa-sun" aria-hidden="true"></i> Theme';
            }
        }

        renderTheme();

        if (button) {
            button.addEventListener('click', function () {
                theme = theme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', theme);
                renderTheme();
            });
        }
    }

    async function initShell() {
        await Promise.all([
            injectPartial('globalHeader', 'header.html'),
            injectPartial('globalFooter', 'footer.html')
        ]);
        applyActiveNav();
        setupThemeToggle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShell);
    } else {
        initShell();
    }
})();
