// Career Pathfinder AI - Main Application Script

// Configuration - These will be overridden by environment variables
const CONFIG = {
    ORCHESTRATION_ID: process.env.ORCHESTRATION_ID || "d2d2f09f524a41859fd911d3b92de4b3_aee640d0-49e2-43d8-84fb-19f43a8a2e6a",
    HOST_URL: process.env.HOST_URL || "https://jp-tok.watson-orchestrate.cloud.ibm.com",
    AGENT_ID: process.env.AGENT_ID || "ab8c2087-b557-4fe5-af28-6eb64747729b",
    AGENT_ENVIRONMENT_ID: process.env.AGENT_ENVIRONMENT_ID || "91d3aeb7-6530-429e-896f-783d6492fbe9"
};

// Initialize IBM Watsonx Chatbot
function initializeChatbot() {
    console.log('Initializing Career Pathfinder AI...');
    
    window.wxOConfiguration = {
        orchestrationID: CONFIG.ORCHESTRATION_ID,
        hostURL: CONFIG.HOST_URL,
        rootElementID: "chat-root",
        deploymentPlatform: "ibmcloud",
        crn: "crn:v1:bluemix:public:watsonx-orchestrate:jp-tok:a/d2d2f09f524a41859fd911d3b92de4b3:aee640d0-49e2-43d8-84fb-19f43a8a2e6a::",
        chatOptions: {
            agentId: CONFIG.AGENT_ID,
            agentEnvironmentId: CONFIG.AGENT_ENVIRONMENT_ID
        },
        layout: {
            form: 'float',
            width: '100%',
            height: '100%',
            showOrchestrateHeader: true
        },
        style: {
            headerColor: '#2563eb',
            userMessageBackgroundColor: '#3b82f6',
            primaryColor: '#2563eb',
            showBackgroundGradient: true
        },
        showLauncher: true
    };

    // Load chatbot script
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = `${CONFIG.HOST_URL}/wxochat/wxoLoader.js?embed=true`;
        
        script.onload = () => {
            console.log('Chatbot script loaded successfully');
            if (typeof wxoLoader !== 'undefined') {
                try {
                    wxoLoader.init();
                    console.log('✅ Career Pathfinder AI initialized successfully');
                    showChatbotReady();
                } catch (error) {
                    console.error('Error initializing wxoLoader:', error);
                    showSecurityError();
                }
            } else {
                console.error('wxoLoader not found');
                showSecurityError();
            }
        };
        
        script.onerror = (error) => {
            console.error('Failed to load chatbot script:', error);
            showSecurityError();
        };
        
        document.head.appendChild(script);
    }, 1500);
}

// Show chatbot ready state
function showChatbotReady() {
    console.log('Career Pathfinder AI is ready for career guidance!');
}

// Show enhanced loading state
function showLoadingState() {
    const chatRoot = document.getElementById('chat-root');
    if (chatRoot) {
        chatRoot.innerHTML = `
            <div class="loading-state">
                <div class="loading-content">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                    <h3>Starting Career Pathfinder AI</h3>
                    <p>Loading your career development assistant...</p>
                    <div class="loading-animation">
                        <div class="loading-bar"></div>
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">
                        Powered by IBM Watsonx
                    </div>
                </div>
            </div>
        `;
    }
}

// Show security configuration error
function showSecurityError() {
    const chatRoot = document.getElementById('chat-root');
    if (chatRoot) {
        chatRoot.innerHTML = `
            <div class="error-state">
                <div class="error-content">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
                    <h3>Security Configuration Required</h3>
                    <p>Your IBM Watsonx embedded chat requires security configuration.</p>
                    <button class="retry-button" onclick="window.location.reload()">
                        🔄 Refresh After Configuration
                    </button>
                    <div style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.7;">
                        Check your IBM Watsonx security settings
                    </div>
                </div>
            </div>
        `;
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.tool-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Tool interaction examples
function initializeToolInteractions() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const tool = this.getAttribute('data-tool');
            let message = '';
            
            if (tool === 'career') {
                message = '💡 Try asking: "Create a career path from my current role to senior positions"';
            } else if (tool === 'resume') {
                message = '💡 Try asking: "Analyze how my skills match a job description"';
            }
            
            if (message) {
                showNotification(message);
            }
        });
    });
}

// Show temporary notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Career Pathfinder AI - Initializing...');
    
    // Show loading state
    showLoadingState();
    
    // Initialize chatbot with delay
    setTimeout(initializeChatbot, 500);
    
    // Initialize other features
    initializeSmoothScrolling();
    initializeAnimations();
    initializeToolInteractions();
    
    console.log('Career Pathfinder AI - All components initialized');
});
