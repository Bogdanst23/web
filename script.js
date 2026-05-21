/* ============================================
   SCRIPT.JS - JAVASCRIPT COMUN PENTRU TOATE PAGINILE
   ============================================ */

// ===== DETECTARE DISPOZITIV =====
const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTabletDevice = /iPad|Android.*Tablet|Tablet/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);

// ===== VERIFICARE SUPORT ANIMAȚII =====
function supportsCSSAnimations() {
    return 'animation' in document.documentElement.style || 
           'WebkitAnimation' in document.documentElement.style || 
           'MozAnimation' in document.documentElement.style;
}

// ===== EFECT FADE LA SCROLL =====
function updateContentFade() {
    const contentFade = document.querySelector('.main-wrapper');
    if (!contentFade) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollProgress = Math.min(scrollPosition / (windowHeight * 0.5), 1);
    const opacity = 0.7 + (scrollProgress * 0.2);
    
    contentFade.style.background = `linear-gradient(to bottom, 
        rgba(30, 30, 30, ${opacity}) 0%, 
        rgba(40, 40, 40, ${Math.min(opacity + 0.1, 0.9)}) 100%)`;
}

// ===== CREARE CRUCIULIȚE AURII =====
function createCrosses() {
    const crossesContainer = document.getElementById('crossesContainer');
    if (!crossesContainer) return;
    
    const crossCount = isMobileDevice ? 12 : (isTabletDevice ? 18 : 25);
    
    if (!supportsCSSAnimations()) return;
    
    for (let i = 0; i < crossCount; i++) {
        const cross = document.createElement('div');
        cross.className = 'cross';
        cross.innerHTML = '†';
        cross.style.left = Math.random() * 100 + '%';
        cross.style.animationDelay = Math.random() * 20 + 's';
        cross.style.fontSize = (Math.random() * (isMobileDevice ? 12 : 20) + (isMobileDevice ? 8 : 12)) + 'px';
        
        if (isMobileDevice) {
            cross.style.animationDuration = (Math.random() * 10 + 25) + 's';
        }
        
        crossesContainer.appendChild(cross);
    }
}

// ===== CREARE PARTICULE AURII =====
function createGoldParticles() {
    const goldContainer = document.getElementById('goldDecoration');
    if (!goldContainer) return;
    
    const particleCount = isMobileDevice ? 10 : (isTabletDevice ? 20 : 30);
    
    if (!supportsCSSAnimations()) return;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        
        if (isMobileDevice) {
            particle.style.animationDuration = (Math.random() * 2 + 6) + 's';
        }
        
        goldContainer.appendChild(particle);
    }
    
    const lineCount = isMobileDevice ? 4 : (isTabletDevice ? 8 : 12);
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'gold-line';
        line.style.top = (i * (isMobileDevice ? 20 : 8)) + '%';
        line.style.width = Math.random() * (isMobileDevice ? 30 : 50) + (isMobileDevice ? 20 : 30) + '%';
        line.style.left = Math.random() * (isMobileDevice ? 70 : 50) + '%';
        line.style.opacity = Math.random() * 0.1 + 0.05;
        goldContainer.appendChild(line);
    }
}

// ===== APELARE TELEFON =====
function initPhoneCalls() {
    const consultantaBtn = document.getElementById('consultantaBtn');
    
    if (consultantaBtn) {
        consultantaBtn.addEventListener(isMobileDevice ? 'touchstart' : 'click', function(e) {
            if (isMobileDevice) {
                e.preventDefault();
                window.location.href = 'tel:0752538888';
            } else {
                e.preventDefault();
                if (confirm('Sunteți sigur că doriți să apelați numărul 0752 538 888?')) {
                    window.location.href = 'tel:0752538888';
                }
            }
        }, { passive: false });
    }
    
    const phoneLinks = document.querySelectorAll('a[href^="tel"], .phone-link');
    phoneLinks.forEach(link => {
        link.addEventListener(isMobileDevice ? 'touchstart' : 'click', function(e) {
            if (isMobileDevice) return true;
            return true;
        });
    });
}

// ===== PREVENIRE FORMATARE NUMERE =====
function preventPhoneNumberStyling() {
    const phoneElements = document.querySelectorAll('[href^="tel"], .phone-number');
    phoneElements.forEach(el => {
        el.setAttribute('x-ms-format-detection', 'none');
    });
}

// ===== OPTIMIZARE ANIMAȚII =====
function optimizeHeaderDove() {
    const doveHeader = document.querySelector('.dove-header');
    if (doveHeader && isMobileDevice) {
        doveHeader.style.animationDuration = '12s';
    }
}

