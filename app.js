// app.js - Telugu Matrimony Premium Actions and Animations (Toned Down & Failsafe)

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Generate Floating Hearts and Sparkles in Hero
  initParticles();

  // Mobile Hamburger Menu Toggle
  initMobileMenu();

  // Simple Scroll Actions (Header shift)
  initHeaderScroll();

  // Interactive Filter Card (Section 3)
  initInteractiveFilter();

  // Featured Brides Carousel Slider
  initBridesSlider();

  // Featured Grooms Carousel Slider
  initGroomsSlider();

  // FAQ Accordion Interactions
  initFaqAccordion();

  // Lead Generation WhatsApp Popup
  initPopupForm();
});

/* ==========================================================================
   1. Dynamic Particles Generator (Hearts & Stars)
   ========================================================================= */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const heartSVG = `
    <svg class="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `;

  const starSVG = `
    <svg class="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  `;

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'love-particle';
    
    const isHeart = Math.random() > 0.4;
    particle.innerHTML = isHeart ? heartSVG : starSVG;

    const size = Math.floor(Math.random() * 20) + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const randColor = Math.random();
    if (randColor < 0.4) {
      particle.style.color = '#B30D13';
    } else if (randColor < 0.8) {
      particle.style.color = '#2D1A1C';
    } else {
      particle.style.color = '#8E0C1B';
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

  setInterval(createParticle, 1500);
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
   4. Interactive Filter Card Selector
   ========================================================================== */
function initInteractiveFilter() {
  const filters = document.querySelectorAll('.search-filter-tab');
  const previewCard = document.getElementById('search-preview-card');
  const previewImage = document.getElementById('preview-image');
  const previewName = document.getElementById('preview-name');
  const previewDetails = document.getElementById('preview-details');
  const previewMatch = document.getElementById('preview-match-pct');
  const previewMatchBar = document.getElementById('preview-match-bar');
  const previewBadge = document.getElementById('preview-match-badge');

  // Mobile Popup Elements
  const mModal = document.getElementById('mobile-search-modal');
  const mBackdrop = document.getElementById('mobile-search-backdrop');
  const mContent = document.getElementById('mobile-search-content');
  const mClose = document.getElementById('close-mobile-search');
  
  const mTabBrides = document.getElementById('m-tab-brides');
  const mTabGrooms = document.getElementById('m-tab-grooms');
  const mCarousel = document.getElementById('m-preview-carousel');
  
  // Desktop Variables
  const dTabBrides = document.getElementById('d-tab-brides');
  const dTabGrooms = document.getElementById('d-tab-grooms');
  let dCurrentGender = 'bride';
  let currentFilterType = 'age';

  if (dTabBrides && dTabGrooms) {
    dTabBrides.addEventListener('click', () => {
      dCurrentGender = 'bride';
      dTabBrides.className = "flex-1 py-2 text-xs md:text-sm font-bold rounded-lg bg-white text-brand-red shadow-sm transition-all";
      dTabGrooms.className = "flex-1 py-2 text-xs md:text-sm font-bold rounded-lg text-slate-500 hover:text-brand-dark transition-all";
      const activeFilter = document.querySelector(`.search-filter-tab[data-filter="${currentFilterType}"]`);
      if (activeFilter) activeFilter.click();
    });
    dTabGrooms.addEventListener('click', () => {
      dCurrentGender = 'groom';
      dTabGrooms.className = "flex-1 py-2 text-xs md:text-sm font-bold rounded-lg bg-white text-brand-red shadow-sm transition-all";
      dTabBrides.className = "flex-1 py-2 text-xs md:text-sm font-bold rounded-lg text-slate-500 hover:text-brand-dark transition-all";
      const activeFilter = document.querySelector(`.search-filter-tab[data-filter="${currentFilterType}"]`);
      if (activeFilter) activeFilter.click();
    });
  }

  function closeMobileModal() {
    if (!mModal || !mBackdrop || !mContent) return;
    mBackdrop.classList.remove('opacity-100');
    mContent.classList.remove('translate-y-0');
    setTimeout(() => {
      mModal.classList.add('hidden');
      mModal.classList.remove('flex');
    }, 300);
  }

  if (mClose) mClose.addEventListener('click', closeMobileModal);
  if (mBackdrop) mBackdrop.addEventListener('click', closeMobileModal);

  if (!filters.length || !previewCard) return;

  // Data source for Mobile Carousel
  const allProfiles = {
    brides: [
      { name: "Sravani Reddy, 24", img: "bride1.png", badge: "Perfect Horoscope Match", pct: 98, details: "B.Tech Computer Science | Software Architect<br>Hyderabad, Telangana" },
      { name: "Dr. Pallavi Brahmin, 26", img: "bride2.png", badge: "High-Tier Education", pct: 96, details: "M.D. Pediatrics | Residency at AIIMS<br>Delhi / Visakhapatnam" },
      { name: "Ananya Arya Vysya, 23", img: "bride3.png", badge: "Traditional Family Value", pct: 95, details: "Chartered Accountant (CA) | Financial Advisor<br>Guntur, Andhra Pradesh" },
      { name: "Priyanka Yadava, 25", img: "bride4.png", badge: "Highly Compatible Family", pct: 97, details: "M.A. Literature & NGO Founder<br>Tirupati, Andhra Pradesh" }
    ],
    grooms: [
      { name: "Chaitanya Kamma, 28", img: "groom1.png", badge: "NRI Match", pct: 94, details: "M.S. in Data Analytics | Principal Analyst<br>Seattle, USA (H1B)" },
      { name: "Venkatesh Kapu, 29", img: "groom2.png", badge: "Top Business Class", pct: 91, details: "Product Manager | Entrepreneur<br>Bengaluru, Karnataka" },
      { name: "Karthik Naidu, 27", img: "groom3.png", badge: "Active Lifestyle Match", pct: 89, details: "UX Architect & Fitness Coach<br>Chennai / Nellore" },
      { name: "Raghav Balija, 30", img: "groom4.png", badge: "Ideal Star Gana Matching", pct: 99, details: "Senior Architect & Vastu Consultant<br>Vijayawada, Andhra Pradesh" }
    ]
  };

  function renderMobileCards(type) {
    if (!mCarousel) return;
    const profiles = allProfiles[type];
    mCarousel.innerHTML = profiles.map(p => `
      <div class="w-[85vw] max-w-[300px] snap-center flex-shrink-0 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-20 h-20 rounded-2xl overflow-hidden border border-brand-red/20 flex-shrink-0">
            <img src="${p.img}" class="w-full h-full object-cover">
          </div>
          <div>
            <div class="inline-block px-2 py-0.5 rounded bg-brand-red/10 text-brand-red text-[10px] font-extrabold uppercase mb-1 tracking-wider">${p.badge}</div>
            <h3 class="text-base font-extrabold text-brand-dark leading-tight">${p.name}</h3>
            <div class="flex items-center gap-1 text-[10px] font-bold text-slate-500 mt-1">
              <i class="fa-solid fa-circle-check text-brand-red"></i> Verified Match
            </div>
          </div>
        </div>
        <div class="w-full h-[1px] bg-slate-100 mb-3"></div>
        <p class="text-xs text-slate-600 font-outfit leading-relaxed mb-4 flex-grow">${p.details}</p>
        <div class="space-y-1.5 mb-4">
          <div class="flex justify-between items-center text-xs font-bold font-outfit text-slate-700">
            <span>Match Score</span>
            <span class="text-brand-red">${p.pct}%</span>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-brand-red rounded-full" style="width: ${p.pct}%;"></div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="flex-1 py-2.5 px-4 rounded-lg bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold transition-all shadow-md active:scale-95">Send Request</button>
          <button class="w-10 h-10 flex-shrink-0 rounded-lg border border-slate-200 text-slate-700 text-sm flex items-center justify-center active:scale-95">
            <i class="fa-solid fa-star text-brand-red"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  if (mTabBrides && mTabGrooms) {
    mTabBrides.addEventListener('click', () => {
      mTabBrides.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-white text-brand-red shadow-sm transition-all";
      mTabGrooms.className = "flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-brand-dark transition-all";
      renderMobileCards('brides');
      mCarousel.scrollTo(0,0);
    });
    mTabGrooms.addEventListener('click', () => {
      mTabGrooms.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-white text-brand-red shadow-sm transition-all";
      mTabBrides.className = "flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-brand-dark transition-all";
      renderMobileCards('grooms');
      mCarousel.scrollTo(0,0);
    });
  }

  const filterData = {
    age: {
      bride: { name: "Sravani Reddy, 24", details: "B.Tech Computer Science | Software Architect at Microsoft<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Hyderabad, Telangana", match: "98%", matchVal: 98, img: "bride1.png", badge: "Perfect Horoscope Match" },
      groom: { name: "Chaitanya Kamma, 28", details: "M.S. in Data Analytics | Principal Analyst<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Seattle, USA (H1B)", match: "94%", matchVal: 94, img: "groom1.png", badge: "Perfect Horoscope Match" }
    },
    location: {
      bride: { name: "Dr. Pallavi Brahmin, 26", details: "M.D. Pediatrics | Residency at AIIMS New Delhi<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Delhi / Visakhapatnam", match: "96%", matchVal: 96, img: "bride2.png", badge: "NRI Match" },
      groom: { name: "Chaitanya Kamma, 28", details: "M.S. in Data Analytics | Principal Analyst in Seattle<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Seattle, USA (H1B)", match: "94%", matchVal: 94, img: "groom1.png", badge: "NRI Match" }
    },
    education: {
      bride: { name: "Dr. Pallavi Brahmin, 26", details: "M.D. Pediatrics | Residency at AIIMS New Delhi<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Delhi / Visakhapatnam", match: "96%", matchVal: 96, img: "bride2.png", badge: "High-Tier Education" },
      groom: { name: "Venkatesh Kapu, 29", details: "Product Manager | Entrepreneur at FinTech Startup<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Bengaluru, Karnataka", match: "91%", matchVal: 91, img: "groom2.png", badge: "High-Tier Education" }
    },
    profession: {
      bride: { name: "Ananya Arya Vysya, 23", details: "Chartered Accountant (CA) | Financial Advisor at PwC<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Guntur, Andhra Pradesh", match: "95%", matchVal: 95, img: "bride3.png", badge: "Top Business Class" },
      groom: { name: "Venkatesh Kapu, 29", details: "Product Manager | Entrepreneur at FinTech Startup<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Bengaluru, Karnataka", match: "91%", matchVal: 91, img: "groom2.png", badge: "Top Business Class" }
    },
    community: {
      bride: { name: "Ananya Arya Vysya, 23", details: "Chartered Accountant (CA) | Financial Advisor at PwC<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Guntur, Andhra Pradesh", match: "95%", matchVal: 95, img: "bride3.png", badge: "Traditional Family Value" },
      groom: { name: "Karthik Naidu, 27", details: "UX Architect & Fitness Coach | Veg & Fitness Enthusiast<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Chennai / Nellore", match: "89%", matchVal: 89, img: "groom3.png", badge: "Traditional Family Value" }
    },
    lifestyle: {
      bride: { name: "Priyanka Yadava, 25", details: "M.A. Literature & NGO Founder | Joint Family Values<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Tirupati, Andhra Pradesh", match: "97%", matchVal: 97, img: "bride4.png", badge: "Active Lifestyle Match" },
      groom: { name: "Karthik Naidu, 27", details: "UX Architect & Fitness Coach | Veg & Fitness Enthusiast<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Chennai / Nellore", match: "89%", matchVal: 89, img: "groom3.png", badge: "Active Lifestyle Match" }
    },
    family: {
      bride: { name: "Priyanka Yadava, 25", details: "M.A. Literature & NGO Founder | Joint Family Values<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Tirupati, Andhra Pradesh", match: "97%", matchVal: 97, img: "bride4.png", badge: "Highly Compatible Family" },
      groom: { name: "Raghav Balija, 30", details: "Senior Architect & Vastu Consultant | Shuddha Jathakam<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Vijayawada, Andhra Pradesh", match: "99%", matchVal: 99, img: "groom4.png", badge: "Highly Compatible Family" }
    },
    horoscope: {
      bride: { name: "Sravani Reddy, 24", details: "B.Tech Computer Science | Software Architect at Microsoft<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Hyderabad, Telangana", match: "98%", matchVal: 98, img: "bride1.png", badge: "Ideal Star Gana Matching" },
      groom: { name: "Raghav Balija, 30", details: "Senior Architect & Vastu Consultant | Shuddha Jathakam<br><i class='fa-solid fa-location-dot text-brand-red mr-1'></i> Vijayawada, Andhra Pradesh", match: "99%", matchVal: 99, img: "groom4.png", badge: "Ideal Star Gana Matching" }
    }
  };

  filters.forEach(tab => {
    tab.addEventListener('click', () => {
      const type = tab.getAttribute('data-filter');
      currentFilterType = type;
      
      filters.forEach(f => f.classList.remove('border-brand-red', 'bg-brand-red/5', 'text-brand-red'));
      filters.forEach(f => f.classList.add('border-slate-100', 'bg-white', 'text-slate-700'));
      
      tab.classList.add('border-brand-red', 'bg-brand-red/5', 'text-brand-red');
      tab.classList.remove('border-slate-100', 'bg-white', 'text-slate-700');

      const data = filterData[type]?.[dCurrentGender];
      if (!data) return;

      if (window.innerWidth >= 1024) {
        // Desktop update with GSAP fade
        gsap.to(previewCard, {
          opacity: 0,
          y: 8,
          scale: 0.99,
          duration: 0.15,
          onComplete: () => {
            previewImage.src = data.img;
            previewName.innerText = data.name;
            previewDetails.innerHTML = data.details;
            previewMatch.innerText = data.match;
            previewBadge.innerText = data.badge;
            gsap.to(previewMatchBar, { width: `${data.matchVal}%`, duration: 0.25 });
            gsap.to(previewCard, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power1.out' });
          }
        });
      } else {
        // Mobile logic: Open Bottom Sheet Popup
        if (mModal) {
          const isGroom = data.img.includes('groom');
          if (isGroom && mTabGrooms) {
            mTabGrooms.click();
          } else if (mTabBrides) {
            mTabBrides.click();
          }

          mModal.classList.remove('hidden');
          mModal.classList.add('flex');
          
          // Allow display:flex to render before sliding
          setTimeout(() => {
            mBackdrop.classList.add('opacity-100');
            mContent.classList.add('translate-y-0');
          }, 10);
        }
      }
    });
  });
}

/* ==========================================================================
   9. Exit Intent Lead Generation Popup
   ========================================================================== */
function initPopupForm() {
  const popup = document.getElementById('lead-popup');
  const backdrop = document.getElementById('lead-popup-backdrop');
  const content = document.getElementById('lead-popup-content');
  const closeBtn = document.getElementById('close-popup-btn');
  
  if (!popup) return;

  let popupShown = false;

  function showPopup() {
    if (popupShown) return;
    popupShown = true;
    
    popup.classList.remove('hidden');
    popup.classList.add('flex');
    
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      content.classList.remove('scale-95', 'opacity-0');
      content.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function hidePopup() {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
      popup.classList.add('hidden');
      popup.classList.remove('flex');
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener('click', hidePopup);
  if (backdrop) backdrop.addEventListener('click', hidePopup);

  // Trigger on exit intent (mouse leaves viewport top)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) showPopup();
  });

  // Fallback trigger after 15 seconds on page
  setTimeout(showPopup, 15000);
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
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    stopAutoPlay();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    stopAutoPlay();
    startAutoPlay();
  });

  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  container.addEventListener('touchstart', stopAutoPlay, { passive: true });
  container.addEventListener('touchend', startAutoPlay);

  container.addEventListener('scroll', () => {
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  });

  startAutoPlay();
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
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    stopAutoPlay();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    stopAutoPlay();
    startAutoPlay();
  });

  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  container.addEventListener('touchstart', stopAutoPlay, { passive: true });
  container.addEventListener('touchend', startAutoPlay);

  container.addEventListener('scroll', () => {
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  });

  startAutoPlay();
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
          otherItem.classList.add('border-slate-100');
          otherItem.classList.remove('border-brand-red', 'shadow-md');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        item.classList.add('border-slate-100');
        item.classList.remove('border-brand-red', 'shadow-md');
        gsap.to(content, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.out' });
        gsap.to(icon, { rotate: 0, duration: 0.25 });
      } else {
        item.classList.add('active');
        item.classList.remove('border-slate-100');
        item.classList.add('border-brand-red', 'shadow-md');
        
        const targetHeight = inner.scrollHeight + 20;

        gsap.to(content, { height: targetHeight, opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(icon, { rotate: 180, duration: 0.3 });
      }
    });
  });
}
