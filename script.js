document.addEventListener('DOMContentLoaded', function() {

    // --- LOCOMOTIVE SCROLL & GSAP INITIALIZATION ---
   
    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Select the main scroll container
    const scrollContainer = document.querySelector('[data-scroll-container]');

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.08
    });

    // Update ScrollTrigger whenever Locomotive Scroll scrolls
    locoScroll.on('scroll', ScrollTrigger.update);

    // Tell ScrollTrigger to use Locomotive Scroll for scrolling
    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length ?
                   locoScroll.scrollTo(value, 0, 0) :
                   locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
    });

    // Refresh ScrollTrigger and Locomotive Scroll on window resize
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();


    // ---  MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavMenu.classList.toggle('is-open');
        });
    }

    // ---  ACTIVE NAV LINK ---
    // Highlight the nav link for the current page
    const currentPagePath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
       
        // Handle "index.html" also matching a path of ""
        if (currentPagePath === linkPath || (currentPagePath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ---  GSAP ANIMATIONS ---
   
    // A. Hero Load-in Animation (Home Page Only)
    // Check if the hero-title element exists on this page
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        gsap.to("#hero-title span", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2
        });

        gsap.to("#hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.7,
            ease: 'power3.out'
        });
    }
   
// Scroll-Triggered Animations (using integrated ScrollTrigger)
// Animate elements with the .reveal-title class upon scrolling into view
document.querySelectorAll('.reveal-title').forEach(el => {
    // Set the initial state (which is currently defined in CSS)
    // We can define it here explicitly for more control/clarity
    gsap.set(el, {
        y: 30, // Matches your CSS 'transform: translateY(30px)'
        opacity: 0 // Matches your CSS 'opacity: 0'
    });
    
    gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out', // Matches your CSS 'cubic-bezier(0.19, 1, 0.22, 1)'
        scrollTrigger: {
            trigger: el,
            scroller: scrollContainer, // Tells ScrollTrigger to use Locomotive Scroll
            start: 'top 90%',         // Start animation when the element is 90% from the top
            end: 'bottom top',
            toggleActions: 'play none none none', // Play the animation once when entering
            // markers: true, // UNCOMMENT THIS FOR DEBUGGING
        }
    });
    });
});