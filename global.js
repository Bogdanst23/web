// Detectare parametri dispozitive pentru optimizare automată
const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTabletDevice = /iPad|Android.*Tablet|Tablet/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);

function supportsCSSAnimations() {
    return 'animation' in document.documentElement.style || 
           'WebkitAnimation' in document.documentElement.style || 
           'MozAnimation' in document.documentElement.style;
}

// Generare layout comun pentru pagini secundare (pentru a opri repetarea codului HTML)
function injectGlobalStructures() {
    const pageId = document.body.dataset.page;
    
    // Injectăm fundalul doar dacă nu e deja declarat în fișier (cum are index.html)
    if (!document.querySelector('.page-background')) {
        const bg = document.createElement('div');
        bg.className = 'page-background';
        document.body.insertBefore(bg, document.body.firstChild);
        
        const dove = document.createElement('div');
        dove.className = 'dove-header';
        dove.innerHTML = '🕊️';
        document.body.insertBefore(dove, document.body.children[1]);

        const crosses = document.createElement('div');
        crosses.className = 'crosses-container';
        crosses.id = 'crossesContainer';
        document.body.insertBefore(crosses, document.body.children[2]);

        const gold = document.createElement('div');
        gold.className = 'gold-decoration';
        gold.id = 'goldDecoration';
        document.body.insertBefore(gold, document.body.children[3]);
    }

    // Injectare dinamică Header & Footer în interiorul containerului .content-fade
    const contentFade = document.getElementById('contentFade');
    if (contentFade && !contentFade.querySelector('header')) {
        
        // Template Header Complet
        const headerHTML = `
        <header>
            <div class="container">
                <div class="header-container">
                    <a href="./" class="logo-link">
                        <div class="logo">
                            <div class="logo-icon"></div>
                            <div class="logo-text">
                                <h1>CASA</h1>
                                <span>FUNERARĂ LUPICĂ</span>
                            </div>
                        </div>
                    </a>
                    <nav class="main-nav">
                        <ul>
                            <li><a href="./" class="${pageId === 'home' ? 'active' : ''}">Home</a></li>
                            <li><a href="./pachete" class="${pageId === 'pachete' ? 'active' : ''}">Pachete Funerare</a></li>
                            <li><a href="./coroane" class="${pageId === 'coroane' ? 'active' : ''}">Coroane</a></li>
                            <li><a href="./contact" class="${pageId === 'contact' ? 'active' : ''}">Contact</a></li>
                        </ul>
                    </nav>
                    <div class="contact-header">
                        <a href="tel:0752538888" class="phone-emergency phone-link">
                            <i class="fas fa-phone-alt"></i>
                            <span class="phone-number">0752 538 888</span>
                        </a>
                        <div class="contact-item">
                            <i class="fas fa-clock"></i>
                            <span>Non-stop 24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>`;
        
        contentFade.insertAdjacentHTML('afterbegin', headerHTML);

        // Template Footer Complet
        const footerHTML = `
        <footer>
            <div class="container">
                <div class="footer-container">
                    <div class="footer-col">
                        <h3>Casa Funerară Lupică</h3>
                        <p>Oferim servicii funerare complete cu demnitate și compasiune, asigurând sprijin și consolare familiilor în doliu.</p>
                        <div class="social-links">
                            <a href="https://www.facebook.com/share/1AAbdNsqdw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>
                    <div class="footer-col">
                        <h3>Link-uri Rapide</h3>
                        <ul>
                            <li><a href="./">Home</a></li>
                            <li><a href="./pachete">Pachete funerare</a></li>
                            <li><a href="./coroane">Coroane funerare</a></li>
                            <li><a href="./contact">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>Servicii</h3>
                        <ul>
                            <li><a href="./#servicii-principale">Servicii funerare principale</a></li>
                            <li><a href="./pachete">Pachete funerare</a></li>
                            <li><a href="./#asistenta-formalitati">Asistență și formalități</a></li>
                            <li><a href="./#servicii-suplimentare">Servicii suplimentare</a></li>
                            <li><a href="./pachete">Sicrie și accesorii</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; 2025 Casa Funerară Lupica. Toate drepturile rezervate.</p>
                </div>
            </div>
        </footer>`;
        
        contentFade.insertAdjacentHTML('beforeend', footerHTML);
    }
}

// Efecte vizuale dinamice la scroll
function updateContentFade() {
    const contentFade = document.getElementById('contentFade');
    if (!contentFade) return;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollProgress = Math.min(scrollPosition / (windowHeight * 0.5), 1);
    const opacity = 0.7 + (scrollProgress * 0.2);
    contentFade.style.background = `linear-gradient(to bottom, rgba(30, 30, 30, ${opacity}) 0%, rgba(40, 40, 40, ${Math.min(opacity + 0.1, 0.9)}) 100%)`;
}

// Creare elemente decorative floatante
function createDecorations() {
    const crossesContainer = document.getElementById('crossesContainer');
    const goldContainer = document.getElementById('goldDecoration');
    if (!crossesContainer || !goldContainer || !supportsCSSAnimations()) return;

    const crossCount = isMobileDevice ? 12 : (isTabletDevice ? 18 : 25);
    const particleCount = isMobileDevice ? 10 : (isTabletDevice ? 20 : 30);

    // Cruci
    for (let i = 0; i < crossCount; i++) {
        const cross = document.createElement('div');
        cross.className = 'cross';
        cross.innerHTML = '†';
        cross.style.left = Math.random() * 100 + '%';
        cross.style.animationDelay = Math.random() * 20 + 's';
        cross.style.fontSize = (Math.random() * (isMobileDevice ? 12 : 20) + (isMobileDevice ? 8 : 12)) + 'px';
        if (isMobileDevice) cross.style.animationDuration = (Math.random() * 10 + 25) + 's';
        crossesContainer.appendChild(cross);
    }

    // Particule aurii
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        if (isMobileDevice) particle.style.animationDuration = (Math.random() * 2 + 6) + 's';
        goldContainer.appendChild(particle);
    }

    // Linii aurii
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

// Inițializare functionalități butoane / telefoane
function initGlobalEvents() {
    // Apel securizat telefon
    const consultantaBtn = document.getElementById('consultantaBtn');
    if (consultantaBtn) {
        consultantaBtn.addEventListener(isMobileDevice ? 'touchstart' : 'click', function(e) {
            e.preventDefault();
            if (isMobileDevice) {
                window.location.href = 'tel:0752538888';
            } else {
                if (confirm('Sunteți sigur că doriți să apelați numărul 0752 538 888?')) {
                    window.location.href = 'tel:0752538888';
                }
            }
        }, { passive: false });
    }

    // Format detecție tel pe elemente inline
    document.querySelectorAll('[href^="tel"], .phone-number').forEach(el => {
        el.setAttribute('x-ms-format-detection', 'none');
    });

    // Optimizări elemente active/hover butoane
    document.querySelectorAll('.btn-more, .btn').forEach(button => {
        if (!isMobileDevice) {
            button.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px)'; this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)'; });
            button.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)'; });
        }
    });

    // Control motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.cross, .gold-particle, .dove-header').forEach(el => el.style.animation = 'none');
    }
}

// Trigger rulare globală la DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    injectGlobalStructures();
    updateContentFade();
    createDecorations();
    initGlobalEvents();

    window.addEventListener('scroll', updateContentFade);
    window.addEventListener('resize', function() {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            const cc = document.getElementById('crossesContainer');
            const gd = document.getElementById('goldDecoration');
            if (cc) cc.innerHTML = '';
            if (gd) gd.innerHTML = '';
            createDecorations();
        }, 250);
    });
});
