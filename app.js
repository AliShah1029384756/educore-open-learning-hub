// Global state
let allData = {};
let filteredSubjects = [];
let activeCategory = null;

// DOM Elements
const categoryNav = document.getElementById('categoryNav');
const subjectsContainer = document.getElementById('subjectsContainer');
const searchInput = document.getElementById('searchInput');
const topicModal = document.getElementById('topicModal');
const modalTitle = document.getElementById('modalTitle');
const modalTopics = document.getElementById('modalTopics');
const closeModal = document.getElementById('closeModal');
const noResults = document.getElementById('noResults');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    renderCategories();
    if (allData.categories && allData.categories.length > 0) {
        setActiveCategory(allData.categories[0].id);
    }
    setupEventListeners();
});

// Load data from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to load data.json');
        allData = await response.json();
        console.log('Data loaded successfully:', allData);
    } catch (error) {
        console.error('Error loading data:', error);
        subjectsContainer.innerHTML = '<div class="col-span-full text-center text-red-600"><p>Error loading resources. Please refresh the page.</p></div>';
    }
}

// Render category tabs
function renderCategories() {
    if (!allData.categories) return;
    
    categoryNav.innerHTML = allData.categories.map(category => {
        return `
            <button class="category-tab whitespace-nowrap text-sm font-medium" data-category="${category.id}">
                ${category.title}
            </button>
        `;
    }).join('');

    // Add click listeners
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            setActiveCategory(e.target.dataset.category);
        });
    });
}

// Set active category and render subjects
function setActiveCategory(categoryId) {
    activeCategory = categoryId;
    
    // Update active tab styling
    document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.dataset.category === categoryId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Reset search
    searchInput.value = '';
    
    // Render subjects for this category
    renderSubjects();
}

// Render subjects based on active category and search
function renderSubjects() {
    const category = allData.categories.find(c => c.id === activeCategory);
    if (!category) return;

    let subjects = category.subjects;
    
    // Apply search filter
    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery) {
        subjects = subjects.filter(subject => {
            const subjectMatch = subject.subjectName.toLowerCase().includes(searchQuery);
            const topicMatch = subject.topics.some(topic => 
                topic.title.toLowerCase().includes(searchQuery)
            );
            return subjectMatch || topicMatch;
        });
    }

    // Render subjects
    if (subjects.length === 0) {
        subjectsContainer.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    subjectsContainer.innerHTML = subjects.map(subject => {
        return `
            <div class="subject-card bg-white rounded-xl p-6 shadow-sm" data-subject="${subject.subjectName}">
                <h3 class="text-lg font-semibold text-slate-900 mb-2">${subject.subjectName}</h3>
                <div class="flex flex-wrap gap-1">
                    <span class="badge">${subject.topics.length} resources</span>
                </div>
                <p class="text-sm text-slate-600 mt-3">Click to view all resources</p>
            </div>
        `;
    }).join('');

    // Add click listeners to cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const subjectName = e.currentTarget.dataset.subject;
            showTopicModal(subjectName, category);
        });
    });
}

// Show topic details in modal
function showTopicModal(subjectName, category) {
    const subject = category.subjects.find(s => s.subjectName === subjectName);
    if (!subject) return;

    modalTitle.textContent = subject.subjectName;
    
    // Filter topics by search if applicable
    let topicsList = subject.topics;
    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery) {
        topicsList = topicsList.filter(topic => 
            topic.title.toLowerCase().includes(searchQuery)
        );
    }

    modalTopics.innerHTML = topicsList.map(topic => {
        return `
            <div class="mb-4">
                <div class="flex items-start gap-2 mb-2">
                    <span class="badge font-semibold">${topic.type}</span>
                    <span class="badge">${topic.language}</span>
                </div>
                <a href="${topic.url}" target="_blank" rel="noopener noreferrer" class="topic-link">
                    <div class="font-semibold text-slate-900">${topic.title}</div>
                    <div class="text-xs text-slate-600 mt-1">${topic.badge} → Open in new tab</div>
                </a>
            </div>
        `;
    }).join('');

    topicModal.classList.add('active');
}

// Close modal
function closeTopicModal() {
    topicModal.classList.remove('active');
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', () => {
        renderSubjects();
    });

    // Close modal
    closeModal.addEventListener('click', closeTopicModal);
    topicModal.addEventListener('click', (e) => {
        if (e.target === topicModal) closeTopicModal();
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeTopicModal();
    });
}
