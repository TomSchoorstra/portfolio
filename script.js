// Constants
const TYPING_SPEED = 100;
const TYPING_WAIT = 2000;
const SCROLL_THRESHOLD = 50;
const INTERSECTION_THRESHOLD = 0.1;

// DOM Elements Cache
const domElements = {
    navbar: document.querySelector('.navbar'),
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    navLinks: document.querySelector('.nav-links'),
    sections: document.querySelectorAll('.section'),
    subtitleElement: document.querySelector('.subtitle'),
    timelineContainer: document.getElementById('timelineContainer'),
    footerName: document.getElementById('footerName'),
    currentYear: document.getElementById('currentYear')
};

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    // You could implement more sophisticated error handling here
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update mobile menu state if needed
                if (domElements.navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        } catch (error) {
            handleError(error, 'smooth scroll');
        }
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    try {
        const isExpanded = domElements.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        domElements.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        domElements.navLinks.classList.toggle('active');
    } catch (error) {
        handleError(error, 'mobile menu toggle');
    }
}

if (domElements.mobileMenuToggle) {
    domElements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Navbar background change on scroll
const handleScroll = debounce(() => {
    try {
        if (domElements.navbar) {
            const shouldBeTransparent = window.scrollY <= SCROLL_THRESHOLD;
            domElements.navbar.style.backgroundColor = shouldBeTransparent ? 
                'var(--bg-color)' : 
                'rgba(255, 255, 255, 0.95)';
        }
    } catch (error) {
        handleError(error, 'scroll handler');
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Section animations
const observerOptions = {
    threshold: INTERSECTION_THRESHOLD,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        try {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        } catch (error) {
            handleError(error, 'section animation');
        }
    });
}, observerOptions);

domElements.sections.forEach(section => {
    try {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity var(--transition-medium), transform var(--transition-medium)';
        sectionObserver.observe(section);
    } catch (error) {
        handleError(error, 'section observer setup');
    }
});

// Text Rotator Class
class TextRotator {
    constructor(element, words, waitTime = TYPING_WAIT) {
        this.element = element;
        this.words = words;
        this.waitTime = waitTime;
        this.currentIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        try {
            const fullTxt = this.words[this.currentIndex];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Update DOM with new text
            if (this.element) {
                this.element.textContent = this.txt;
                if (this.element.querySelector('.typing-cursor')) {
                    this.element.innerHTML = this.txt + '<span class="typing-cursor">|</span>';
                }
            }

            let typeSpeed = TYPING_SPEED;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.waitTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.currentIndex = (this.currentIndex + 1) % this.words.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        } catch (error) {
            handleError(error, 'text rotation');
        }
    }
}

// Timeline Item Creation
function createTimelineItem(project, index) {
    try {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('role', 'listitem');
        timelineItem.style.transitionDelay = `${index * 0.2}s`;
        
        const imageHtml = project.image ? 
            `<img src="${project.image}" alt="${project.title}" loading="lazy">` : 
            '<div class="placeholder-img" aria-hidden="true">Project Image Coming Soon</div>';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <time class="date">${project.date}</time>
                <h3>${project.title}</h3>
                <p class="company">${project.company}</p>
                <p class="description">${project.description}</p>
                <div class="project-image">
                    ${imageHtml}
                </div>
                <ul class="achievements" role="list">
                    ${project.achievements.map(achievement => 
                        `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `;
        
        return timelineItem;
    } catch (error) {
        handleError(error, 'timeline item creation');
        return null;
    }
}

// Content Population Functions
function populatePersonalInfo() {
    try {
        if (domElements.footerName) {
            domElements.footerName.textContent = websiteContent.personalInfo.name;
        }
        if (domElements.currentYear) {
            domElements.currentYear.textContent = new Date().getFullYear();
        }
    } catch (error) {
        handleError(error, 'personal info population');
    }
}

function populateAboutSection() {
    try {
        const aboutTitle = document.getElementById('aboutTitle');
        const aboutContent = document.getElementById('aboutContent');
        
        if (aboutTitle && websiteContent.sections.about.title) {
            aboutTitle.textContent = websiteContent.sections.about.title;
        }
        if (aboutContent && websiteContent.sections.about.content) {
            aboutContent.textContent = websiteContent.sections.about.content;
        }
    } catch (error) {
        handleError(error, 'about section population');
    }
}

function populatePortfolioSection() {
    try {
        const portfolioTitle = document.getElementById('portfolioTitle');
        
        if (!domElements.timelineContainer) {
            throw new Error('Timeline container not found');
        }
        
        if (portfolioTitle && websiteContent.portfolio.title) {
            portfolioTitle.textContent = websiteContent.portfolio.title;
        }
        
        // Create and append timeline items
        websiteContent.portfolio.projects.forEach((project, index) => {
            const timelineItem = createTimelineItem(project, index);
            if (timelineItem) {
                domElements.timelineContainer.appendChild(timelineItem);
                timelineObserver.observe(timelineItem);
            }
        });
    } catch (error) {
        handleError(error, 'portfolio section population');
    }
}

// Timeline animations
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        try {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        } catch (error) {
            handleError(error, 'timeline animation');
        }
    });
}, observerOptions);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Populate content
        populatePersonalInfo();
        populateAboutSection();
        populatePortfolioSection();

        // Initialize text rotator
        if (domElements.subtitleElement) {
            domElements.subtitleElement.innerHTML = '<span class="typing-cursor">|</span>';
            new TextRotator(
                domElements.subtitleElement, 
                websiteContent.personalInfo.skills || []
            );
        }
    } catch (error) {
        handleError(error, 'initialization');
    }
}); 