// ============================================
// EDUCORE - Premium Application Logic
// ============================================

let allData = {};
let activeCategory = null;
let bookmarks = new Set();
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let languageMode = localStorage.getItem('ui-language') || 'bilingual';
let isFirstLoad = true;
let modalPreviousFocus = null;
const searchResultsMap = new Map();
const activeFilters = {
    language: 'all',
    type: 'all',
    level: 'all'
};

const curatedAdditions = {
    school: [
        {
            subjectName: 'Computer Skills and Digital Basics',
            topics: [
                { title: 'Typing and Digital Skills for Students', type: 'Practice', language: 'English', url: 'https://edu.gcfglobal.org/en/typing/', badge: '🧠 GCFGlobal' },
                { title: 'Internet Safety Basics', type: 'Read', language: 'English', url: 'https://edu.gcfglobal.org/en/internetsafety/', badge: '🛡️ Safety' },
                { title: 'Code.org CS Fundamentals', type: 'Video', language: 'English', url: 'https://code.org/students', badge: '💻 Code.org' }
            ]
        },
        {
            subjectName: 'General Science and Space Basics',
            topics: [
                { title: 'NASA Climate Kids Learning Hub', type: 'Read', language: 'English', url: 'https://climatekids.nasa.gov/', badge: '🚀 NASA' },
                { title: 'Crash Course Kids Science Playlists', type: 'Video', language: 'English', url: 'https://www.youtube.com/@crashcoursekids', badge: '🎥 CrashCourse' },
                { title: 'PhET Basics Simulations', type: 'Practice', language: 'English', url: 'https://phet.colorado.edu/', badge: '🔬 PhET' }
            ]
        }
    ],
    college: [
        {
            subjectName: 'Programming Foundations (C and Python)',
            topics: [
                { title: 'freeCodeCamp Python Course', type: 'Video', language: 'English', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', badge: '🐍 freeCodeCamp' },
                { title: 'Learn C Programming (Programiz)', type: 'Read', language: 'English', url: 'https://www.programiz.com/c-programming', badge: '📖 Programiz' },
                { title: 'HackerRank Problem Solving Practice', type: 'Practice', language: 'English', url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript', badge: '🛠️ HackerRank' }
            ]
        },
        {
            subjectName: 'Statistics and Data Thinking',
            topics: [
                { title: 'Khan Academy Statistics and Probability', type: 'Video', language: 'English', url: 'https://www.khanacademy.org/math/statistics-probability', badge: '📊 Khan Academy' },
                { title: 'OpenIntro Statistics Textbook', type: 'Read', language: 'English', url: 'https://www.openintro.org/book/os/', badge: '📘 OpenIntro' },
                { title: 'StatQuest Playlists', type: 'Video', language: 'English', url: 'https://www.youtube.com/@statquest', badge: '🎥 StatQuest' }
            ]
        }
    ],
    university: [
        {
            subjectName: 'System Design and Software Engineering',
            topics: [
                { title: 'System Design Primer (GitHub)', type: 'Read', language: 'English', url: 'https://github.com/donnemartin/system-design-primer', badge: '🏗️ System Design' },
                { title: 'Google Tech Dev Guide', type: 'Read', language: 'English', url: 'https://techdevguide.withgoogle.com/', badge: '🧭 Google' },
                { title: 'ByteByteGo System Design Videos', type: 'Video', language: 'English', url: 'https://www.youtube.com/@ByteByteGo', badge: '🎥 ByteByteGo' }
            ]
        },
        {
            subjectName: 'Data Engineering and Databases',
            topics: [
                { title: 'MongoDB University Free Courses', type: 'Video', language: 'English', url: 'https://learn.mongodb.com/', badge: '🍃 MongoDB' },
                { title: 'PostgreSQL Tutorial (Official Docs)', type: 'Read', language: 'English', url: 'https://www.postgresql.org/docs/', badge: '🗄️ PostgreSQL' },
                { title: 'SQL Practice Problems', type: 'Practice', language: 'English', url: 'https://www.sql-practice.com/', badge: '🛠️ SQL Practice' }
            ]
        }
    ],
    'entry-tests': [
        {
            subjectName: 'MDCAT and ECAT Preparation Strategy',
            topics: [
                { title: 'Khan Academy SAT and Test Prep', type: 'Video', language: 'English', url: 'https://www.khanacademy.org/test-prep', badge: '📝 Test Prep' },
                { title: 'Physics and Math MCQ Banks', type: 'Practice', language: 'English', url: 'https://www.pakistanbix.com/', badge: '🛠️ MCQ Bank' },
                { title: 'NTS Official Guide and Pattern', type: 'Read', language: 'English', url: 'https://www.nts.org.pk/', badge: '📌 NTS Official' }
            ]
        }
    ],
    'autism-special': [
        {
            subjectName: 'Special Learning and Visual Communication',
            topics: [
                { title: 'Autism Speaks Resource Library', type: 'Read', language: 'English', url: 'https://www.autismspeaks.org/autism-resources', badge: '🧩 Autism Speaks' },
                { title: 'Do2Learn Visual Supports', type: 'Practice', language: 'English', url: 'https://do2learn.com/', badge: '🖼️ Visual Learning' },
                { title: 'Understood.org Learning Guidance', type: 'Read', language: 'English', url: 'https://www.understood.org/', badge: '💙 Understood' }
            ]
        }
    ],
    research: [
        {
            subjectName: 'Research Methods and Academic Writing',
            topics: [
                { title: 'MIT OpenCourseWare Research Methods', type: 'Video', language: 'English', url: 'https://ocw.mit.edu/', badge: '🔬 MIT OCW' },
                { title: 'Purdue OWL Academic Writing', type: 'Read', language: 'English', url: 'https://owl.purdue.edu/', badge: '✍️ Purdue OWL' },
                { title: 'Google Scholar Search Skills', type: 'Practice', language: 'English', url: 'https://scholar.google.com/', badge: '📚 Google Scholar' }
            ]
        }
    ],
    miscellaneous: [
        {
            subjectName: 'Career Growth and Productivity',
            topics: [
                { title: 'Google Digital Garage Free Courses', type: 'Video', language: 'English', url: 'https://learndigital.withgoogle.com/digitalgarage', badge: '🚀 Digital Garage' },
                { title: 'Notion Learning Center', type: 'Read', language: 'English', url: 'https://www.notion.so/help/guides', badge: '🗂️ Productivity' },
                { title: 'Pomofocus Study Timer', type: 'Practice', language: 'English', url: 'https://pomofocus.io/', badge: '⏱️ Focus Tool' }
            ]
        }
    ]
};

const uiLabels = {
    english: {
        logoTagline: 'Open Learning Hub for Pakistani Students',
        sidebarTitle: 'Categories',
        heroBadge: 'Trusted Education Resource Network',
        heroHeadline: 'EduCore Open Learning Hub',
        heroSubheadline: 'Professional, free learning resources for School, College, Entry Test, and University success.',
        heroMissionQuick: 'Education is a right. We organize top free resources into one clear system.',
        heroNoteFree: 'Always free',
        heroNoteCurated: 'Curated by level',
        heroNoteFast: 'Fast discovery flow',
        missionLabel: 'Our Mission',
        missionTitle: 'One platform for free, structured, and trustworthy education.',
        missionText: 'EduCore follows a Watch, Read, Practice cycle so every learner can quickly find level-appropriate material.',
        missionCta: 'Read Full Vision',
        featuredHeading: 'Featured Learning Tracks',
        featuredSubheading: 'Start from your level and jump directly to trusted resources.',
        materialsShortcutLabel: 'Materials Library',
        desktopBookmarksLabel: 'Bookmarks',
        subjectsHeading: 'Subjects and Resources',
        subjectsSubheading: 'Open any subject card to explore videos, readings, and practice links.',
        showFeaturedLabel: 'Show Featured',
        searchPlaceholder: 'Search subjects, topics, or learning paths...',
        heroSearchPlaceholder: 'Try: physics, python, mdcat, accounting',
        startExploring: 'Start Exploring',
        clearFilters: 'Clear Filters',
        filterLanguageAll: 'Language: All',
        filterTypeAll: 'Type: All',
        filterTypeRead: 'Reading',
        filterLevelAll: 'Level: All',
        noResultsTitle: 'No resources matched your filters',
        noResultsText: 'Try Clear Filters or switch category to discover more material.',
        noBookmarksTitle: 'No bookmarked resources yet',
        noBookmarksText: 'Save resources using the heart icon inside topic details.',
        cardDescription: 'Curated resources with direct links and practical learning support.',
        openTopics: 'Open Topics',
        openResource: 'Open Resource',
        verifiedFree: 'Verified Free',
        recommendedLevel: 'Recommended level',
        recommendedResources: 'Recommended Related Resources',
        bookmarkAdded: 'Saved to bookmarks',
        bookmarkRemoved: 'Removed from bookmarks',
        kpiSubjectsLabel: 'Subjects',
        kpiResourcesLabel: 'Learning Resources',
        kpiLanguageLabel: 'Urdu + English',
        breadcrumbHome: 'Home',
        breadcrumbAllTracks: 'All Tracks',
        breadcrumbSubjects: 'Subjects'
    },
    bilingual: {
        logoTagline: 'Open Learning Hub for Pakistani Students / پاکستانی طلبہ کے لیے',
        sidebarTitle: 'Categories / زمروں',
        heroBadge: 'Trusted Education Resource Network / معتبر تعلیمی نیٹ ورک',
        heroHeadline: 'EduCore Open Learning Hub / اوپن لرننگ حب',
        heroSubheadline: 'Free professional resources for School, College, Entry Test, and University success / سکول سے یونیورسٹی تک',
        heroMissionQuick: 'Taleem bunyadi haq hai. Hum best free resources ko ek clear system mein organize karte hain.',
        heroNoteFree: 'Always free / ہمیشہ مفت',
        heroNoteCurated: 'Curated by level / لیول کے مطابق',
        heroNoteFast: 'Fast discovery flow / تیز رسائی',
        missionLabel: 'Our Mission / ہمارا مقصد',
        missionTitle: 'One platform for free, structured, and trustworthy education / ایک منظم اور قابل اعتماد پلیٹ فارم',
        missionText: 'Watch, Read, Practice cycle se student ko asani se relevant material milta hai / طالب علم کو آسان رسائی ملتی ہے۔',
        missionCta: 'Read Full Vision / مکمل وژن',
        featuredHeading: 'Featured Learning Tracks / نمایاں ٹریکس',
        featuredSubheading: 'Start from your level and jump to trusted resources / اپنے لیول سے آغاز کریں',
        materialsShortcutLabel: 'Materials Library / مواد لائبریری',
        desktopBookmarksLabel: 'Bookmarks / محفوظ',
        subjectsHeading: 'Subjects and Resources / مضامین اور وسائل',
        subjectsSubheading: 'Open a subject to explore videos, readings, and practice / موضوع کھولیں',
        showFeaturedLabel: 'Show Featured / نمایاں دکھائیں',
        searchPlaceholder: 'Search subjects, topics, or learning paths / تلاش کریں',
        heroSearchPlaceholder: 'Try: physics, python, mdcat / مثال',
        startExploring: 'Start Exploring / آغاز کریں',
        clearFilters: 'Clear Filters / فلٹر صاف کریں',
        filterLanguageAll: 'Language: All / زبان: سب',
        filterTypeAll: 'Type: All / قسم: سب',
        filterTypeRead: 'Reading / مطالعہ',
        filterLevelAll: 'Level: All / سطح: سب',
        noResultsTitle: 'No resources matched your filters / وسائل نہیں ملے',
        noResultsText: 'Try Clear Filters or switch category / فلٹر صاف کریں یا زمرہ بدلیں',
        noBookmarksTitle: 'No bookmarked resources yet / ابھی کوئی بک مارک نہیں',
        noBookmarksText: 'Use the heart icon inside topic details / دل کے آئیکن سے محفوظ کریں',
        cardDescription: 'Curated resources with direct links / منتخب وسائل',
        openTopics: 'Open Topics / موضوعات کھولیں',
        openResource: 'Open Resource / وسیلہ کھولیں',
        verifiedFree: 'Verified Free / تصدیق شدہ مفت',
        recommendedLevel: 'Recommended level / تجویز کردہ سطح',
        recommendedResources: 'Recommended Related Resources / متعلقہ وسائل',
        bookmarkAdded: 'Saved to bookmarks / محفوظ ہوگیا',
        bookmarkRemoved: 'Removed from bookmarks / ہٹا دیا گیا',
        kpiSubjectsLabel: 'Subjects / مضامین',
        kpiResourcesLabel: 'Learning Resources / وسائل',
        kpiLanguageLabel: 'Urdu + English / اردو + انگریزی',
        breadcrumbHome: 'Home / ہوم',
        breadcrumbAllTracks: 'All Tracks / تمام ٹریکس',
        breadcrumbSubjects: 'Subjects / مضامین'
    }
};

const stickyHeader = document.querySelector('.sticky-header');
const categoryNav = document.getElementById('categoryNav');
const subjectsContainer = document.getElementById('subjectsContainer');
const searchInput = document.getElementById('searchInput');
const heroSearchInput = document.getElementById('heroSearchInput');
const topicModal = document.getElementById('topicModal');
const modalTitle = document.getElementById('modalTitle');
const modalTopics = document.getElementById('modalTopics');
const closeModal = document.getElementById('closeModal');
const noResults = document.getElementById('noResults');
const featuredSection = document.getElementById('featuredSection');
const themeToggle = document.getElementById('themeToggle');
const languageToggle = document.getElementById('languageToggle');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarNav = document.getElementById('sidebarNav');
const getStartedBtn = document.getElementById('getStartedBtn');
const desktopBookmarksBtn = document.getElementById('desktopBookmarksBtn');
const showFeaturedBtn = document.getElementById('showFeaturedBtn');
const subjectCount = document.getElementById('subjectCount');
const resourceCount = document.getElementById('resourceCount');
const languageFilter = document.getElementById('languageFilter');
const typeFilter = document.getElementById('typeFilter');
const levelFilter = document.getElementById('levelFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const breadcrumb = document.getElementById('breadcrumb');
let defaultNoResultsTitle = noResults.querySelector('.no-results-title').textContent;
let defaultNoResultsText = noResults.querySelector('.no-results-text').textContent;

document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();
    initializeLanguageMode();
    setHeaderOffset();
    loadBookmarks();
    await loadData();

    if (!allData.categories || allData.categories.length === 0) {
        return;
    }

    updateStats();
    renderCategories();
    renderFeaturedCategories();
    setupEventListeners();
    setActiveCategory(allData.categories[0].id, false);
    updateBreadcrumb();
    renderSubjects();
});

function setHeaderOffset() {
    if (!stickyHeader) {
        return;
    }

    const computedPosition = getComputedStyle(stickyHeader).position;
    const headerHeight = Math.ceil(stickyHeader.getBoundingClientRect().height);
    const offset = computedPosition === 'sticky' ? headerHeight + 16 : 36;
    document.documentElement.style.setProperty('--header-offset', `${offset}px`);
}

function getHeaderOffset() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--header-offset');
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 120;
}

