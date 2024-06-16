// name: jss.js
// desc: simple js for styling html
// auth: @marhaendev
// licence: MIT License 

// ================ usage
// import this to your project
// <script src="https://cdn.jsdelivr.net/gh/marhaendev/js-jss@latest/jss.js"></script> 

// ================ handle classes
// =========== ac-
// v2
// ac (add children - classes)

document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with class names starting with 'ac-'
  const elements = document.querySelectorAll('[class*="ac-"]');

  elements.forEach(function(element) {
      // Find all class names that start with 'ac-'
      const classList = Array.from(element.classList);
      classList.forEach(function(cls) {
          if (cls.startsWith('ac-')) {
              // Extract the part after 'ac-'
              const classToAdd = cls.substring(3);

              const children = element.children;

              if (classToAdd.startsWith('last-')) {
                  // Add class to the last child
                  if (children.length > 0) {
                      children[children.length - 1].classList.add(classToAdd.substring(5));
                  }
              } else if (classToAdd.startsWith('first-')) {
                  // Add class to the first child
                  if (children.length > 0) {
                      children[0].classList.add(classToAdd.substring(6));
                  }
              } else if (classToAdd.startsWith('odd-')) {
                  // Add class to odd children (1, 3, 5, ...)
                  for (let i = 0; i < children.length; i += 2) {
                      children[i].classList.add(classToAdd.substring(4));
                  }
              } else if (classToAdd.startsWith('even-')) {
                  // Add class to even children (2, 4, 6, ...)
                  for (let i = 1; i < children.length; i += 2) {
                      children[i].classList.add(classToAdd.substring(5));
                  }
              } else if (/^\d+-/.test(classToAdd)) {
                  // Add class to the specified nth-child (1-based index)
                  const parts = classToAdd.split('-');
                  const index = parseInt(parts[0]) - 1; // Convert to 0-based index
                  const classToApply = parts.slice(1).join('-'); // Rejoin the remaining parts
                  if (index >= 0 && index < children.length) {
                      children[index].classList.add(classToApply);
                  }
              } else {
                  // Default case: add class to all children
                  for (let i = 0; i < children.length; i++) {
                      children[i].classList.add(classToAdd);
                  }
              }
          }
      });
  });
});

// =========== end ac-


// =========== clav.js
// class view adjustment
// for responsive

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
// =========== end clav.js
