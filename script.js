// Initialize IBM Watsonx Chatbot
function initializeChatbot() {
    window.wxOConfiguration = {
        orchestrationID: "d2d2f09f524a41859fd911d3b92de4b3_aee640d0-49e2-43d8-84fb-19f43a8a2e6a",
        hostURL: "https://jp-tok.watson-orchestrate.cloud.ibm.com",
        rootElementID: "chat-root",
        deploymentPlatform: "ibmcloud",
        crn: "crn:v1:bluemix:public:watsonx-orchestrate:jp-tok:a/d2d2f09f524a41859fd911d3b92de4b3:aee640d0-49e2-43d8-84fb-19f43a8a2e6a::",
        chatOptions: {
            agentId: "ab8c2087-b557-4fe5-af28-6eb64747729b",
            agentEnvironmentId: "91d3aeb7-6530-429e-896f-783d6492fbe9"
        }
    };

    // Load chatbot script
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
        script.onload = () => {
            if (typeof wxoLoader !== 'undefined') {
                wxoLoader.init();
                console.log('Career Pathfinder AI initialized successfully');
            }
        };
        script.onerror = (error) => {
            console.error('Failed to load chatbot:', error);
        };
        document.head.appendChild(script);
    }, 1000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    initializeChatbot();
    
    // Smooth scrolling
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
    
    // Add loading state
    const chatRoot = document.getElementById('chat-root');
    if (chatRoot) {
        chatRoot.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8fafc; color: #64748b;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                    <h3>Loading Career Pathfinder AI...</h3>
                    <p>Your career development assistant is starting up</p>
                </div>
            </div>
        `;
    }
});

// Add intersection observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.tool-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});