function setBodyLocked(locked) {
    document.body.classList.toggle('body-locked', locked);
}

function initializeTheme() {
    const htmlElement = document.documentElement;

    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function initializeLanguageMode() {
    applyLanguageMode();
    applyLocalizedText();
}

function toggleLanguageMode() {
    languageMode = languageMode === 'bilingual' ? 'english' : 'bilingual';
    localStorage.setItem('ui-language', languageMode);
    applyLanguageMode();
    applyLocalizedText();
    renderCategories();
    renderFeaturedCategories();
    updateStats();
    updateBreadcrumb();
    renderSubjects();
}

function applyLanguageMode() {
    document.body.setAttribute('data-language-mode', languageMode);
    if (!languageToggle) {
        return;
    }

    if (languageMode === 'bilingual') {
        languageToggle.innerHTML = '<i class="fas fa-language"></i>';
        languageToggle.title = 'Switch to English-only labels';
    } else {
        languageToggle.innerHTML = '<i class="fas fa-font"></i>';
        languageToggle.title = 'Switch to bilingual labels';
    }
}

function getUiText(key) {
    const bundle = uiLabels[languageMode] || uiLabels.english;
    return bundle[key] || uiLabels.english[key] || key;
}

function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function applyLocalizedText() {
    setElementText('logoTagline', getUiText('logoTagline'));
    setElementText('sidebarTitle', `📂 ${getUiText('sidebarTitle')}`);
    setElementText('heroBadge', getUiText('heroBadge'));
    setElementText('heroHeadline', getUiText('heroHeadline'));
    setElementText('heroSubheadline', getUiText('heroSubheadline'));
    setElementText('heroMissionQuick', getUiText('heroMissionQuick'));
    setElementText('heroNoteFree', getUiText('heroNoteFree'));
    setElementText('heroNoteCurated', getUiText('heroNoteCurated'));
    setElementText('heroNoteFast', getUiText('heroNoteFast'));
    setElementText('missionLabel', getUiText('missionLabel'));
    setElementText('missionTitle', getUiText('missionTitle'));
    setElementText('missionText', getUiText('missionText'));
    setElementText('missionCta', getUiText('missionCta'));
    setElementText('featuredHeading', getUiText('featuredHeading'));
    setElementText('featuredSubheading', getUiText('featuredSubheading'));
    setElementText('materialsShortcutLabel', getUiText('materialsShortcutLabel'));
    setElementText('desktopBookmarksLabel', getUiText('desktopBookmarksLabel'));
    setElementText('subjectsHeading', getUiText('subjectsHeading'));
    setElementText('subjectsSubheading', getUiText('subjectsSubheading'));
    setElementText('showFeaturedLabel', getUiText('showFeaturedLabel'));

    if (searchInput) {
        searchInput.placeholder = getUiText('searchPlaceholder');
    }
    if (heroSearchInput) {
        heroSearchInput.placeholder = getUiText('heroSearchPlaceholder');
    }
    if (getStartedBtn) {
        getStartedBtn.textContent = getUiText('startExploring');
    }
    if (clearFiltersBtn) {
        clearFiltersBtn.innerHTML = `<i class="fas fa-filter-circle-xmark"></i> ${getUiText('clearFilters')}`;
    }

    if (languageFilter && languageFilter.options.length >= 4) {
        languageFilter.options[0].text = getUiText('filterLanguageAll');
    }

    if (typeFilter && typeFilter.options.length >= 4) {
        typeFilter.options[0].text = getUiText('filterTypeAll');
        typeFilter.options[2].text = getUiText('filterTypeRead');
    }

    if (levelFilter && levelFilter.options.length >= 4) {
        levelFilter.options[0].text = getUiText('filterLevelAll');
    }

    defaultNoResultsTitle = getUiText('noResultsTitle');
    defaultNoResultsText = getUiText('noResultsText');
}

function mergeCuratedAdditions() {
    if (!allData.categories || !Array.isArray(allData.categories)) {
        return;
    }

    allData.categories.forEach(category => {
        const additions = curatedAdditions[category.id] || [];
        additions.forEach(subject => {
            const alreadyExists = category.subjects.some(existing => existing.subjectName === subject.subjectName);
            if (!alreadyExists) {
                category.subjects.push(subject);
            }
        });
    });
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);

    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function loadBookmarks() {
    const stored = localStorage.getItem('educore-bookmarks');
    if (stored) {
        bookmarks = new Set(JSON.parse(stored));
    }
}

function saveBookmarks() {
    localStorage.setItem('educore-bookmarks', JSON.stringify(Array.from(bookmarks)));
}

function getTopicId(categoryId, subjectName, topicTitle) {
    const raw = `${categoryId}::${subjectName}::${topicTitle}`
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9:-]/g, '');
    return encodeURIComponent(raw);
}

