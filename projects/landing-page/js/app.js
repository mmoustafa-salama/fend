/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionList = document.querySelectorAll('section');
const navMenuList = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function createAnchorElement(textContent, cssClass) {
    const anchor = document.createElement('a');
    anchor.textContent = textContent;
    anchor.classList.add(cssClass);

    return anchor;
}

function clearAllActiveSectionClasses() {
    sectionList.forEach(section => {
        section.classList.remove('section__active');
    });
}

function clearAllActiveLinkClasses() {
    const navAnchors = document.querySelectorAll('#navbar__list a');
    navAnchors.forEach(anchor => {
        anchor.classList.remove('menu__link_active');
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavMenu() {
    const menuDocFragment = document.createDocumentFragment();
    sectionList.forEach(section => {
        const anchor = createAnchorElement(section.getAttribute('data-nav'), 'menu__link');
        anchor.setAttribute('section-id', section.id);
        anchor.addEventListener('click', scrollToSectionFn);

        const menuItem = document.createElement('li');
        menuItem.appendChild(anchor);

        menuDocFragment.appendChild(menuItem);
    });
    navMenuList.appendChild(menuDocFragment);
}

// Add class 'section__active' to section when near top of viewport
function setActiveSection(event) {
    sectionList.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navMenuList.offsetHeight && rect.top > navMenuList.offsetHeight - rect.height) {
            section.classList.add('section__active');
        }
    });
}

function setActiveLink() {
    const activeSection = document.querySelector('.section__active');
    if (activeSection) {
        const menuAnchors = document.querySelectorAll('#navbar__list a');
        menuAnchors.forEach(anchor => {
            // Set active link of the section active in viewport
            if (anchor.textContent === activeSection.getAttribute('data-nav')) {
                anchor.classList.add('menu__link_active');
            }
        });
    }
}

// Scroll to anchor ID using scrollTO event
const scrollToSectionFn = function scrollToSection(event) {
    document.getElementById(event.target.getAttribute('section-id')).scrollIntoView({ behavior: "smooth" });
};

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavMenu());

// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', () => {
    clearAllActiveSectionClasses();
    clearAllActiveLinkClasses();
    setActiveSection();
    setActiveLink();
});

