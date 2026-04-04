// ============================================
// EDUCORE - Enhanced Application Logic
// Phases: Featured Categories, Dark Mode, Bookmarks
// ============================================

// Global state
let allData = {};
let filteredSubjects = [];
let activeCategory = null;
let bookmarks = new Set();
let isFirstLoad = true;
let currentTheme = localStorage.getItem('theme') || 'light';
let searchResultsMap = new Map();

// DOM Elements
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
const heroSection = document.getElementById('heroSection');
const themeToggle = document.getElementById('themeToggle');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarNav = document.getElementById('sidebarNav');
const getStartedBtn = document.getElementById('getStartedBtn');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();
    await loadData();
    loadBookmarks();
    renderCategories();
    renderFeaturedCategories();
    setupEventListeners();
    
    if (allData.categories && allData.categories.length > 0) {
        setActiveCategory(allData.categories[0].id);
        isFirstLoad = true;
    }
});

// ============================================
// THEME MANAGEMENT
// ============================================

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

// ============================================
// BOOKMARKING SYSTEM
// ============================================

function loadBookmarks() {
    const stored = localStorage.getItem('educore-bookmarks');
    if (stored) {
        bookmarks = new Set(JSON.parse(stored));
    }
}

function saveBookmarks() {
    localStorage.setItem('educore-bookmarks', JSON.stringify(Array.from(bookmarks)));
}

function toggleBookmark(topicId) {
    if (bookmarks.has(topicId)) {
        bookmarks.delete(topicId);
    } else {
        bookmarks.add(topicId);
    }
    saveBookmarks();
    
    // Update UI
    const bookmarkBtn = document.querySelector(`[data-topic-id="${topicId}"] .bookmark-btn`);
    if (bookmarkBtn) {
        if (bookmarks.has(topicId)) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            bookmarkBtn.classList.remove('bookmarked');
            bookmarkBtn.innerHTML = '<i class="far fa-heart"></i>';
        }
    }
}

function getTopicId(categoryId, subjectName, topicTitle) {
    return `${categoryId}-${subjectName}-${topicTitle}`.replace(/\s+/g, '-').toLowerCase();
}

// ============================================
// DATA LOADING
// ============================================

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to load data.json');
        allData = await response.json();
        console.log('Data loaded successfully:', allData);
    } catch (error) {
        console.error('Error loading data:', error);
        subjectsContainer.innerHTML = '<div style="text-align:center;color:red;"><p><i class="fas fa-exclamation-circle"></i> Error loading resources. Please refresh the page.</p></div>';
    }
}

// ============================================
// FEATURED CATEGORIES
// ============================================