function normalizeLanguage(languageValue = '') {
    const normalized = languageValue.toLowerCase();
    if (normalized.includes('urdu')) {
        return normalized.includes('english') || normalized.includes('/') ? 'mixed' : 'urdu';
    }
    if (normalized.includes('english')) {
        return normalized.includes('/') ? 'mixed' : 'english';
    }
    return 'mixed';
}

function inferLevel(categoryId, subjectName = '', topicTitle = '') {
    const merged = `${categoryId} ${subjectName} ${topicTitle}`.toLowerCase();

    if (categoryId === 'school' || merged.includes('class 9') || merged.includes('class 10') || merged.includes('beginner')) {
        return 'beginner';
    }
    if (categoryId === 'college' || categoryId === 'entry-tests' || merged.includes('fsc') || merged.includes('ics') || merged.includes('intermediate')) {
        return 'intermediate';
    }
    if (categoryId === 'university' || categoryId === 'research' || merged.includes('advanced') || merged.includes('system design')) {
        return 'advanced';
    }

    return 'intermediate';
}

function inferDuration(type = '') {
    const normalized = normalizeType(type);
    if (normalized === 'video') {
        return '30-90 min';
    }
    if (normalized === 'read') {
        return '10-25 min read';
    }
    if (normalized === 'practice') {
        return '20-45 min practice';
    }
    return 'Flexible';
}

