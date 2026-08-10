(() => {
    const PATHS = [
        {
            id: 'school', title: 'School Foundation', subtitle: 'Matric / O-Levels', icon: 'fa-school',
            description: 'Build a strong foundation in maths, science, English and core subjects.',
            steps: ['Concept lesson', 'Reading summary', 'Practice drills', 'Weekly revision']
        },
        {
            id: 'college', title: 'College Exam Prep', subtitle: 'FSc / ICS / FA', icon: 'fa-graduation-cap',
            description: 'Combine board preparation with conceptual depth and targeted practice.',
            steps: ['Topic lecture', 'Chapter notes', 'Past-paper practice', 'Weak-area review']
        },
        {
            id: 'entry', title: 'Entry Test Sprint', subtitle: 'MDCAT / ECAT / NTS', icon: 'fa-stopwatch',
            description: 'Improve speed and accuracy with focused revision, MCQs and timed tests.',
            steps: ['Revision capsule', 'Mixed MCQs', 'Timed mock', 'Error-log retry']
        },
        {
            id: 'university', title: 'University CS Skills', subtitle: 'CS / SE / IT', icon: 'fa-code',
            description: 'Move from programming fundamentals to projects and portfolio-ready work.',
            steps: ['Learn concepts', 'Solve problems', 'Build mini-project', 'Ship a capstone']
        }
    ];

    const KEY = 'educore-path-progress';
    const getProgress = () => {
        try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
    };
    const saveProgress = progress => {
        try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch {}
    };

    function render() {
        const root = document.getElementById('learningPathGrid');
        if (!root) return;
        const progress = getProgress();

        root.innerHTML = PATHS.map(path => {
            const current = Math.min(Number(progress[path.id] || 0), path.steps.length);
            const percent = Math.round((current / path.steps.length) * 100);
            const completed = current === path.steps.length;
            return `<article class="path-card" data-path="${path.id}">
                <div class="path-icon"><i class="fas ${path.icon}" aria-hidden="true"></i></div>
                <span class="path-subtitle">${path.subtitle}</span>
                <h2>${path.title}</h2>
                <p>${path.description}</p>
                <div class="path-progress-row"><span>${completed ? 'Completed' : 'Progress'}</span><strong>${percent}%</strong></div>
                <div class="path-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-label="${path.title} progress"><span style="width:${percent}%"></span></div>
                <ol class="path-steps">${path.steps.map((step, index) => `<li class="${index < current ? 'done' : ''}"><button type="button" data-step="${index}" aria-label="${index < current ? 'Mark incomplete' : 'Mark complete'}: ${step}"><i class="fas ${index < current ? 'fa-circle-check' : 'fa-circle'}" aria-hidden="true"></i>${step}</button></li>`).join('')}</ol>
                ${completed ? '<div class="path-complete"><i class="fas fa-check-circle" aria-hidden="true"></i> Path completed — keep practicing and building.</div>' : ''}
            </article>`;
        }).join('');

        root.querySelectorAll('[data-step]').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('[data-path]');
                const path = card?.dataset.path;
                const step = Number(button.dataset.step);
                if (!path) return;
                const next = getProgress();
                const current = Number(next[path] || 0);
                next[path] = current === step + 1 ? step : step + 1;
                saveProgress(next);
                render();
            });
        });
    }

    const resetButton = document.getElementById('resetProgress');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (!window.confirm('Reset progress for all learning paths on this device?')) return;
            saveProgress({});
            render();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
    else render();
})();