function renderFeaturedCategories() {
    if (!allData.categories) return;
    
    const categoryIcons = {
        'school': '🎒',
        'college': '🏫',
        'university': '🎓',
        'entry-tests': '📝',
        'autism-special': '🧠',
        'research': '🔬',
        'miscellaneous': '📌'
    };
    
    const categoryColors = {
        'school': 'school',
        'college': 'college',
        'university': 'university',
        'entry-tests': 'entry',
        'autism-special': 'autism',
        'research': 'research',
        'miscellaneous': 'misc'
    };
    
    featuredSection.innerHTML = allData.categories.map(category => {
        const icon = categoryIcons[category.id] || '📚';
        const color = categoryColors[category.id] || 'misc';
        const resourceCount = category.subjects.reduce((sum, s) => sum + s.topics.length, 0);
        
        return `
            <div class="category-card ${color}" data-category="${category.id}">
                <div class="category-icon">${icon}</div>
                <h3 class="category-title">${category.title}</h3>
                <div class="category-count">${resourceCount} resources</div>
                <p class="category-description">Click to explore</p>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const categoryId = e.currentTarget.dataset.category;
            setActiveCategory(categoryId);
            scrollToCategories();
            closeSidebar();
        });
    });
}

function scrollToCategories() {
    const tabsSection = document.querySelector('.category-tabs');
    if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// CATEGORY TABS
// ============================================

function renderCategories() {
    if (!allData.categories) return;
    
    const categoryIcons = {
        'school': '<i class="fas fa-backpack"></i>',
        'college': '<i class="fas fa-graduation-cap"></i>',
        'university': '<i class="fas fa-book"></i>',
        'entry-tests': '<i class="fas fa-pencil-alt"></i>',
        'autism-special': '<i class="fas fa-heart"></i>',
        'research': '<i class="fas fa-flask"></i>',
        'miscellaneous': '<i class="fas fa-folder"></i>'
    };
    
    // Main category tabs
    categoryNav.innerHTML = allData.categories.map(category => {
        const icon = categoryIcons[category.id] || '<i class="fas fa-folder"></i>';
        return `
            <button class="category-tab" data-category="${category.id}" role="tab">
                ${icon} <span style="margin-left: 0.5rem;">${category.title}</span>
            </button>
        `;
    }).join('');

    // Sidebar navigation
    sidebarNav.innerHTML = allData.categories.map(category => {
        const icon = categoryIcons[category.id] || '<i class="fas fa-folder"></i>';
        return `
            <button class="category-tab" data-category="${category.id}" style="width: 100%; text-align: left;">
                ${icon} <span style="margin-left: 0.5rem;">${category.title}</span>
            </button>
        `;
    }).join('');

    // Add bookmarks tab
    const bookmarkCount = bookmarks.size;
    sidebarNav.innerHTML += `
        <button id="bookmarksTab" class="category-tab" style="width: 100%; text-align: left; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
            <i class="fas fa-heart"></i> <span style="margin-left: 0.5rem;">Bookmarks <span style="font-size: 0.75rem; opacity: 0.7;">(${bookmarkCount})</span></span>
        </button>
    `;

    // Add click listeners
    document.querySelectorAll('.category-tab[data-category]').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const categoryId = e.currentTarget.dataset.category;
            setActiveCategory(categoryId);
            closeSidebar();
        });
    });

    // Bookmarks tab listener
    const bookmarksTab = document.getElementById('bookmarksTab');
    if (bookmarksTab) {
        bookmarksTab.addEventListener('click', () => {
            showBookmarks();
            closeSidebar();
        });
    }
}

// ============================================
// ACTIVE CATEGORY
// ============================================

function setActiveCategory(categoryId) {
    activeCategory = categoryId;
    
    // Hide featured section after first interaction
    if (isFirstLoad) {
        featuredSection.style.display = 'none';
        isFirstLoad = false;
    }
    
    // Update active tab styling
    document.querySelectorAll('.category-tab[data-category]').forEach(tab => {
        if (tab.dataset.category === categoryId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Reset search
    searchInput.value = '';
    heroSearchInput.value = '';
    
    // Render subjects
    renderSubjects();
}

// ============================================
// SUBJECT CARDS RENDERING
// ============================================

function renderSubjects() {
    if (!allData.categories || allData.categories.length === 0) return;

    const searchQuery = searchInput.value.trim().toLowerCase();
    const subjectCards = [];
    searchResultsMap.clear();

    if (searchQuery) {
        allData.categories.forEach(category => {
            category.subjects.forEach(subject => {
                const subjectMatch = subject.subjectName.toLowerCase().includes(searchQuery);
                const matchedTopics = subject.topics.filter(topic =>
                    topic.title.toLowerCase().includes(searchQuery)
                );

                if (!subjectMatch && matchedTopics.length === 0) {
                    return;
                }

                const topicsToShow = subjectMatch ? subject.topics : matchedTopics;
                const subjectKey = `${category.id}::${subject.subjectName}`;

                searchResultsMap.set(subjectKey, {
                    category,
                    subjectName: subject.subjectName,
                    topicsToShow
                });

                subjectCards.push({
                    key: subjectKey,
                    categoryTitle: category.title,
                    subject,
                    topicsToShow
                });
            });
        });
    } else {
        const category = allData.categories.find(c => c.id === activeCategory);
        if (!category) return;

        category.subjects.forEach(subject => {
            const subjectKey = `${category.id}::${subject.subjectName}`;
            searchResultsMap.set(subjectKey, {
                category,
                subjectName: subject.subjectName,
                topicsToShow: subject.topics
            });

            subjectCards.push({
                key: subjectKey,
                categoryTitle: category.title,
                subject,
                topicsToShow: subject.topics
            });
        });
    }

    // Render subjects
    if (subjectCards.length === 0) {
        subjectsContainer.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    subjectsContainer.innerHTML = subjectCards.map(card => {
        const resourceCount = card.topicsToShow.length;
        const subject = card.subject;
        const typeIcons = {
            'Video': 'fa-video',
            'PDF': 'fa-file-pdf',
            'Article': 'fa-newspaper',
            'Practice': 'fa-dumbbell'
        };
        
        // Get dominant type
        const typeCounts = {};
        card.topicsToShow.forEach(t => {
            typeCounts[t.type] = (typeCounts[t.type] || 0) + 1;
        });
        const dominantType = Object.keys(typeCounts).reduce((a, b) => 
            typeCounts[a] > typeCounts[b] ? a : b
        );

        return `
            <div class="subject-card fade-in" data-subject-key="${card.key}">
                <h3 class="subject-title">${subject.subjectName}</h3>
                <div class="card-metadata">
                    <span class="badge count">
                        <i class="fas fa-book"></i> ${resourceCount}
                    </span>
                    <span class="badge type-${dominantType.toLowerCase()}">
                        <i class="fas ${typeIcons[dominantType] || 'fa-book'}"></i> ${dominantType}
                    </span>
                </div>
                ${searchQuery ? `<p class="card-description">📂 ${card.categoryTitle}</p>` : ''}
                <p class="card-description">Click to view ${resourceCount} resource${resourceCount !== 1 ? 's' : ''}</p>
            </div>
        `;
    }).join('');

    // Add click listeners to cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const subjectKey = e.currentTarget.dataset.subjectKey;
            const result = searchResultsMap.get(subjectKey);
            if (!result) return;

            showTopicModal(result.subjectName, result.category, result.topicsToShow);
        });
    });
}

// ============================================
// TOPIC MODAL
// ============================================

function showTopicModal(subjectName, category, topicsOverride = null) {
    const subject = category.subjects.find(s => s.subjectName === subjectName);
    if (!subject) return;

    modalTitle.textContent = subject.subjectName;
    
    // Use precomputed matching topics when searching nested content.
    const topicsList = topicsOverride || subject.topics;

    const typeClasses = {
        'Video': 'type-video',
        'PDF': 'type-pdf',
        'Article': 'type-article',
        'Practice': 'type-practice'
    };

    const typeIcons = {
        'Video': 'fa-video',
        'PDF': 'fa-file-pdf',
        'Article': 'fa-newspaper',
        'Practice': 'fa-dumbbell'
    };

    const languageFlags = {
        'Urdu': '🇵🇰',
        'English': '🇬🇧',
        'Mixed': '🌐'
    };

    modalTopics.innerHTML = topicsList.map((topic, index) => {
        const topicId = getTopicId(category.id, subject.subjectName, topic.title);
        const isBookmarked = bookmarks.has(topicId);
        const typeClass = typeClasses[topic.type] || 'type-article';
        const typeIcon = typeIcons[topic.type] || 'fa-book';
        const langFlag = languageFlags[topic.language] || '📌';

        return `
            <div class="topic-item" data-topic-id="${topicId}">
                <div class="topic-badge-group">
                    <span class="badge ${typeClass}">
                        <i class="fas ${typeIcon}"></i> ${topic.type}
                    </span>
                    <span class="badge language">
                        ${langFlag} ${topic.language}
                    </span>
                </div>
                <div class="topic-title">${topic.title}</div>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                    <a href="${topic.url}" target="_blank" rel="noopener noreferrer" style="flex: 1;" class="topic-link">
                        <i class="fas fa-external-link-alt"></i> Open Resource
                    </a>
                    <button class="bookmark-btn" data-topic-id="${topicId}" style="background: none; border: none; cursor: pointer; font-size: 1.25rem; ${isBookmarked ? 'color: var(--type-video);' : 'color: var(--text-tertiary);'} transition: var(--transition-fast);">
                        ${isBookmarked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Add bookmark listeners
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const topicId = e.currentTarget.dataset.topicId;
            toggleBookmark(topicId);
        });
    });

    topicModal.classList.add('active');
}

