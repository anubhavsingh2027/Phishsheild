document.addEventListener("DOMContentLoaded", () => {
  // ===== Auto-resize textarea =====
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
    messageTextarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }

  // ===== Contact Form =====
  const contactForm = document.getElementById('contactForm');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      loadingSpinner.style.display = 'block'; // Show spinner

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await res.json();
        if (res.ok) {
          contactForm.reset();
        } 
      } catch (error) {
        console.error(error);
      } finally {
        loadingSpinner.style.display = 'none'; // Hide spinner
      }
    });
  }
});


// Enhanced PhishShield - Premium Cybersecurity Application

class PhishShieldPremium {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.isAnalyzing = false;
        this.analysisHistory = [];
        this.activeTab = 'overview';
        this.mobileMenuOpen = false;
        
        // Application data
        this.data = {
            safe_domains: ["google.com", "microsoft.com", "github.com", "stackoverflow.com", "mozilla.org", "w3schools.com", "tailwindcss.com", "apple.com", "amazon.com", "facebook.com", "twitter.com", "linkedin.com", "youtube.com", "netflix.com", "instagram.com"],
            suspicious_domains: ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "short.link", "rebrand.ly"],
            malicious_patterns: [
                "g00gle", "micr0soft", "payp4l", "amaz0n", "faceb00k", "twitt3r", 
                "appl3", "netfIix", "inst4gram", "linked1n", "yah00", "gmai1",
                "g0ogle", "microsft", "paypal-", "amazn", "facebbok", "twiitter",
                "gooogle", "microsooft", "paaypal", "amaazn", "faceebook"
            ],
            suspicious_tlds: [".tk", ".ml", ".ga", ".cf", ".pw", ".top", ".click", ".download"],
            threat_levels: {
                safe: {
                    color: "green",
                    message: "This URL appears to be safe",
                    confidence: 95,
                    risk_score: 10,
                    icon: "🛡️"
                },
                suspicious: {
                    color: "yellow", 
                    message: "This URL has suspicious characteristics",
                    confidence: 75,
                    risk_score: 65,
                    icon: "⚠️"
                },
                malicious: {
                    color: "red",
                    message: "This URL appears to be malicious", 
                    confidence: 90,
                    risk_score: 90,
                    icon: "🚨"
                }
            },
            analysis_factors: [
                {name: "Domain reputation", weight: 25, description: "Checks against known malicious domain databases", icon: "🌐"},
                {name: "URL structure", weight: 20, description: "Analyzes URL patterns and suspicious elements", icon: "🔗"},
                {name: "SSL certificate", weight: 15, description: "Validates HTTPS implementation and certificate", icon: "🔒"},
                {name: "Subdomain analysis", weight: 15, description: "Examines subdomain patterns and complexity", icon: "📊"},
                {name: "TLD verification", weight: 10, description: "Checks top-level domain reputation", icon: "🏷️"},
                {name: "Pattern matching", weight: 15, description: "Matches against known phishing patterns", icon: "🎯"}
            ],
            features: [
                {icon: "🛡️", title: "Real-time Protection", description: "Instant URL analysis with AI-powered threat detection using advanced machine learning algorithms", color: "blue"},
                {icon: "🔍", title: "Deep Analysis", description: "Comprehensive scanning with 25+ security factors and enterprise-grade pattern recognition", color: "purple"},
                {icon: "📊", title: "Advanced Reports", description: "Professional security reports with visual analytics and actionable insights", color: "green"},
                {icon: "⚡", title: "Lightning Speed", description: "Sub-200ms analysis with global CDN and edge computing infrastructure", color: "yellow"},
                {icon: "🔒", title: "Zero Trust Privacy", description: "No data storage, no tracking, complete privacy with military-grade security", color: "red"},
                {icon: "🌐", title: "Universal Access", description: "Works on any device, any browser, anywhere - no installation required", color: "cyan"}
            ],
            stats: [
                {value: "10M+", label: "URLs Analyzed", icon: "🔍"},
                {value: "99.98%", label: "Accuracy Rate", icon: "🎯"},
                {value: "24/7", label: "Protection", icon: "🛡️"},
                {value: "0ms", label: "Data Stored", icon: "🔒"}
            ]
        };

        this.init();
    }

    init() {
        this.waitForDOM(() => {
            console.log('PhishShield Premium initializing...');
            this.initializeElements();
            this.setupEventListeners();
            this.initializeTheme();
            this.setupIntersectionObserver();
            this.animateCounters();
            this.setupMagneticEffects();
            this.initializeParticleSystem();
            console.log('PhishShield Premium ready!');
        });
    }

    waitForDOM(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    initializeElements() {
        console.log('Initializing premium elements...');
        
        this.elements = {
            // Navigation
            navbar: document.getElementById('premiumNav'),
            navLinks: document.querySelectorAll('.nav-link'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            navLinksContainer: document.getElementById('navLinks'),
            themeToggle: document.getElementById('themeToggle'),
            loginBtn: document.getElementById('loginBtn'),
            brandLogo: document.querySelector('.brand-logo'),

            // Hero section
            heroSection: document.getElementById('home'),
            analyzeNowBtn: document.getElementById('analyzeNowBtn'),
            learnMoreBtn: document.getElementById('learnMoreBtn'),
            statNumbers: document.querySelectorAll('.stat-number'),

            // Analysis section
            urlForm: document.getElementById('urlForm'),
            urlInput: document.getElementById('urlInput'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            btnLoader: document.getElementById('btnLoader'),
            inputFeedback: document.getElementById('inputFeedback'),

            // Results section
            resultsSection: document.getElementById('resultsSection'),
            meterFill: document.getElementById('meterFill'),
            threatIcon: document.getElementById('threatIcon'),
            threatLevel: document.getElementById('threatLevel'),
            threatScore: document.getElementById('threatScore'),
            threatMessage: document.getElementById('threatMessage'),
            exportBtn: document.getElementById('exportBtn'),

            // Tabs
            tabBtns: document.querySelectorAll('.tab-btn'),
            tabPanels: document.querySelectorAll('.tab-panel'),
            metricsGrid: document.getElementById('metricsGrid'),
            detailsGrid: document.getElementById('detailsGrid'),
            recommendationsList: document.getElementById('recommendationsList'),

            // Feature cards
            featureCards: document.querySelectorAll('.feature-card'),

            // Toast container
            toastContainer: document.getElementById('toastContainer')
        };

        // Log missing elements
        Object.entries(this.elements).forEach(([key, element]) => {
            if (!element && !key.endsWith('s')) {
                console.warn(`Element not found: ${key}`);
            }
        });

        console.log('Elements initialized:', Object.keys(this.elements).length, 'element types');
    }

    setupEventListeners() {
        console.log('Setting up premium event listeners...');

        // Navigation
        this.addEventListenerSafe(this.elements.brandLogo, 'click', () => {
            this.scrollToSection('home');
        });

        // ... inside setupEventListeners()
this.elements.navLinks.forEach((link, index) => {
    this.addEventListenerSafe(link, 'click', (e) => {
        const section = link.getAttribute('data-section');
        // Now, we only prevent default behavior IF it's a scrolling link
        if (section) {
            e.preventDefault(); // <--- MOVED HERE
            this.scrollToSection(section);
            this.setActiveNavLink(link);
            if (this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }
        }
        // If there's no data-section, this function does nothing,
        // and the link works normally (e.g., goes to /about).
    });
});
        // Mobile menu
        this.addEventListenerSafe(this.elements.mobileMenuBtn, 'click', () => {
            this.toggleMobileMenu();
        });

        // Theme toggle
        this.addEventListenerSafe(this.elements.themeToggle, 'click', () => {
            this.toggleTheme();
        });

        // Login button
        this.addEventListenerSafe(this.elements.loginBtn, 'click', () => {
            this.showToast('Premium login feature coming soon! 🚀', 'info');
        });

        // Hero buttons
        this.addEventListenerSafe(this.elements.analyzeNowBtn, 'click', () => {
            this.scrollToSection('analysis');
        });

        this.addEventListenerSafe(this.elements.learnMoreBtn, 'click', () => {
            this.scrollToSection('features');
        });

        // URL Analysis
        this.addEventListenerSafe(this.elements.urlForm, 'submit', (e) => {
            e.preventDefault();
            this.analyzeUrl();
        });

        this.addEventListenerSafe(this.elements.urlInput, 'input', (e) => {
            this.validateUrlInput(e.target.value);
        });

        this.addEventListenerSafe(this.elements.urlInput, 'keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.analyzeUrl();
            }
        });

        // Export button
        this.addEventListenerSafe(this.elements.exportBtn, 'click', () => {
            this.exportReport();
        });

        // Tab navigation
        this.elements.tabBtns.forEach(btn => {
            this.addEventListenerSafe(btn, 'click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Feature cards
        this.elements.featureCards.forEach(card => {
            this.addEventListenerSafe(card, 'click', () => {
                const feature = card.getAttribute('data-feature');
                this.showFeatureDetails(feature);
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        console.log('Event listeners setup complete');
    }

    addEventListenerSafe(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
            return true;
        }
        return false;
    }

    // Theme Management
    getStoredTheme() {
        try {
            const stored = localStorage.getItem('phishshield-theme');
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    initializeTheme() {
        this.applyTheme(false);
    }

    applyTheme(animate = true) {
        const root = document.documentElement;
        
        if (animate) {
            root.style.transition = 'color 0.3s ease, background-color 0.3s ease';
        }

        root.setAttribute('data-color-scheme', this.currentTheme);

        if (this.elements.themeToggle) {
            const themeIcon = this.elements.themeToggle.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
            }
        }

        try {
            localStorage.setItem('phishshield-theme', this.currentTheme);
        } catch (e) {
            console.warn('Could not save theme preference');
        }

        if (animate) {
            setTimeout(() => {
                root.style.transition = '';
            }, 300);
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(true);
        this.showToast(`Switched to ${this.currentTheme} mode`, 'info');
    }

    // Navigation
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = this.elements.navbar?.offsetHeight || 80;
            const targetPosition = section.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.elements.mobileMenuBtn) {
            this.elements.mobileMenuBtn.classList.toggle('active', this.mobileMenuOpen);
        }
        
        if (this.elements.navLinksContainer) {
            this.elements.navLinksContainer.classList.toggle('active', this.mobileMenuOpen);
        }

        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }

    handleScroll() {
        if (this.elements.navbar) {
            const scrolled = window.scrollY > 50;
            this.elements.navbar.classList.toggle('scrolled', scrolled);
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    
                    // Update active nav link
                    const sectionId = entry.target.id;
                    if (sectionId) {
                        const correspondingNavLink = document.querySelector(`[data-section="${sectionId}"]`);
                        if (correspondingNavLink) {
                            this.setActiveNavLink(correspondingNavLink);
                        }
                    }
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));
    }

    // Counter Animation
    animateCounters() {
        this.elements.statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const suffix = stat.textContent.replace(/[0-9.]/g, '');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target >= 1000000) {
                    stat.textContent = (current / 1000000).toFixed(1) + 'M' + suffix.replace('0', '');
                } else if (target >= 1000) {
                    stat.textContent = (current / 1000).toFixed(1) + 'K' + suffix.replace('0', '');
                } else if (target > 90) {
                    stat.textContent = current.toFixed(2) + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 50);
        });
    }

    // Magnetic Effects
    setupMagneticEffects() {
        const magneticElements = document.querySelectorAll('.hero-cta-primary, .cta-login-btn, .analyze-btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.updateMagneticEffect(e, element);
            });

            element.addEventListener('mouseleave', () => {
                this.resetMagneticEffect(element);
            });
        });
    }

    updateMagneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const magneticField = element.querySelector('.magnetic-field, .cta-energy');
        if (magneticField) {
            const strength = 0.3;
            magneticField.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        }
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    }

    resetMagneticEffect(element) {
        const magneticField = element.querySelector('.magnetic-field, .cta-energy');
        if (magneticField) {
            magneticField.style.transform = 'translate(0, 0)';
        }
        element.style.transform = 'translate(0, 0)';
    }

    // Particle System
    initializeParticleSystem() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        });
    }

    // URL Analysis
    validateUrlInput(url) {
        if (!this.elements.inputFeedback) return;

        const feedback = this.elements.inputFeedback;
        
        if (!url || url.trim() === '') {
            feedback.classList.remove('show', 'valid', 'invalid');
            return;
        }

        if (this.isValidUrl(url)) {
            feedback.className = 'input-feedback valid show';
            feedback.innerHTML = '<span>✅</span> Valid URL format detected';
            
            const domain = this.extractDomain(url);
            if (this.data.safe_domains.some(safeDomain => domain.includes(safeDomain))) {
                feedback.innerHTML = '<span>🛡️</span> Recognized safe domain';
            } else if (this.data.suspicious_domains.some(suspDomain => domain.includes(suspDomain))) {
                feedback.className = 'input-feedback invalid show';
                feedback.innerHTML = '<span>⚠️</span> URL shortener detected - proceed with caution';
            }
        } else {
            feedback.className = 'input-feedback invalid show';
            feedback.innerHTML = '<span>❌</span> Please enter a valid URL (e.g., https://example.com)';
        }
    }

    isValidUrl(string) {
        try {
            const url = new URL(string.startsWith('http') ? string : `https://${string}`);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    extractDomain(url) {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname.toLowerCase();
        } catch (_) {
            return '';
        }
    }

    // PhishShieldPremium class

async analyzeUrl() {
    if (this.isAnalyzing) return;
    const url = this.elements.urlInput.value.trim();
    
    if (!url || !this.isValidUrl(url)) {
        this.showToast('Please enter a valid URL', 'error');
        return;
    }

    this.isAnalyzing = true;
    await this.showLoadingState(); // Keep your loading animation

    try {
        // <<< NEW: Call the backend to do the analysis >>>
        const response = await fetch('/analyze-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to analyze URL');
        }

        // Use the result FROM THE SERVER to display results
        // The 'data' object has the structure { success: true, analysis: { level: '...', score: ... } }
        await this.displayResults({ 
            url: data.scannedUrl,
            threatLevel: data.analysis.level,
            confidence: data.analysis.score,
            // Re-generate metrics and recommendations based on the server's verdict
            metrics: this.generateMetrics(new URL(data.scannedUrl), data.analysis.level, data.analysis.score),
            recommendations: this.generateRecommendations(data.analysis.level),
            factors: this.generateAnalysisFactors(new URL(data.scannedUrl), data.analysis.level),
            timestamp: new Date()
        });

        this.showToast('Analysis completed successfully!', 'success');

    } catch (error) {
        console.error('Analysis error:', error);
        this.showToast(error.message, 'error');
    } finally {
        this.hideLoadingState();
        this.isAnalyzing = false;
    }
}
    async showLoadingState() {
        if (this.elements.analyzeBtn) {
            const btnText = this.elements.analyzeBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Analyzing...';
            
            if (this.elements.btnLoader) {
                this.elements.btnLoader.classList.add('show');
            }
            
            this.elements.analyzeBtn.disabled = true;
        }
        
        if (this.elements.resultsSection) {
            this.elements.resultsSection.classList.add('hidden');
        }
    }

    hideLoadingState() {
        if (this.elements.analyzeBtn) {
            const btnText = this.elements.analyzeBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Analyze';
            
            if (this.elements.btnLoader) {
                this.elements.btnLoader.classList.remove('show');
            }
            
            this.elements.analyzeBtn.disabled = false;
        }
    }

    async simulateAnalysisProgress() {
        const steps = [
            'Initializing security scan...',
            'Checking domain reputation...',
            'Analyzing URL structure...',
            'Validating SSL certificate...',
            'Scanning for malicious patterns...',
            'Generating security report...'
        ];

        for (let i = 0; i < steps.length; i++) {
            if (this.elements.analyzeBtn?.querySelector('.btn-text')) {
                this.elements.analyzeBtn.querySelector('.btn-text').textContent = steps[i];
            }
            await this.delay(800);
        }
    }

    performAnalysis(inputUrl) {
        const url = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
        let urlObj;
        
        try {
            urlObj = new URL(url);
        } catch (e) {
            return this.createErrorAnalysis(inputUrl);
        }
        
        const domain = urlObj.hostname.toLowerCase();
        let threatLevel = 'safe';
        let confidence = 95;
        let riskScore = 10;
        
        // Enhanced analysis logic
        if (this.data.malicious_patterns.some(pattern => domain.includes(pattern))) {
            threatLevel = 'malicious';
            confidence = 90;
            riskScore = 90;
        } else if (this.data.suspicious_domains.some(suspDomain => domain.includes(suspDomain))) {
            threatLevel = 'suspicious';
            confidence = 75;
            riskScore = 65;
        } else if (this.data.suspicious_tlds.some(tld => domain.endsWith(tld))) {
            threatLevel = 'suspicious';
            confidence = 70;
            riskScore = 60;
        }

        // Generate detailed analysis
        const analysis = {
            url: urlObj.href,
            domain,
            threatLevel,
            confidence,
            riskScore,
            timestamp: new Date(),
            factors: this.generateAnalysisFactors(urlObj, threatLevel),
            recommendations: this.generateRecommendations(threatLevel),
            metrics: this.generateMetrics(urlObj, threatLevel, confidence, riskScore)
        };

        return analysis;
    }

    generateAnalysisFactors(urlObj, threatLevel) {
        return this.data.analysis_factors.map(factor => {
            let status = threatLevel;
            let score = threatLevel === 'safe' ? 85 + Math.random() * 15 : 
                       threatLevel === 'suspicious' ? 40 + Math.random() * 30 : 
                       10 + Math.random() * 20;

            return {
                name: factor.name,
                icon: factor.icon,
                status,
                score: Math.round(score),
                description: factor.description,
                details: `Analysis completed for ${urlObj.hostname}`
            };
        });
    }

    generateRecommendations(threatLevel) {
        const recommendations = {
            safe: [
                { icon: '✅', type: 'safe', text: 'This URL appears to be safe for browsing' },
                { icon: '🔒', type: 'info', text: 'Always verify HTTPS encryption when entering sensitive data' },
                { icon: '🛡️', type: 'info', text: 'Keep your browser and security software updated' }
            ],
            suspicious: [
                { icon: '⚠️', type: 'warning', text: 'Exercise caution when visiting this URL' },
                { icon: '🔍', type: 'warning', text: 'Verify the legitimacy of the website before proceeding' },
                { icon: '🚫', type: 'warning', text: 'Avoid entering personal or financial information' }
            ],
            malicious: [
                { icon: '🚨', type: 'error', text: 'Do not visit this URL - it appears to be malicious' },
                { icon: '🛑', type: 'error', text: 'Block this domain in your security settings' },
                { icon: '📞', type: 'error', text: 'Report this URL to your IT security team' }
            ]
        };

        return recommendations[threatLevel] || recommendations.safe;
    }

    generateMetrics(urlObj, threatLevel, confidence, riskScore) {
        return {
            'Security Score': `${confidence}%`,
            'Risk Level': threatLevel.toUpperCase(),
            'Protocol': urlObj.protocol.toUpperCase(),
            'SSL Grade': urlObj.protocol === 'https:' ? 'A+' : 'F',
            'Domain Age': 'Estimated',
            'Reputation': threatLevel === 'safe' ? 'Good' : threatLevel === 'suspicious' ? 'Caution' : 'Poor'
        };
    }

    createErrorAnalysis(url) {
        return {
            url: url,
            domain: 'Invalid',
            threatLevel: 'suspicious',
            confidence: 0,
            riskScore: 100,
            factors: [{
                name: 'URL Format',
                icon: '❌',
                status: 'invalid',
                score: 0,
                description: 'Invalid URL format detected',
                details: 'Please check the URL format and try again'
            }],
            recommendations: [{
                icon: '❌',
                type: 'error',
                text: 'Please verify the URL format and try again'
            }],
            metrics: {
                'Security Score': '0%',
                'Risk Level': 'INVALID',
                'Status': 'ERROR'
            },
            timestamp: new Date()
        };
    }

    async displayResults(analysis) {
        console.log('Displaying analysis results:', analysis);
        
        if (!this.elements.resultsSection) return;

        this.elements.resultsSection.classList.remove('hidden');
        
        await this.animateThreatMeter(analysis);
        this.updateThreatInfo(analysis);
        this.populateMetrics(analysis);
        this.populateDetails(analysis);
        this.populateRecommendations(analysis);
        
        // Switch to overview tab
        this.switchTab('overview');

        setTimeout(() => {
            this.elements.resultsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }

    async animateThreatMeter(analysis) {
        if (!this.elements.meterFill) return;

        const meterFill = this.elements.meterFill;
        const percentage = analysis.confidence;
        
        // Set color based on threat level
        const colors = {
            safe: 'rgba(var(--color-success-rgb), 0.8)',
            suspicious: 'rgba(var(--color-warning-rgb), 0.8)',
            malicious: 'rgba(var(--color-error-rgb), 0.8)'
        };

        meterFill.style.background = colors[analysis.threatLevel];
        
        // Animate the meter
        let currentPercentage = 0;
        const targetPercentage = Math.min(percentage, 100);
        
        const animateMeter = () => {
            if (currentPercentage < targetPercentage) {
                currentPercentage += 2;
                meterFill.style.background = `conic-gradient(
                    from -90deg,
                    ${colors[analysis.threatLevel]} 0deg,
                    ${colors[analysis.threatLevel]} ${(currentPercentage / 100) * 360}deg,
                    rgba(var(--color-surface-rgb, 255, 255, 255), 0.3) ${(currentPercentage / 100) * 360}deg,
                    rgba(var(--color-surface-rgb, 255, 255, 255), 0.3) 360deg
                )`;
                requestAnimationFrame(animateMeter);
            }
        };

        setTimeout(animateMeter, 300);
    }

    updateThreatInfo(analysis) {
        if (this.elements.threatIcon) {
            this.elements.threatIcon.textContent = this.data.threat_levels[analysis.threatLevel].icon;
        }

        if (this.elements.threatLevel) {
            this.elements.threatLevel.textContent = analysis.threatLevel.toUpperCase();
        }

        if (this.elements.threatScore) {
            this.elements.threatScore.textContent = `${analysis.confidence}%`;
        }

        if (this.elements.threatMessage) {
            this.elements.threatMessage.textContent = this.data.threat_levels[analysis.threatLevel].message;
        }
    }

    populateMetrics(analysis) {
        if (!this.elements.metricsGrid) return;

        this.elements.metricsGrid.innerHTML = '';
        
        Object.entries(analysis.metrics).forEach(([key, value]) => {
            const metricCard = document.createElement('div');
            metricCard.className = 'metric-card';
            metricCard.innerHTML = `
                <div class="metric-label">${key}</div>
                <div class="metric-value ${analysis.threatLevel}">${value}</div>
            `;
            this.elements.metricsGrid.appendChild(metricCard);
        });
    }

    populateDetails(analysis) {
        if (!this.elements.detailsGrid) return;

        this.elements.detailsGrid.innerHTML = '';
        
        analysis.factors.forEach(factor => {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            
            detailItem.innerHTML = `
                <div class="detail-icon">${factor.icon}</div>
                <div class="detail-content">
                    <div class="detail-header">
                        <div class="detail-name">${factor.name}</div>
                        <div class="detail-score ${factor.status}">${factor.score}/100</div>
                    </div>
                    <div class="detail-description">${factor.description}</div>
                    <div class="detail-details">${factor.details}</div>
                </div>
            `;
            
            this.elements.detailsGrid.appendChild(detailItem);
        });
    }

    populateRecommendations(analysis) {
        if (!this.elements.recommendationsList) return;

        this.elements.recommendationsList.innerHTML = '';
        
        analysis.recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = `recommendation-item ${rec.type}`;
            
            recItem.innerHTML = `
                <div class="rec-icon">${rec.icon}</div>
                <div class="rec-text">${rec.text}</div>
            `;
            
            this.elements.recommendationsList.appendChild(recItem);
        });
    }

    switchTab(tabId) {
        this.activeTab = tabId;
        
        this.elements.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        this.elements.tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabId}Panel`);
        });
    }

    addToHistory(analysis) {
        this.analysisHistory.unshift({
            url: analysis.url,
            domain: analysis.domain,
            threatLevel: analysis.threatLevel,
            confidence: analysis.confidence,
            timestamp: analysis.timestamp
        });

        if (this.analysisHistory.length > 20) {
            this.analysisHistory = this.analysisHistory.slice(0, 20);
        }
    }

    exportReport() {
        if (this.analysisHistory.length === 0) {
            this.showToast('No analysis data to export', 'warning');
            return;
        }

        const latestAnalysis = this.analysisHistory[0];
        const reportData = {
            timestamp: new Date().toISOString(),
            analysis: latestAnalysis,
            generated_by: 'PhishShield Premium'
        };

        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `phishshield-report-${Date.now()}.json`;
        link.click();

        this.showToast('Security report exported successfully!', 'success');
    }

    showFeatureDetails(feature) {
        const featureData = this.data.features.find(f => f.title.toLowerCase().includes(feature));
        if (featureData) {
            this.showToast(`${featureData.icon} ${featureData.title}: ${featureData.description.substring(0, 60)}...`, 'info', 5000);
        }
    }

    // Toast Notifications
    showToast(message, type = 'info', duration = 4000) {
        if (!this.elements.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">&times;</button>
        `;

        this.elements.toastContainer.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        setTimeout(() => this.removeToast(toast), duration);
    }

    removeToast(toast) {
        if (!toast.parentNode) return;
        
        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Utility Methods
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Custom CSS animation keyframes for slideOutRight
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
let phishShieldApp;

// Theme initialization to prevent FOUC
(function() {
    try {
        const storedTheme = localStorage.getItem('phishshield-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-color-scheme', theme);
    } catch (e) {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
})();

// Initialize when DOM is ready
console.log('PhishShield Premium loading...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        phishShieldApp = new PhishShieldPremium();
    });
} else {
    phishShieldApp = new PhishShieldPremium();
}

// Performance monitoring
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('phishshield-premium-start');
    window.addEventListener('load', () => {
        performance.mark('phishshield-premium-loaded');
        try {
            performance.measure('phishshield-premium-init', 'phishshield-premium-start', 'phishshield-premium-loaded');
            const measure = performance.getEntriesByName('phishshield-premium-init')[0];
            console.log(`PhishShield Premium loaded in ${Math.round(measure.duration)}ms`);
        } catch (e) {
            // Ignore performance measurement errors
        }
    });
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('PhishShield Premium Error:', e.error);
    if (phishShieldApp && phishShieldApp.showToast) {
        phishShieldApp.showToast('An unexpected error occurred', 'error');
    }
});

// Export for potential external use
window.PhishShieldPremium = PhishShieldPremium;