function getSourceFromUrl(url = '') {
    try {
        const host = new URL(url).hostname.replace('www.', '');
        if (host.includes('youtube')) return 'YouTube';
        if (host.includes('khanacademy')) return 'Khan Academy';
        if (host.includes('sabaq')) return 'Sabaq.pk';
        if (host.includes('ilmkidunya')) return 'IlmKiDunya';
        if (host.includes('phet')) return 'PhET Labs';
        return host;
    } catch {
        return 'External Resource';
    }
}

function toggleBookmark(topicId) {
    let isAdded = false;
    if (bookmarks.has(topicId)) {
        bookmarks.delete(topicId);
    } else {
        bookmarks.add(topicId);
        isAdded = true;
    }

    saveBookmarks();
    renderCategories();

    document.querySelectorAll(`.bookmark-btn[data-topic-id="${topicId}"]`).forEach(btn => {
        const marked = bookmarks.has(topicId);
        btn.classList.toggle('bookmarked', marked);
        btn.innerHTML = marked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        btn.setAttribute('aria-label', marked ? 'Remove bookmark' : 'Save bookmark');
    });

    showToast(isAdded ? getUiText('bookmarkAdded') : getUiText('bookmarkRemoved'));
}

function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'appToast';
        toast.className = 'app-toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('active');
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
        toast.classList.remove('active');
    }, 1800);
}

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load data');
        }
        allData = await response.json();
        mergeCuratedAdditions();
    } catch (error) {
        console.error('Error loading resources:', error);
        subjectsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon"><i class="fas fa-triangle-exclamation"></i></div>
                <h3 class="no-results-title">Unable to load EduCore data</h3>
                <p class="no-results-text">Please refresh the page or check your internet connection.</p>
            </div>
        `;
    }
}

function updateStats() {
    if (!allData.categories) {
        return;
    }

    const subjects = allData.categories.reduce((sum, category) => sum + category.subjects.length, 0);
    const resources = allData.categories.reduce((sum, category) => {
        return sum + category.subjects.reduce((topicSum, subject) => topicSum + subject.topics.length, 0);
    }, 0);

    subjectCount.textContent = `${subjects}+`;
    resourceCount.textContent = `${resources}+`;

    const kpis = document.querySelectorAll('.header-kpis span');
    if (kpis.length >= 2) {
        kpis[0].innerHTML = `<i class="fas fa-graduation-cap"></i> ${subjects}+ ${getUiText('kpiSubjectsLabel')}`;
        kpis[1].innerHTML = `<i class="fas fa-link"></i> ${resources}+ ${getUiText('kpiResourcesLabel')}`;
    }

    const languageKpi = document.getElementById('kpiLanguageLabel');
    if (languageKpi) {
        languageKpi.innerHTML = `<i class="fas fa-language"></i> ${getUiText('kpiLanguageLabel')}`;
    }
}

function cleanCategoryTitle(title) {
    return title.replace(/^\p{Extended_Pictographic}\s*/u, '').trim();
}

function getCategoryDisplayTitle(category) {
    const base = cleanCategoryTitle(category.title);

    if (languageMode === 'english') {
        return base;
    }

    const translations = {
        school: 'School / سکول',
        college: 'College / کالج',
        university: 'University / یونیورسٹی',
        'entry-tests': 'Entry Tests / انٹری ٹیسٹس',
        'autism-special': 'Special Learning / اسپیشل لرننگ',
        research: 'Research / ریسرچ',
        miscellaneous: 'Misc / دیگر'
    };

    return translations[category.id] || base;
}

function updateBreadcrumb() {
    if (!breadcrumb) {
        return;
    }

    if (!activeCategory) {
        breadcrumb.textContent = `${getUiText('breadcrumbHome')} / ${getUiText('breadcrumbAllTracks')}`;
        return;
    }

    const category = allData.categories.find(item => item.id === activeCategory);
    const categoryTitle = category ? cleanCategoryTitle(category.title) : 'All Tracks';
    breadcrumb.textContent = `${getUiText('breadcrumbHome')} / ${categoryTitle} / ${getUiText('breadcrumbSubjects')}`;
}

function renderFeaturedCategories() {
    if (!allData.categories) {
        return;
    }

    const categoryIcons = {
        school: '🎒',
        college: '🏫',
        university: '🎓',
        'entry-tests': '📝',
        'autism-special': '🧠',
        research: '🔬',
        miscellaneous: '📌'
    };

    const categoryColors = {
        school: 'school',
        college: 'college',
        university: 'university',
        'entry-tests': 'entry',
        'autism-special': 'autism',
        research: 'research',
        miscellaneous: 'misc'
    };

    featuredSection.innerHTML = allData.categories.map(category => {
        const icon = categoryIcons[category.id] || '📚';
        const color = categoryColors[category.id] || 'misc';
        const topicCount = category.subjects.reduce((sum, subject) => sum + subject.topics.length, 0);
        const level = inferLevel(category.id, category.title, category.title);
        const levelLabel = level.charAt(0).toUpperCase() + level.slice(1);

        return `
            <article class="category-card ${color}" data-category="${category.id}" role="button" tabindex="0" aria-label="Open ${cleanCategoryTitle(category.title)} resources">
                <div class="category-icon">${icon}</div>
                <h3 class="category-title">${getCategoryDisplayTitle(category)}</h3>
                <p class="category-count">${topicCount} resources across ${category.subjects.length} subjects</p>
                <p class="category-description">${getUiText('recommendedLevel')}: ${levelLabel}</p>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoryId = card.dataset.category;
            setActiveCategory(categoryId, true);
            renderSubjects();
            scrollToContent();
            closeSidebar();
        });

        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
    });
}