function closeTopicModal() {
    topicModal.classList.remove('active');
}

// ============================================
// BOOKMARKS VIEW
// ============================================

function showBookmarks() {
    if (bookmarks.size === 0) {
        noResults.classList.remove('hidden');
        subjectsContainer.innerHTML = '';
        return;
    }

    noResults.classList.add('hidden');
    subjectsContainer.innerHTML = '';

    const bookmarkedTopics = [];
    
    allData.categories.forEach(category => {
        category.subjects.forEach(subject => {
            subject.topics.forEach(topic => {
                const topicId = getTopicId(category.id, subject.subjectName, topic.title);
                if (bookmarks.has(topicId)) {
                    bookmarkedTopics.push({
                        ...topic,
                        subjectName: subject.subjectName,
                        categoryTitle: category.title,
                        topicId
                    });
                }
            });
        });
    });

    subjectsContainer.innerHTML = bookmarkedTopics.map(topic => `
        <div class="subject-card fade-in">
            <h3 class="subject-title">${topic.subjectName}</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">📂 ${topic.categoryTitle}</p>
            <div style="margin-bottom: 1rem;">
                <p style="font-weight: 500; color: var(--text-primary);">${topic.title}</p>
                <span class="badge" style="background: var(--primary-light); color: var(--primary);margin-top: 0.5rem;">
                    <i class="fas fa-heart"></i> Bookmarked
                </span>
            </div>
            <a href="${topic.url}" target="_blank" rel="noopener noreferrer" class="topic-link" style="display: inline-block;">
                <i class="fas fa-arrow-right"></i> Open Resource
            </a>
        </div>
    `).join('');
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', () => {
        renderSubjects();
    });

    heroSearchInput.addEventListener('input', (e) => {
        searchInput.value = e.target.value;
        renderSubjects();
    });

    // Hero Get Started button
    getStartedBtn.addEventListener('click', () => {
        scrollToCategories();
    });

    // Close modal
    closeModal.addEventListener('click', closeTopicModal);
    topicModal.addEventListener('click', (e) => {
        if (e.target === topicModal) closeTopicModal();
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Hamburger menu
    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTopicModal();
            closeSidebar();
        }
    });
}

function closeSidebar() {
    sidebar.classList.remove('open');
}
