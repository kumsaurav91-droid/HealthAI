// Grab UI elements
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// --- STEP 1: WELCOME MESSAGE ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("HealthAI Assistant Initialized...");
    // This adds your specific welcome message immediately
    addBubble("System Online. I am your HealthAI Assistant. Describe your symptoms or stress levels.", 'bot');
});

// --- STEP 2: SEND MESSAGE LOGIC ---
async function sendMsg() {
    const val = chatInput.value.trim();
    if (!val) return; 

    addBubble(val, 'user');
    chatInput.value = '';

    // Create a unique ID for the loading bubble
    const loadingId = "loading-" + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.className = "flex justify-start mb-4 animate-pulse";
    loadingDiv.innerHTML = `<div class="p-3 rounded-xl bg-slate-800 text-white text-[10px] uppercase tracking-widest border border-slate-700">Analyzing...</div>`;
    
    chatWindow.appendChild(loadingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: val })
        });

        if (!response.ok) throw new Error('Server error');

        const data = await response.json();
        
        // --- SAFE REMOVAL START ---
        const loader = document.getElementById(loadingId);
        if (loader) {
            loader.remove(); // Only remove if it actually exists
        }
        // --- SAFE REMOVAL END ---
        
        const beautifulReply = marked.parse(data.reply); 
        addBubble(beautifulReply, 'bot', true);

        // Score Multiplier (to fix the 0.8% problem)
        let mh = data.mhScore || 0;
        let ph = data.phScore || 0;
        if (mh > 0 && mh <= 1.0) mh = Math.round(mh * 100);
        if (ph > 0 && ph <= 1.0) ph = Math.round(ph * 100);

        updateUI('mh', mh, data.color);
        updateUI('ph', ph, data.color);

    } catch (e) {
        console.error("Fetch error:", e);
        // Safety check in the catch block too
        const loader = document.getElementById(loadingId);
        if (loader) loader.remove();
        
        addBubble("I encountered an error. Please try again later.", 'bot');
    }
}

// --- HELPER FUNCTIONS ---

function addBubble(text, sender, isHtml = false) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`;
    
    const bubble = document.createElement('div');
    bubble.className = `p-4 rounded-2xl max-w-[85%] text-sm border shadow-lg ${
        sender === 'user' 
        ? 'bg-blue-600 border-blue-500 text-white ml-auto' 
        : 'bg-slate-900 border-slate-800 text-slate-300 ai-formatted-text'
    }`;
    
    // Set content (HTML for bot, Text for user)
    if (isHtml) {
        bubble.innerHTML = text;
    } else {
        bubble.innerText = text;
    }

    wrapper.appendChild(bubble);
    chatWindow.appendChild(wrapper);
    
    // Auto-scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateUI(type, perc, col) {
    const bar = document.getElementById(`${type}-bar`); // Looks for 'mh-bar' or 'ph-bar'
    const lbl = document.getElementById(`${type}-label`);

    if (bar && lbl) {
        // Force the width change
        bar.style.width = perc + "%";
        lbl.innerText = perc + "%";

        const colorMap = { 'RED': '#ef4444', 'ORANGE': '#f97316', 'GREEN': '#22c55e' };
        const hex = colorMap[col] || '#3b82f6';
        
        bar.style.backgroundColor = hex;
        lbl.style.color = hex;
    }
}

// Allow "Enter" key to send message
chatInput.addEventListener("keypress", (e) => { 
    if(e.key === "Enter") {
        e.preventDefault(); // Prevent page refresh
        sendMsg(); 
    }
});