function renderCategories() {
    if (!allData.categories) {
        return;
    }

    const categoryIcons = {
        school: '<i class="fas fa-backpack"></i>',
        college: '<i class="fas fa-school"></i>',
        university: '<i class="fas fa-graduation-cap"></i>',
        'entry-tests': '<i class="fas fa-pen"></i>',
        'autism-special': '<i class="fas fa-heart"></i>',
        research: '<i class="fas fa-flask"></i>',
        miscellaneous: '<i class="fas fa-folder"></i>'
    };

    categoryNav.innerHTML = allData.categories.map(category => {
        const icon = categoryIcons[category.id] || '<i class="fas fa-folder"></i>';
        return `
            <button class="category-tab ${activeCategory === category.id ? 'active' : ''}" data-category="${category.id}" role="tab" aria-selected="${activeCategory === category.id}">
                ${icon}
                <span>${getCategoryDisplayTitle(category)}</span>
            </button>
        `;
    }).join('');

    categoryNav.innerHTML += `
        <a class="category-tab nav-link" href="materials-library.html">
            <i class="fas fa-layer-group"></i>
            <span>${getUiText('materialsShortcutLabel')}</span>
        </a>
    `;

    sidebarNav.innerHTML = allData.categories.map(category => {
        const icon = categoryIcons[category.id] || '<i class="fas fa-folder"></i>';
        return `
            <button class="category-tab ${activeCategory === category.id ? 'active' : ''}" data-category="${category.id}">
                ${icon}
                <span>${getCategoryDisplayTitle(category)}</span>
            </button>
        `;
    }).join('');

    sidebarNav.innerHTML += `
        <a class="category-tab nav-link" href="materials-library.html">
            <i class="fas fa-layer-group"></i>
            <span>${getUiText('materialsShortcutLabel')}</span>
        </a>
    `;

    const desktopBookmarksMarkup = `
        <button id="desktopBookmarksTab" class="category-tab" type="button">
            <i class="fas fa-heart"></i>
            <span>${getUiText('desktopBookmarksLabel')} (${bookmarks.size})</span>
        </button>
    `;

    const sidebarBookmarksMarkup = `
        <button id="sidebarBookmarksTab" class="category-tab" type="button">
            <i class="fas fa-heart"></i>
            <span>${getUiText('desktopBookmarksLabel')} (${bookmarks.size})</span>
        </button>
    `;

    categoryNav.insertAdjacentHTML('beforeend', desktopBookmarksMarkup);
    sidebarNav.insertAdjacentHTML('beforeend', sidebarBookmarksMarkup);

    categoryNav.querySelectorAll('.category-tab[data-category]').forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveCategory(tab.dataset.category, true);
            renderSubjects();
        });
    });

    sidebarNav.querySelectorAll('.category-tab[data-category]').forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveCategory(tab.dataset.category, true);
            renderSubjects();
            closeSidebar();
        });
    });

    const desktopBookmarksTab = document.getElementById('desktopBookmarksTab');
    if (desktopBookmarksTab) {
        desktopBookmarksTab.addEventListener('click', () => {
            hideFeaturedSection();
            showBookmarks();
        });
    }

    const sidebarBookmarksTab = document.getElementById('sidebarBookmarksTab');
    if (sidebarBookmarksTab) {
        sidebarBookmarksTab.addEventListener('click', () => {
            hideFeaturedSection();
            showBookmarks();
            closeSidebar();
        });
    }
}

