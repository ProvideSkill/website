// ============================================
// CONFIGURATION — UPDATE THESE VALUES
// ============================================
const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID'; // Replace with your unlisted YouTube video ID
const WHATSAPP_NUMBER = '919XXXXXXXXX';   // Replace with your WhatsApp number (with country code, no +)

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ============================================
// YOUTUBE VIDEO EMBED
// ============================================
const videoPlaceholder = document.getElementById('videoPlaceholder');
const youtubeEmbed = document.getElementById('youtubeEmbed');

if (videoPlaceholder && youtubeEmbed) {
    videoPlaceholder.addEventListener('click', () => {
        if (YOUTUBE_VIDEO_ID === 'YOUR_VIDEO_ID') {
            alert('Video not configured yet!\n\nFounders: Replace YOUTUBE_VIDEO_ID in script.js with your actual YouTube video ID.');
            return;
        }
        youtubeEmbed.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;
        youtubeEmbed.classList.remove('hidden');
        videoPlaceholder.style.display = 'none';
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.curriculum-card, .outcome-card, .enroll-card, .contact-card, .video-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger animation for grid items
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [];
                    const index = siblings.indexOf(entry.target);
                    const delay = index * 80;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// FORM SUBMISSION HANDLING
// ============================================
const interestForm = document.getElementById('interestForm');

if (interestForm) {
    interestForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitInterestBtn');
        const originalText = submitBtn.innerHTML;

        // Check if form action is configured
        if (this.action.includes('YOUR_FORM_ID')) {
            alert('Form not configured yet!\n\nFounders: Replace YOUR_FORM_ID in the form action URL with your Formspree or Google Form endpoint.');
            return;
        }

        // Loading state
        submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Submitting...
        `;
        submitBtn.disabled = true;

        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                submitBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Registered Successfully!
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                this.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 4000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = `❌ Error — Try Again`;
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// ============================================
// UPDATE WHATSAPP LINKS
// ============================================
function updateWhatsAppLinks() {
    if (WHATSAPP_NUMBER === '919XXXXXXXXX') return; // Skip if not configured

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        link.setAttribute('href', currentHref.replace('919XXXXXXXXX', WHATSAPP_NUMBER));
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function animateCounter(element, target, suffix = '') {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    updateWhatsAppLinks();

    // Add a subtle spin keyframe for loading state
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
});
