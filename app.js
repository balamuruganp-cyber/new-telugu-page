// app.js - Telugu Matrimony Premium Actions and Animations (Toned Down & Failsafe)

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Generate Floating Sparkles in Hero
  initParticles();

  // Mobile Hamburger Menu Toggle
  initMobileMenu();

  // Simple Scroll Actions (Header shift)
  initHeaderScroll();



  // Featured Brides Carousel Slider
  initBridesSlider();

  // Featured Grooms Carousel Slider
  initGroomsSlider();

  // Success Stories Auto-Slider
  initSuccessStories();

  // FAQ Accordion Interactions
  initFaqAccordion();

  // Stats Slider for Mobile
  initStatsSlider();

});

/* ==========================================================================
   1. Dynamic Particles Generator (Sparkles & Stars)
   ========================================================================= */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const starSVG = `
    <svg class="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  `;

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'sparkle-particle';
    particle.innerHTML = starSVG;

    const size = Math.floor(Math.random() * 15) + 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const randColor = Math.random();
    if (randColor < 0.5) {
      particle.style.color = '#EAA245'; // Gold
    } else {
      particle.style.color = '#FCF9F6'; // Creamy White
    }

    particle.style.left = `${Math.random() * 100}%`;
    
    const duration = Math.random() * 8 + 8;
    particle.style.animationDuration = `${duration}s`;
    
    const delay = Math.random() * 5;
    particle.style.animationDelay = `-${delay}s`;

    container.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  for (let i = 0; i < 12; i++) {
    createParticle();
  }

  setInterval(createParticle, 2000);
}

/* ==========================================================================
   2. Mobile Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  const closeBtn = document.getElementById('close-menu-btn');
  const backdrop = document.getElementById('menu-backdrop');
  
  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    backdrop.classList.add('opacity-50');
    document.body.classList.add('overflow-hidden');
    
    gsap.fromTo('#mobile-menu-drawer nav a, #mobile-menu-drawer div button', 
      { opacity: 0, x: 30 }, 
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.3, ease: 'power2.out', delay: 0.05 }
    );
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-50');
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Simple Header Scroll Actions
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -20px',
    onEnter: () => {
      header.classList.add('shadow-md', 'py-3');
      header.classList.remove('shadow-sm', 'py-4');
    },
    onLeaveBack: () => {
      header.classList.remove('shadow-md', 'py-3');
      header.classList.add('shadow-sm', 'py-4');
    }
  });
}



/* ==========================================================================
   5. Featured Brides Slider (Responsive Grid/Slider Navigation)
   ========================================================================== */
function initBridesSlider() {
  const container = document.getElementById('brides-container');
  const prevBtn = document.getElementById('brides-prev');
  const nextBtn = document.getElementById('brides-next');

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 340;

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  container.addEventListener('scroll', () => {
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  });
}

/* ==========================================================================
   6. Featured Grooms Slider
   ========================================================================== */
function initGroomsSlider() {
  const container = document.getElementById('grooms-container');
  const prevBtn = document.getElementById('grooms-prev');
  const nextBtn = document.getElementById('grooms-next');

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 340;

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  container.addEventListener('scroll', () => {
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  });
}

/* ==========================================================================
   7. Success Stories Slider (Auto-slider + Smooth Height Transitions)
   ========================================================================== */
function initSuccessStories() {
  const slides = document.querySelectorAll('.success-slide-item');
  const nextBtn = document.getElementById('success-next');
  const prevBtn = document.getElementById('success-prev');
  const indicators = document.getElementById('success-indicators');

  if (!slides.length) return;

  let currentSlide = 0;
  let timer = null;

  indicators.innerHTML = '';

  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-[#8C0B10] scale-125' : 'bg-slate-300'}`;
    dot.setAttribute('aria-label', `Go to success story ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    indicators.appendChild(dot);
  });

  function updateDots() {
    const dots = indicators.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-[#8C0B10] scale-125';
      } else {
        dot.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-slate-300';
      }
    });
  }

  function goToSlide(n) {
    if (n === currentSlide) return;

    const currentEl = slides[currentSlide];
    const nextEl = slides[n];

    gsap.to(currentEl, {
      opacity: 0,
      scale: 0.99,
      duration: 0.25,
      onComplete: () => {
        currentEl.classList.add('hidden');
        currentEl.classList.remove('flex');
        
        currentSlide = (n + slides.length) % slides.length;
        
        nextEl.classList.remove('hidden');
        nextEl.classList.add('flex');

        gsap.fromTo(nextEl, 
          { opacity: 0, scale: 1.01 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out' }
        );
        
        updateDots();
      }
    });

    resetTimer();
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startTimer() {
    timer = setInterval(nextSlide, 7000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
}

/* ==========================================================================
   8. FAQ Accordion Interaction
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const inner = content ? content.querySelector('div') : null;
    const icon = item.querySelector('.faq-icon');

    if (!header || !content || !inner) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          
          gsap.to(otherContent, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.out' });
          gsap.to(otherIcon, { rotate: 0, duration: 0.25 });
          otherItem.classList.add('border-[#EADCD2]');
          otherItem.classList.remove('border-brand-gold', 'shadow-md');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        item.classList.add('border-[#EADCD2]');
        item.classList.remove('border-brand-gold', 'shadow-md');
        gsap.to(content, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.out' });
        gsap.to(icon, { rotate: 0, duration: 0.25 });
      } else {
        item.classList.add('active');
        item.classList.remove('border-[#EADCD2]');
        item.classList.add('border-brand-gold', 'shadow-md');
        
        const targetHeight = inner.scrollHeight + 20;

        gsap.to(content, { height: targetHeight, opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(icon, { rotate: 180, duration: 0.3 });
      }
    });
  });
}

/* ==========================================================================
   9. Mobile Stats Carousel Auto-Slider
   ========================================================================== */
function initStatsSlider() {
  const container = document.getElementById('stats-slider-container');
  if (!container) return;

  let isMobile = window.innerWidth < 768;
  let intervalId = null;
  let currentIndex = 0;
  const itemsCount = 4;

  function startAutoSlide() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!isMobile) return;
      
      currentIndex = (currentIndex + 1) % itemsCount;
      const scrollWidth = container.clientWidth;
      
      container.scrollTo({
        left: currentIndex * scrollWidth,
        behavior: 'smooth'
      });
    }, 3000); // Slide every 3 seconds
  }

  function stopAutoSlide() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Track manual scrolls to update slide index correctly
  container.addEventListener('scroll', () => {
    if (!isMobile) return;
    const scrollWidth = container.clientWidth;
    if (scrollWidth > 0) {
      currentIndex = Math.round(container.scrollLeft / scrollWidth);
    }
  });

  // Handle window resizing (enable/disable slider dynamically)
  window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;
    if (isMobile && !wasMobile) {
      startAutoSlide();
    } else if (!isMobile && wasMobile) {
      stopAutoSlide();
      container.scrollTo({ left: 0 }); // Reset position on desktop
    }
  });

  // Initialize auto sliding on mobile
  if (isMobile) {
    startAutoSlide();
  }

  // Pause on manual touch, resume when touch ends
  container.addEventListener('touchstart', stopAutoSlide);
  container.addEventListener('touchend', startAutoSlide);
}