function hideFeaturedSection() {
    featuredSection.classList.add('hidden');
    isFirstLoad = false;
}

function showFeaturedSection() {
    featuredSection.classList.remove('hidden');
}

function setActiveCategory(categoryId, hideFeatured = true) {
    activeCategory = categoryId;

    if (hideFeatured) {
        hideFeaturedSection();
    }

    renderCategories();
    updateBreadcrumb();
}

function normalizeType(typeValue = '') {
    const normalized = typeValue.toLowerCase();

    if (normalized.includes('video')) {
        return 'video';
    }
    if (normalized.includes('read') || normalized.includes('pdf') || normalized.includes('article')) {
        return 'read';
    }
    if (normalized.includes('practice')) {
        return 'practice';
    }
    return 'other';
}

function getDominantType(topics = []) {
    const counts = {
        video: 0,
        read: 0,
        practice: 0,
        other: 0
    };

    topics.forEach(topic => {
        counts[normalizeType(topic.type)] += 1;
    });

    return Object.keys(counts).reduce((best, current) => counts[current] > counts[best] ? current : best, 'video');
}

function getTypeIcon(type) {
    if (type === 'video') return 'fa-video';
    if (type === 'read') return 'fa-book-open';
    if (type === 'practice') return 'fa-dumbbell';
    return 'fa-layer-group';
}

