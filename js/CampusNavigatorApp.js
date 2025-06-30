// Main application class
class CampusNavigatorApp {
    constructor() {
        this.currentPage = 'home';
        this.isAdminAuthenticated = false;
        this.adminPassword = 'ictuniversity2025';
        
        // Initialize core components
        this.analytics = new Analytics();
        this.roomDataManager = new RoomDataManager();
        this.mapRenderer = new MapRenderer(this.analytics, this.roomDataManager);
        this.roomInfoPanel = new RoomInfoPanel(this.roomDataManager, this.analytics);
        this.adminDashboard = new AdminDashboard(this.analytics);
        this.adminRoomManager = new AdminRoomManager(this.roomDataManager, this.analytics);
        
        this.init();
    }

    init() {
        this.loadMapContent();
        this.setupEventListeners();
        this.analytics.trackPageView('home');
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Track navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const onclick = e.target.getAttribute('onclick');
                if (onclick) {
                    const page = onclick.match(/'([^']+)'/)?.[1];
                    if (page) {
                        this.analytics.trackPageView(page);
                    }
                }
            });
        });

        // Track CTA button clicks
        document.querySelector('.cta-button')?.addEventListener('click', () => {
            this.analytics.trackEvent('cta_click', 'Explore Room Map button clicked');
        });

        // Setup admin navigation
        document.getElementById('admin-nav-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleAdminAccess();
        });
    }

    initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .bounce-in').forEach(el => {
            observer.observe(el);
        });
    }

    loadMapContent() {
        this.mapRenderer.renderMap();
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find the clicked nav link and make it active
        const clickedLink = event?.target?.closest('.nav-link');
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
        
        this.currentPage = pageId;
        
        // Update admin dashboard when switching to admin page
        if (pageId === 'admin') {
            this.adminDashboard.updateDashboard();
        }
    }

    handleAdminAccess() {
        if (this.isAdminAuthenticated) {
            this.showPage('admin');
        } else {
            document.getElementById('admin-login-modal').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('admin-password').focus();
            }, 100);
        }
    }

    validateAdminLogin(event) {
        event.preventDefault();
        const password = document.getElementById('admin-password').value;
        const errorDiv = document.getElementById('login-error');
        
        if (password === this.adminPassword) {
            this.isAdminAuthenticated = true;
            this.closeAdminLogin();
            this.showPage('admin');
            this.analytics.trackEvent('admin_login', 'Admin successfully logged in');
            this.showNotification('Welcome to Admin Dashboard! 🎉', 'success');
        } else {
            errorDiv.style.display = 'block';
            errorDiv.classList.add('shake');
            document.getElementById('admin-password').value = '';
            document.getElementById('admin-password').focus();
            
            setTimeout(() => {
                errorDiv.classList.remove('shake');
            }, 500);
            
            this.analytics.trackEvent('admin_login_failed', 'Failed admin login attempt');
        }
    }

    closeAdminLogin() {
        const modal = document.getElementById('admin-login-modal');
        modal.style.display = 'none';
        document.getElementById('admin-password').value = '';
        document.getElementById('login-error').style.display = 'none';
    }

    logoutAdmin() {
        if (confirm('Are you sure you want to logout from admin dashboard?')) {
            this.isAdminAuthenticated = false;
            this.showPage('home');
            this.analytics.trackEvent('admin_logout', 'Admin logged out');
            this.showNotification('Logged out successfully! 👋', 'info');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} notification-enter`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-text">${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: '250px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)'
        });

        const colors = {
            success: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            error: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
            warning: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
            info: 'linear-gradient(135deg, #17a2b8 0%, #667eea 100%)'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('notification-enter');
            notification.classList.add('notification-exit');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}