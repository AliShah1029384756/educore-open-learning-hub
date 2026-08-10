// EduCore local learning dashboard
// Keeps progress private in the browser; no account or backend required.
(() => {
    const STORAGE_KEY = 'educore-learning-history';
    const MAX_ITEMS = 12;

    function readHistory() {
        try {
            const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            return [];
        }
    }

    function writeHistory(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
    }

    function rememberResource(anchor) {
        const url = anchor.href;
        if (!url || !/^https?:/i.test(url)) return;

        const container = anchor.closest('.topic-card, .resource-card, .topic-item, .topic-link') || anchor;
        const title = (container.querySelector?.('h3, h4, .topic-title, .resource-title')?.textContent || anchor.textContent || 'Learning resource').trim();
        const history = readHistory().filter(item => item.url !== url);

        history.unshift({
            title: title.replace(/\s+/g, ' ').slice(0, 140),
            url,
            visitedAt: Date.now()
        });
        writeHistory(history);
        renderDashboard();
    }

    function formatAge(timestamp) {
        const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.round(minutes / 60);
        if (hours < 24) return `${hours} hr ago`;
        return `${Math.round(hours / 24)} day${Math.round(hours / 24) === 1 ? '' : 's'} ago`;
    }

    function renderDashboard() {
        const dashboard = document.getElementById('learningDashboard');
        if (!dashboard) return;

        const history = readHistory();
        if (!history.length) {
            dashboard.innerHTML = `
                <div class="learning-dashboard-empty">
                    <div>
                        <span class="dashboard-kicker">YOUR LEARNING</span>
                        <h2>Start exploring — we'll remember where you were.</h2>
                        <p>Open any resource and it will appear here automatically. Your history stays on this device.</p>
                    </div>
                    <i class="fas fa-compass dashboard-empty-icon" aria-hidden="true"></i>
                </div>`;
            return;
        }

        dashboard.innerHTML = `
            <div class="learning-dashboard-heading">
                <div>
                    <span class="dashboard-kicker">CONTINUE LEARNING</span>
                    <h2>Pick up where you left off</h2>
                </div>
                <button type="button" class="dashboard-clear" id="clearLearningHistory">Clear history</button>
            </div>
            <div class="learning-history-grid">
                ${history.slice(0, 6).map(item => `
                    <a class="learning-history-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
                        <span class="history-icon"><i class="fas fa-play"></i></span>
                        <span class="history-copy">
                            <strong>${escapeHtml(item.title)}</strong>
                            <small>${formatAge(item.visitedAt)}</small>
                        </span>
                        <i class="fas fa-arrow-up-right-from-square history-arrow" aria-hidden="true"></i>
                    </a>`).join('')}
            </div>`;

        document.getElementById('clearLearningHistory')?.addEventListener('click', () => {
            localStorage.removeItem(STORAGE_KEY);
            renderDashboard();
        });
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function init() {
        renderDashboard();

        const subjectsContainer = document.getElementById('subjectsContainer');
        if (subjectsContainer) {
            subjectsContainer.addEventListener('click', event => {
                const anchor = event.target.closest('a[href]');
                if (anchor && subjectsContainer.contains(anchor)) {
                    rememberResource(anchor);
                }
            });
        }

        window.setInterval(renderDashboard, 60000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