function renderSubjects() {
    if (!allData.categories || !activeCategory) {
        return;
    }

    const query = searchInput.value.trim().toLowerCase();
    const cards = [];
    searchResultsMap.clear();
    noResults.querySelector('.no-results-title').textContent = defaultNoResultsTitle;
    noResults.querySelector('.no-results-text').textContent = defaultNoResultsText;

    if (query) {
        hideFeaturedSection();
        allData.categories.forEach(category => {
            category.subjects.forEach(subject => {
                const subjectMatch = subject.subjectName.toLowerCase().includes(query);
                const categoryMatch = cleanCategoryTitle(category.title).toLowerCase().includes(query);
                const matchedTopics = subject.topics.filter(topic => {
                    const topicText = topic.title.toLowerCase();
                    const sourceText = getSourceFromUrl(topic.url).toLowerCase();
                    const languageText = (topic.language || '').toLowerCase();
                    return topicText.includes(query) || sourceText.includes(query) || languageText.includes(query);
                });

                if (!subjectMatch && !categoryMatch && matchedTopics.length === 0) {
                    return;
                }

                const scopedTopics = (subjectMatch || categoryMatch) ? subject.topics : matchedTopics;
                const visibleTopics = scopedTopics.filter(topic => {
                    const normalizedType = normalizeType(topic.type);
                    const normalizedLanguage = normalizeLanguage(topic.language);
                    const inferredLevel = inferLevel(category.id, subject.subjectName, topic.title);

                    const typeMatch = activeFilters.type === 'all' || normalizedType === activeFilters.type;
                    const languageMatch = activeFilters.language === 'all' || normalizedLanguage === activeFilters.language;
                    const levelMatch = activeFilters.level === 'all' || inferredLevel === activeFilters.level;

                    return typeMatch && languageMatch && levelMatch;
                });

                if (visibleTopics.length === 0) {
                    return;
                }

                const key = `${category.id}::${subject.subjectName}`;

                searchResultsMap.set(key, {
                    category,
                    subject,
                    topicsToShow: visibleTopics
                });

                cards.push({ key, category, subject, topicsToShow: visibleTopics, inSearch: true });
            });
        });
    } else {
        const category = allData.categories.find(item => item.id === activeCategory);
        if (!category) {
            return;
        }

        category.subjects.forEach(subject => {
            const visibleTopics = subject.topics.filter(topic => {
                const normalizedType = normalizeType(topic.type);
                const normalizedLanguage = normalizeLanguage(topic.language);
                const inferredLevel = inferLevel(category.id, subject.subjectName, topic.title);

                const typeMatch = activeFilters.type === 'all' || normalizedType === activeFilters.type;
                const languageMatch = activeFilters.language === 'all' || normalizedLanguage === activeFilters.language;
                const levelMatch = activeFilters.level === 'all' || inferredLevel === activeFilters.level;

                return typeMatch && languageMatch && levelMatch;
            });

            if (visibleTopics.length === 0) {
                return;
            }

            const key = `${category.id}::${subject.subjectName}`;
            searchResultsMap.set(key, {
                category,
                subject,
                topicsToShow: visibleTopics
            });
            cards.push({ key, category, subject, topicsToShow: visibleTopics, inSearch: false });
        });
    }

    if (cards.length === 0) {
        subjectsContainer.innerHTML = '';
        noResults.classList.remove('hidden');
        noResults.querySelector('.no-results-title').textContent = getUiText('noResultsTitle');
        noResults.querySelector('.no-results-text').textContent = getUiText('noResultsText');
        return;
    }

    noResults.classList.add('hidden');

    subjectsContainer.innerHTML = cards.map(card => {
        const dominantType = getDominantType(card.topicsToShow);
        const icon = getTypeIcon(dominantType);
        const dominantLabel = dominantType.charAt(0).toUpperCase() + dominantType.slice(1);
        const languageSet = new Set(card.topicsToShow.map(topic => normalizeLanguage(topic.language)));
        const levelSet = new Set(card.topicsToShow.map(topic => inferLevel(card.category.id, card.subject.subjectName, topic.title)));
        const languageText = Array.from(languageSet).map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' / ');
        const levelText = Array.from(levelSet).map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' / ');

        return `
            <article class="subject-card fade-in" data-subject-key="${card.key}">
                <div class="subject-head">
                    <h3 class="subject-title">${card.subject.subjectName}</h3>
                    ${card.inSearch ? `<span class="subject-category-pill">${cleanCategoryTitle(card.category.title)}</span>` : ''}
                </div>

                <div class="card-metadata">
                    <span class="badge count"><i class="fas fa-book"></i> ${card.topicsToShow.length}</span>
                    <span class="badge type-${dominantType}"><i class="fas ${icon}"></i> ${dominantLabel}</span>
                    <span class="badge language"><i class="fas fa-language"></i> ${languageText}</span>
                    <span class="badge level"><i class="fas fa-signal"></i> ${levelText}</span>
                </div>

                <p class="card-description">${getUiText('cardDescription')}</p>
                <button class="subject-open" type="button">${getUiText('openTopics')}</button>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.subject-card').forEach(card => {
        const openSubject = () => {
            const result = searchResultsMap.get(card.dataset.subjectKey);
            if (!result) {
                return;
            }
            showTopicModal(result.subject.subjectName, result.category, result.topicsToShow);
        };

        card.addEventListener('click', event => {
            if (event.target.closest('.subject-open')) {
                openSubject();
                return;
            }
            openSubject();
        });
    });
}

function showBookmarks() {
    const bookmarked = [];

    allData.categories.forEach(category => {
        category.subjects.forEach(subject => {
            subject.topics.forEach(topic => {
                const topicId = getTopicId(category.id, subject.subjectName, topic.title);
                if (bookmarks.has(topicId)) {
                    bookmarked.push({ category, subject, topic, topicId });
                }
            });
        });
    });

    if (bookmarked.length === 0) {
        noResults.classList.remove('hidden');
        noResults.querySelector('.no-results-title').textContent = getUiText('noBookmarksTitle');
        noResults.querySelector('.no-results-text').textContent = getUiText('noBookmarksText');
        subjectsContainer.innerHTML = '';
        return;
    }

    noResults.classList.add('hidden');

    subjectsContainer.innerHTML = bookmarked.map(item => {
        const type = normalizeType(item.topic.type);

        return `
            <article class="subject-card fade-in">
                <div class="subject-head">
                    <h3 class="subject-title">${item.subject.subjectName}</h3>
                    <span class="subject-category-pill">${cleanCategoryTitle(item.category.title)}</span>
                </div>

                <div class="card-metadata">
                    <span class="badge type-${type}">${item.topic.type}</span>
                    <span class="badge count"><i class="fas fa-heart"></i> Saved</span>
                </div>

                <p class="card-description">${item.topic.title}</p>

                <a class="topic-link" href="${item.topic.url}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                    ${getUiText('openResource')}
                </a>
            </article>
        `;
    }).join('');
}

function scrollToContent() {
    const targetTop = subjectsContainer.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
    });
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');

    if (!topicModal.classList.contains('active')) {
        setBodyLocked(false);
    }
}

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    setBodyLocked(true);
}

function setupEventListeners() {
    window.addEventListener('resize', setHeaderOffset);

    searchInput.addEventListener('input', event => {
        heroSearchInput.value = event.target.value;
        renderSubjects();
    });

    heroSearchInput.addEventListener('input', event => {
        searchInput.value = event.target.value;
        renderSubjects();
    });

    getStartedBtn.addEventListener('click', () => {
        hideFeaturedSection();
        scrollToContent();
    });

    if (desktopBookmarksBtn) {
        desktopBookmarksBtn.addEventListener('click', () => {
            hideFeaturedSection();
            showBookmarks();
        });
    }

    if (showFeaturedBtn) {
        showFeaturedBtn.addEventListener('click', () => {
            showFeaturedSection();
            window.scrollTo({
                top: Math.max(0, featuredSection.getBoundingClientRect().top + window.scrollY - getHeaderOffset()),
                behavior: 'smooth'
            });
        });
    }

    if (languageFilter) {
        languageFilter.addEventListener('change', event => {
            activeFilters.language = event.target.value;
            renderSubjects();
        });
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', event => {
            activeFilters.type = event.target.value;
            renderSubjects();
        });
    }

    if (levelFilter) {
        levelFilter.addEventListener('change', event => {
            activeFilters.level = event.target.value;
            renderSubjects();
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            activeFilters.language = 'all';
            activeFilters.type = 'all';
            activeFilters.level = 'all';

            if (languageFilter) languageFilter.value = 'all';
            if (typeFilter) typeFilter.value = 'all';
            if (levelFilter) levelFilter.value = 'all';

            renderSubjects();
        });
    }

    closeModal.addEventListener('click', closeTopicModal);
    topicModal.addEventListener('click', event => {
        if (event.target === topicModal) {
            closeTopicModal();
        }
    });

    themeToggle.addEventListener('click', toggleTheme);

    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguageMode);
    }

    hamburgerMenu.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeTopicModal();
            closeSidebar();
        }

        const activeElement = document.activeElement;
        const isInputFocused = activeElement === searchInput || activeElement === heroSearchInput || activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA' || activeElement?.isContentEditable;

        if (event.key === '/' && !isInputFocused) {
            event.preventDefault();
            searchInput.focus();
        }
    });
}

function closeTopicModal() {
    topicModal.classList.remove('active');

    if (!sidebar.classList.contains('open')) {
        setBodyLocked(false);
    }

    if (modalPreviousFocus && typeof modalPreviousFocus.focus === 'function') {
        modalPreviousFocus.focus();
    }
}

function getRecommendedResources(categoryId, currentSubjectName, limit = 4) {
    const category = allData.categories.find(item => item.id === categoryId);
    if (!category) {
        return [];
    }

    const pool = [];
    category.subjects.forEach(subject => {
        if (subject.subjectName === currentSubjectName) {
            return;
        }

        subject.topics.forEach(topic => {
            pool.push({
                subjectName: subject.subjectName,
                topic
            });
        });
    });

    return pool.slice(0, limit);
}

function showTopicModal(subjectName, category, topicsOverride = null) {
    const subject = category.subjects.find(item => item.subjectName === subjectName);
    if (!subject) {
        return;
    }

    const topics = topicsOverride || subject.topics;

    modalPreviousFocus = document.activeElement;
    modalTitle.textContent = `${subject.subjectName} (${cleanCategoryTitle(category.title)})`;
    modalTitle.setAttribute('tabindex', '-1');

    modalTopics.innerHTML = topics.map(topic => {
        const topicId = getTopicId(category.id, subject.subjectName, topic.title);
        const marked = bookmarks.has(topicId);
        const type = normalizeType(topic.type);
        const level = inferLevel(category.id, subject.subjectName, topic.title);
        const source = getSourceFromUrl(topic.url);
        const duration = inferDuration(topic.type);
        const levelLabel = level.charAt(0).toUpperCase() + level.slice(1);

        return `
            <article class="topic-item" data-topic-id="${topicId}">
                <div class="topic-badge-group">
                    <span class="badge type-${type}">${topic.badge || topic.type}</span>
                    <span class="badge language">${topic.language || 'Mixed'}</span>
                    <span class="badge level">${levelLabel}</span>
                    <span class="badge verified"><i class="fas fa-circle-check"></i> ${getUiText('verifiedFree')}</span>
                </div>

                <h4 class="topic-title">${topic.title}</h4>
                <p class="topic-meta-line"><i class="fas fa-building"></i> ${source} <span>•</span> <i class="fas fa-clock"></i> ${duration}</p>

                <div class="topic-actions">
                    <a href="${topic.url}" target="_blank" rel="noopener noreferrer" class="topic-link">
                        <i class="fas fa-arrow-up-right-from-square"></i>
                        ${getUiText('openResource')}
                    </a>
                    <button type="button" class="bookmark-btn ${marked ? 'bookmarked' : ''}" data-topic-id="${topicId}" aria-label="${marked ? 'Remove bookmark' : 'Save bookmark'}">
                        ${marked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
                    </button>
                </div>
            </article>
        `;
    }).join('');

    const recommendations = getRecommendedResources(category.id, subject.subjectName, 4);
    if (recommendations.length > 0) {
        modalTopics.innerHTML += `
            <section class="recommendation-section" aria-label="Related recommendations">
                <h5 class="recommendation-title">${getUiText('recommendedResources')}</h5>
                <div class="recommendation-grid">
                    ${recommendations.map(item => {
                        const source = getSourceFromUrl(item.topic.url);
                        return `
                            <article class="recommendation-card">
                                <p class="recommendation-subject">${item.subjectName}</p>
                                <h6 class="recommendation-topic">${item.topic.title}</h6>
                                <p class="recommendation-meta"><i class="fas fa-building"></i> ${source}</p>
                                <a href="${item.topic.url}" target="_blank" rel="noopener noreferrer" class="topic-link recommendation-link">
                                    <i class="fas fa-arrow-up-right-from-square"></i>
                                    ${getUiText('openResource')}
                                </a>
                            </article>
                        `;
                    }).join('')}
                </div>
            </section>
        `;
    }

    document.querySelectorAll('.bookmark-btn').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            toggleBookmark(button.dataset.topicId);
        });
    });

    topicModal.classList.add('active');
    setBodyLocked(true);
    window.setTimeout(() => modalTitle.focus(), 40);
}