function checkReducedMotionPreference() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        
        const animatedElements = document.querySelectorAll('.cross, .gold-particle, .dove-header');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// ===== NAVIGARE SMOOTH =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: isMobileDevice ? 'auto' : 'smooth'
                    });
                } else {
                    window.scrollTo(0, targetElement.offsetTop - 80);
                }
            }
        });
    });
}

// ===== EFECTE BUTOANE =====
function enhanceButtons() {
    const allButtons = document.querySelectorAll('.btn, .btn-more, .detail-btn, .contact-btn');
    
    allButtons.forEach(button => {
        const addHoverEffect = function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        };
        
        const removeHoverEffect = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        };
        
        const addActiveEffect = function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.4)';
        };
        
        if (!isMobileDevice) {
            button.addEventListener('mouseenter', addHoverEffect);
            button.addEventListener('mouseleave', removeHoverEffect);
            button.addEventListener('mousedown', addActiveEffect);
            button.addEventListener('mouseup', addHoverEffect);
        }
        
        if (isMobileDevice) {
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                addActiveEffect.call(this);
            }, { passive: false });
            
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                removeHoverEffect.call(this);
            }, { passive: false });
            
            button.addEventListener('touchcancel', function(e) {
                e.preventDefault();
                removeHoverEffect.call(this);
            }, { passive: false });
        }
    });
}

// ===== COROANE CYLINDER (pentru index.html) =====
function initCoroaneCylinder() {
    const cylinder = document.getElementById('coroaneCylinder');
    const prevBtn = document.getElementById('cylinderPrev');
    const nextBtn = document.getElementById('cylinderNext');
    const indicatorsContainer = document.getElementById('cylinderIndicators');
    const currentIndexSpan = document.getElementById('currentIndex');
    
    if (!cylinder) return;
    
    const isMobile = window.innerWidth <= 768;
    const TOTAL_IMAGES = 40;
    const CARDS_TO_SHOW = isMobile ? 3 : 5;
    const BASE_ANGLE = 360 / CARDS_TO_SHOW;
    const TRANSLATE_Z = isMobile ? 250 : 350;
    
    let currentIndex = 0;
    let isAnimating = false;
    const totalImages = TOTAL_IMAGES;
    
    function createGalleryStructure() {
        cylinder.innerHTML = '';
        if (indicatorsContainer) indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalImages; i++) {
            const card = document.createElement('div');
            card.className = 'coroane-card';
            card.dataset.index = i;
            
            const angle = (i * BASE_ANGLE);
            card.style.transform = `rotateY(${angle}deg) translateZ(${TRANSLATE_Z}px)`;
            
            const img = document.createElement('img');
            img.className = 'coroane-image';
            img.alt = `Coronă funerară ${i + 1}`;
            img.loading = 'lazy';
            img.src = `images/Coroana ${i + 1}.png`;
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/200x280/2a2a2a/8b7355?text=Coronă+' + (i + 1);
            };
            
            card.appendChild(img);
            cylinder.appendChild(card);
            
            if (indicatorsContainer) {
                const indicator = document.createElement('div');
                indicator.className = 'cylinder-indicator';
                indicator.dataset.index = i;
                if (i === currentIndex) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    if (!isAnimating) goToImage(i);
                });
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        updateDisplay();
    }
    
    function updateDisplay() {
        const targetRotation = -currentIndex * BASE_ANGLE;
        cylinder.style.transform = `rotateY(${targetRotation}deg)`;
        
        const cards = document.querySelectorAll('.coroane-card');
        cards.forEach((card) => {
            const cardIndex = parseInt(card.dataset.index);
            let diff = (cardIndex - currentIndex + totalImages) % totalImages;
            if (diff > totalImages/2) diff -= totalImages;
            
            card.classList.toggle('active', diff === 0);
            
            if (diff === 0) {
                card.style.opacity = '1';
                card.style.filter = 'none';
                card.style.zIndex = '10';
            } else if (Math.abs(diff) === 1) {
                card.style.opacity = '0.85';
                card.style.filter = 'blur(0.5px)';
                card.style.zIndex = '5';
            } else if (Math.abs(diff) === 2) {
                card.style.opacity = '0.7';
                card.style.filter = 'blur(1px)';
                card.style.zIndex = '3';
            } else {
                card.style.opacity = '0.5';
                card.style.filter = 'blur(1.5px)';
                card.style.zIndex = '1';
            }
        });
        
        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.cylinder-indicator');
            indicators.forEach((indicator) => {
                const indicatorIndex = parseInt(indicator.dataset.index);
                indicator.classList.toggle('active', indicatorIndex === currentIndex);
            });
        }
        
        if (currentIndexSpan) {
            currentIndexSpan.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
    }
    
    function goToImage(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        currentIndex = (index + totalImages) % totalImages;
        cylinder.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        updateDisplay();
        setTimeout(() => {
            cylinder.style.transition = '';
            isAnimating = false;
        }, 600);
    }
    
    function nextImage() { goToImage(currentIndex + 1); }
    function prevImage() { goToImage(currentIndex - 1); }
    
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    
    createGalleryStructure();
}

