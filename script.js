// Read environment variables from Vite build (Vercel injects them)
const ORCHESTRATION_ID = import.meta.env.VITE_ORCHESTRATION_ID;
const HOST_URL = import.meta.env.VITE_HOST_URL;
const AGENT_ID = import.meta.env.VITE_AGENT_ID;
const AGENT_ENVIRONMENT_ID = import.meta.env.VITE_AGENT_ENVIRONMENT_ID;

// Initialize IBM Watsonx Chatbot
function initializeChatbot() {
    window.wxOConfiguration = {
        orchestrationID: ORCHESTRATION_ID,
        hostURL: HOST_URL,
        rootElementID: "chat-root",
        deploymentPlatform: "ibmcloud",
        crn: `crn:v1:bluemix:public:watsonx-orchestrate:${HOST_URL.includes("jp-tok") ? "jp-tok" : ""}:a/${ORCHESTRATION_ID}::`,
        chatOptions: {
            agentId: AGENT_ID,
            agentEnvironmentId: AGENT_ENVIRONMENT_ID
        }
    };

    setTimeout(() => {
        const script = document.createElement("script");
        script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;

        script.onload = () => {
            if (typeof wxoLoader !== "undefined") {
                wxoLoader.init();
                console.log("Chatbot initialized");
            }
        };

        script.onerror = () => console.error("Failed to load chatbot");

        document.head.appendChild(script);
    }, 500);
}

// Smooth scrolling and initialization
document.addEventListener("DOMContentLoaded", () => {
    initializeChatbot();

    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const t = document.querySelector(link.getAttribute("href"));
            if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const chatRoot = document.getElementById("chat-root");
    if (chatRoot) {
        chatRoot.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f8fafc;color:#64748b;">
                <div style="text-align:center;">
                    <h3>Loading AI...</h3>
                </div>
            </div>
        `;
    }
});

// Intersection Observer animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".tool-card, .feature-item");
    items.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(el);
    });
});
