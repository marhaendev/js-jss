// name: jss.js
// vers: 1.0.5
// desc: simple js for styling html
// auth: @marhaendev
// licence: MIT License 

// ================ USAGE =====================================================
// import this to your project                                               ==
// <script src="https://raw.githack.com/marhaendev/js-jss/master/jss.js"/>   ==
// ============================================================================

document.addEventListener("DOMContentLoaded", function() {
    // Function to apply classes based on "ac" attribute
    function applyClasses(element, attr) {
        const classList = element.getAttribute(attr).split(' ');
        classList.forEach(function(cls) {
            const parts = cls.split(':');
            const selector = parts[0];
            const classesToAdd = parts.slice(1);

            const children = element.children;

            if (selector === '') {
                // Add classes to all children
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add(...classesToAdd);
                }
            } else if (selector === 'first') {
                // Add classes to the first child
                if (children.length > 0) {
                    children[0].classList.add(...classesToAdd);
                }
            } else if (selector === 'last') {
                // Add classes to the last child
                if (children.length > 0) {
                    children[children.length - 1].classList.add(...classesToAdd);
                }
            } else if (selector === 'odd') {
                // Add classes to odd children (1, 3, 5, ...)
                for (let i = 0; i < children.length; i += 2) {
                    children[i].classList.add(...classesToAdd);
                }
            } else if (selector === 'even') {
                // Add classes to even children (2, 4, 6, ...)
                for (let i = 1; i < children.length; i += 2) {
                    children[i].classList.add(...classesToAdd);
                }
            } else if (/^\d/.test(selector)) {
                // Add classes to the specified nth-child (1-based index)
                const parts = selector.split('-');
                let currentChildren = Array.from(children);
                for (let i = 0; i < parts.length; i++) {
                    const index = parseInt(parts[i]) - 1; // Convert to 0-based index
                    if (index >= 0 && index < currentChildren.length) {
                        if (i === parts.length - 1) {
                            currentChildren[index].classList.add(...classesToAdd);
                        } else {
                            currentChildren = Array.from(currentChildren[index].children);
                        }
                    } else {
                        break;
                    }
                }
            } else {
                // Add classes to all children
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add(selector, ...classesToAdd);
                }
            }
        });
    }

    // Function to apply IDs based on "ad" attribute
    function applyIDs(element, attr) {
        const idList = element.getAttribute(attr).split(' ');
        idList.forEach(function(idEntry) {
            const parts = idEntry.split(':');
            const selector = parts[0];
            const idToAdd = parts[1];

            const children = element.children;

            if (selector === 'first') {
                // Add ID to the first child
                if (children.length > 0) {
                    children[0].id = idToAdd;
                }
            } else if (selector === 'last') {
                // Add ID to the last child
                if (children.length > 0) {
                    children[children.length - 1].id = idToAdd;
                }
            } else if (/^\d/.test(selector)) {
                // Add ID to the specified nth-child (1-based index)
                const parts = selector.split('-');
                let currentChildren = Array.from(children);
                for (let i = 0; i < parts.length; i++) {
                    const index = parseInt(parts[i]) - 1; // Convert to 0-based index
                    if (index >= 0 && index < currentChildren.length) {
                        if (i === parts.length - 1) {
                            currentChildren[index].id = idToAdd;
                        } else {
                            currentChildren = Array.from(currentChildren[index].children);
                        }
                    } else {
                        break;
                    }
                }
            } else {
                // Add ID to all children
                for (let i = 0; i < children.length; i++) {
                    children[i].id = idToAdd;
                }
            }
        });
    }

    // Apply classes and IDs based on attributes
    const elementsWithAC = document.querySelectorAll('[ac]');
    elementsWithAC.forEach(function(element) {
        applyClasses(element, 'ac');
    });

    const elementsWithAD = document.querySelectorAll('[ad]');
    elementsWithAD.forEach(function(element) {
        applyIDs(element, 'ad');
    });

    // Responsive classes logic
    applyResponsiveClasses();
    window.addEventListener('resize', applyResponsiveClasses);

    function applyResponsiveClasses() {
        const elements = document.querySelectorAll('[class*="sm-"], [class*="st-"], [class*="sd-"], [class*="std-"], [class*="smt-"], [class*="smd-"]');
        const width = window.innerWidth;

        elements.forEach(element => {
            const classList = element.className.split(' ');

            // Remove all specific classes
            classList.forEach(cls => {
                if (cls.startsWith('sm-') || cls.startsWith('st-') || cls.startsWith('sd-') || cls.startsWith('std-') || cls.startsWith('smt-') || cls.startsWith('smd-')) {
                    element.classList.remove(cls.replace('sm-', '').replace('st-', '').replace('sd-', '').replace('std-', '').replace('smt-', '').replace('smd-', ''));
                }
            });

            // Add specific classes based on the width
            if (width < 768) {
                classList.forEach(cls => {
                    if (cls.startsWith('sm-') || cls.startsWith('smt-') || cls.startsWith('smd-')) {
                        element.classList.add(cls.replace('sm-', '').replace('smt-', '').replace('smd-', ''));
                    }
                });
            } else if (width >= 768 && width < 1024) {
                classList.forEach(cls => {
                    if (cls.startsWith('st-') || cls.startsWith('std-') || cls.startsWith('smt-')) {
                        element.classList.add(cls.replace('st-', '').replace('std-', '').replace('smt-', ''));
                    }
                });
            } else if (width >= 1024) {
                classList.forEach(cls => {
                    if (cls.startsWith('sd-') || cls.startsWith('std-') || cls.startsWith('smd-')) {
                        element.classList.add(cls.replace('sd-', '').replace('std-', '').replace('smd-', ''));
                    }
                });
            }
        });
    }

    // Apply classes on load
    applyResponsiveClasses();

    // Apply classes on resize
    window.addEventListener('resize', applyResponsiveClasses);
});