// ===== ÎNCĂRCARE COROANE (pentru coroane.html) =====
function loadCoroane() {
    const coroaneGrid = document.getElementById('coroaneGrid');
    if (!coroaneGrid) return;
    
    const totalCoroane = 40;
    const isDesktop = window.innerWidth > 768;
    let loadedCount = 0;
    
    function loadImage(index) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                loadedCount++;
                resolve({ index, success: true, src: img.src });
            };
            img.onerror = function() {
                loadedCount++;
                resolve({ index, success: false });
            };
            const cacheBuster = isDesktop ? `?t=${Date.now()}` : '';
            img.src = `images/Coroana ${index}.png${cacheBuster}`;
        });
    }
    
    async function loadImagesInBatches() {
        const batchSize = isDesktop ? 6 : 10;
        const totalBatches = Math.ceil(totalCoroane / batchSize);
        
        for (let batch = 0; batch < totalBatches; batch++) {
            const start = batch * batchSize + 1;
            const end = Math.min((batch + 1) * batchSize, totalCoroane);
            
            createHTMLForBatch(start, end);
            
            const promises = [];
            for (let i = start; i <= end; i++) {
                promises.push(loadImage(i));
            }
            
            await Promise.all(promises);
            
            if (isDesktop && batch < totalBatches - 1) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
    }
    
    function createHTMLForBatch(start, end) {
        for (let i = start; i <= end; i++) {
            const coroanaItem = document.createElement('div');
            coroanaItem.className = 'coroana-item';
            coroanaItem.dataset.index = i;
            
            const delay = ((i - 1) % 10) * 0.1;
            coroanaItem.style.animationDelay = `${delay}s`;
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'coroana-image-container';
            
            const img = document.createElement('img');
            img.className = 'coroana-image';
            img.alt = `Corona funerară ${i}`;
            
            const placeholderWidth = isDesktop ? '300' : '250';
            img.src = `https://via.placeholder.com/${placeholderWidth}x300/2a2a2a/555555?text=Se+încarcă...`;
            img.loading = 'lazy';
            img.style.opacity = '0.7';
            
            const loadRealImage = function() {
                const realImg = new Image();
                realImg.crossOrigin = "anonymous";
                realImg.onload = function() {
                    img.src = realImg.src;
                    img.style.opacity = '1';
                    img.classList.add('loaded');
                };
                realImg.onerror = function() {
                    img.src = `https://via.placeholder.com/${placeholderWidth}x300/333/8b7355?text=Corona+${i}`;
                    img.style.opacity = '1';
                };
                const cacheBuster = isDesktop ? `?t=${Date.now() + i}` : '';
                realImg.src = `images/Coroana ${i}.png${cacheBuster}`;
            };
            
            setTimeout(loadRealImage, isDesktop ? 500 + (i * 50) : 100 + (i * 20));
            
            imageContainer.appendChild(img);
            
            const coroanaName = document.createElement('div');
            coroanaName.className = 'coroana-name';
            coroanaName.textContent = `Corona ${i}`;
            
            coroanaItem.appendChild(imageContainer);
            coroanaItem.appendChild(coroanaName);
            coroaneGrid.appendChild(coroanaItem);
        }
    }
    
    loadImagesInBatches();
}

