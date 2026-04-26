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
            if (target === fileName) {
                link.classList.add('active');
            }
        });
    }

    function setupThemeToggle() {
        const html = document.documentElement;
        const button = document.getElementById('globalThemeToggle');
        const savedTheme = localStorage.getItem('theme');
        const fallbackTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        let theme = savedTheme || fallbackTheme;

        function renderTheme() {
            const dark = theme === 'dark';
            if (dark) {
                html.setAttribute('data-theme', 'dark');
            } else {
                html.removeAttribute('data-theme');
            }

            if (button) {
                button.innerHTML = dark
                    ? '<i class="fas fa-moon"></i> Theme'
                    : '<i class="fas fa-sun"></i> Theme';
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
        await injectPartial('globalHeader', 'header.html');
        await injectPartial('globalFooter', 'footer.html');
        applyActiveNav();
        setupThemeToggle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShell);
    } else {
        initShell();
    }
})();