// ===== PACHETE DETALII (pentru pachete.html) =====
function initPackageDetails() {
    const packageDetails = {
        "4lat": {
            title: "Pachet 4-Lat",
            price: "980 RON",
            image: "images/4-Lat.png",
            features: ["Sicriu simplu din lemn masiv", "Capitonajul capacului", "Garnitura pentru interiorul sicriului", "Orarul mare", "Perna pentru decedat", "Voal față"]
        },
        "ploptri": {
            title: "Pachet Tri",
            price: "1.280 RON",
            image: "images/plop tri.png",
            features: ["Capitonaj interior premium", "Garnitură completă pentru interior", "Orar mare ornamentat", "Perna de cap din satin", "Voal față transparent"]
        },
        "bradtri180": {
            title: "Pachet Brad Tri 180cm",
            price: "1.580 RON",
            image: "images/Brad tri 180cm.png",
            features: ["Sicriu din brad triplu 180cm", "Capitonaj capac și interior", "Garnitură completă premium", "Orar mare ornamentat", "Perna de cap din satin", "Voal față transparent"]
        },
        "stejarrustic": {
            title: "Pachet Stejar Rustic",
            price: "1.890 RON",
            image: "images/stejar rustic.png",
            features: ["Sicriu din stejar rustic", "Capitonaj interior premium", "Garnitură completă pentru interior", "Orar mare ornamentat", "Perna de cap din satin", "Voal față transparent"]
        },
        "fagimprimat": {
            title: "Pachet Fag Imprimat",
            price: "2.180 RON",
            image: "images/fag imprimat.png",
            features: ["Sicriu din fag imprimat", "Capitonaj interior premium", "Garnitură completă pentru interior", "Orar mare ornamentat", "Perna de cap din satin", "Voal față transparent"]
        },
        "bradtri": {
            title: "Pachet Brad Tri",
            price: "2.180 RON",
            image: "images/brad tri.png",
            features: ["Sicriu din brad triplu", "Capitonaj interior premium", "Garnitură completă pentru interior", "Orar mare ornamentat", "Perna de cap din satin", "Voal față transparent"]
        },
        "prezidentimitatie": {
            title: "Pachet Prezident Imitație",
            price: "4.980 RON",
            image: "images/prezident imitatie.png",
            features: ["Sicriu Prezident imitație premium", "Capitonaj interior de lux", "Garnitură completă premium", "Orar mare ornamentat", "Perna de cap din satin premium", "Voal față transparent de calitate"]
        },
        "prezidentalb": {
            title: "Pachet Prezident Alb",
            price: "5.780 RON",
            image: "images/prezident alb.png",
            features: ["Sicriu Prezident alb premium", "Capitonaj interior de lux", "Garnitură completă premium", "Orar mare ornamentat", "Perna de cap din satin premium", "Voal față transparent de calitate"]
        }
    };

    function showPackageDetails(packageId) {
        const pkg = packageDetails[packageId];
        if (!pkg) return;
        
        const detailSection = document.getElementById('package-detail');
        const gridSection = document.getElementById('packages-grid');
        
        if (!detailSection || !gridSection) return;
        
        gridSection.style.display = 'none';
        detailSection.classList.add('active');
        
        detailSection.innerHTML = `
            <button class="back-btn" id="back-btn">
                <i class="fas fa-arrow-left"></i> Înapoi la toate pachetele
            </button>
            <div class="detail-container">
                <div class="detail-image">
                    <img src="${pkg.image}" alt="${pkg.title}">
                </div>
                <div class="detail-info">
                    <h2>${pkg.title}</h2>
                    <div class="detail-price">${pkg.price}</div>
                    <div class="detail-features">
                        <h3>Servicii incluse:</h3>
                        <ul>
                            ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <a href="tel:0752538888" class="contact-btn">
                        <i class="fas fa-phone"></i> Sună pentru ofertă: 0752 538 888
                    </a>
                </div>
            </div>
        `;
        
        document.getElementById('back-btn').addEventListener('click', function() {
            detailSection.classList.remove('active');
            gridSection.style.display = 'grid';
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const detailButtons = document.querySelectorAll('.detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const packageId = this.getAttribute('data-package');
            showPackageDetails(packageId);
        });
    });
}

// ===== FORMULAR CONTACT (pentru contact.html) =====
function initContactForm() {
    const form = document.getElementById('messageForm');
    if (!form) return;
    
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        const smsMessage = `Mesaj de pe site:%0A%0ANume: ${name}%0ATelefon: ${phone}%0A%0AMesaj:%0A${message}`;
        const phoneNumber = "0752538888";
        const smsLink = `sms:${phoneNumber}?body=${smsMessage}`;
        
        window.location.href = smsLink;
        
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        form.reset();
        
        if (successMessage) {
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// ===== INIȚIALIZARE GENERALĂ =====
document.addEventListener('DOMContentLoaded', function() {
    checkReducedMotionPreference();
    preventPhoneNumberStyling();
    createCrosses();
    createGoldParticles();
    initSmoothScrolling();
    initPhoneCalls();
    enhanceButtons();
    optimizeHeaderDove();
    
    // Inițializare specifică paginii
    if (document.getElementById('coroaneCylinder')) {
        initCoroaneCylinder();
    }
    
    if (document.getElementById('coroaneGrid')) {
        loadCoroane();
    }
    
    if (document.getElementById('packages-grid')) {
        initPackageDetails();
    }
    
    if (document.getElementById('messageForm')) {
        initContactForm();
    }
    
    // Observator pentru animații la scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.serviciu-card, .pachet-card, .coroana-item, .coffin-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Update fade la scroll
    updateContentFade();
    window.addEventListener('scroll', updateContentFade);
    window.addEventListener('resize', updateContentFade);
    
    // Re-creare efecte la resize
    window.addEventListener('resize', function() {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            document.getElementById('crossesContainer').innerHTML = '';
            document.getElementById('goldDecoration').innerHTML = '';
            createCrosses();
            createGoldParticles();
        }, 250);
    });
});
