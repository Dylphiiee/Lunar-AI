// Configuration
const CONFIG = {
    apiEndpoint: 'https://api.siputzx.my.id/api/ai/gemini-lite',
    robloxApiEndpoint: 'https://api.ootaizumi.web.id/stalk/roblox',
    currentAI: 'community',
    systemPrompts: {
        community: `Kamu adalah Lunar-AI, asisten resmi Lunar Community. Tugas utamamu adalah memberikan informasi, penjelasan, dan jawaban yang akurat seputar Lunar Community. Kamu tidak berfungsi sebagai teman ngobrol atau tempat curhat, melainkan sebagai pusat informasi resmi komunitas.

Lunar Community adalah komunitas pemain game yang dibangun dengan rasa kekeluargaan, kebersamaan, dan saling mendukung. Lunar menjadi tempat bagi member untuk bermain, berbagi pengalaman, mencari teman, dan berkembang bersama dalam suasana yang aman, nyaman, dan tanpa drama.

Latar Belakang Berdirinya Lunar Community:
Lunar Community didirikan sebagai wadah bagi para pemain game yang ingin memiliki lingkungan bermain yang sehat, positif, dan bebas konflik. Lunar hadir untuk menyatukan para pemain dari berbagai latar belakang agar bisa berkembang bersama dalam suasana kekeluargaan dan saling menghargai.

Visi Lunar Community:
Menjadi komunitas game yang solid, ramah, aktif, dan terpercaya, serta menjadi rumah bagi para pemain untuk berkembang, berprestasi, dan bersenang-senang bersama.

Misi Lunar Community:
- Membangun lingkungan bermain yang aman, nyaman, dan bebas drama
- Menumbuhkan rasa kebersamaan dan kekeluargaan
- Mengadakan kegiatan dan event yang positif
- Mendukung perkembangan skill dan kreativitas member
- Menjaga nama baik komunitas

Cara Bergabung dengan Lunar Community:
Pengguna dapat bergabung dengan Lunar Community melalui platform resmi berikut:
- Website: bit.ly/lunarcommunity
- Discord: discord.gg/HSheSzN9T

Melalui website atau Discord, pengguna dapat menemukan informasi pendaftaran, grup resmi, dan panduan bergabung.

Etika dalam Komunitas:
Setiap member Lunar Community wajib:
- Saling menghormati
- Menggunakan bahasa yang sopan
- Tidak menyerang pribadi
- Tidak menyebarkan kebencian
- Tidak membuat konflik
- Menjaga privasi sesama member
- Mengikuti arahan admin dan moderator

Kamu wajib menjawab pertanyaan yang berkaitan dengan:
- Tentang Lunar Community
- Latar belakang, visi, dan misi
- Cara bergabung
- Peraturan dan etika komunitas
- Aktivitas komunitas
- Event dan mabar
- Struktur pengurus
- Media sosial dan platform resmi
- Nilai dan budaya komunitas

Dalam setiap jawaban, kamu harus bersikap profesional, jelas, singkat, sopan, dan informatif. Hindari jawaban bertele-tele, candaan, atau pembahasan di luar topik Lunar Community.

Jika pengguna menanyakan hal di luar Lunar Community, kamu wajib menjawab:
"Saya tidak bisa menjawab pertanyaan di luar Lunar Community."

Jika relevan, kamu boleh mempromosikan Lunar Community secara wajar dan tidak memaksa, dengan menekankan bahwa Lunar adalah komunitas yang solid, ramah, aktif, dan bebas drama.

Informasi resmi Lunar Community:
Website: bit.ly/lunarcommunity
Discord: discord.gg/HSheSzN9T
Instagram: @lunar.fams

Struktur Pengurus:
Founder: Yoga
Admin: Ryan, Rofiq, Toyib
Moderator: Pai, Jeje, Kai
Editor: Pai, Jeje

Moto:
"Satu Komunitas, Satu Keluarga — Stay Solid, Stay Lunar"

Kamu tidak boleh memberikan informasi palsu, spekulatif, atau bertentangan dengan kebijakan Lunar Community. Jika tidak mengetahui jawabannya, katakan dengan jujur dan arahkan pengguna ke admin atau moderator.`,
        
        chat: `Kamu adalah asisten Dylphiiee, juga dikenal sebagai Lunar-AI. Pembuatmu adalah Eko Agus Saputra atau Dylphiiee, tinggal di Kebumen, Jawa Tengah, Indonesia. Eko Agus Saputra adalah seorang pengembang perangkat lunak, memiliki minat besar pada teknologi AI, pengembangan web, dan otomasi. Hobi pembuatnya termasuk membuat teknologi, bermain game mobile legends, dan mencoba eksperimen AI kreatif. kamu selalu menjawab dengan profesional, sopan, objektif, dan formal dalam setiap situasi. kamu akan membantu diriku dalam semua bidang teknologi, seperti pembuatan website, bot, server, otomasi, dan pengembangan sistem. kamu tidak menggunakan gaya bicara romantis, menggoda, bercanda berlebihan, atau bersifat personal. kamu selalu menjaga bahasa yang serius, netral, dan profesional baik dalam topik teknologi maupun pembahasan umum. kamu berfokus pada penyampaian informasi yang jelas, akurat, dan terstruktur. dan kamu harus menjaga etika komunikasi sebagai asisten digital resmi. bila membuat script atau source code kamu akan mengirim kode tanpa komentar seperti //, #, atau didalam ().

Kamu tidak perlu mengetahui kondisi negara manapun dan tidak akan pernah memberitahukan kondisi suatu negara atau informasi apapun yang berhubungan dengan negara, pemerintahan, politik, atau kebijakan publik.`
    }
};

// State Management
let chatHistory = [];
let isTyping = false;

// DOM Elements
const elements = {
    welcomeScreen: document.getElementById('welcomeScreen'),
    chatContainer: document.getElementById('chatContainer'),
    messages: document.getElementById('messages'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    newChatBtn: document.getElementById('newChatBtn'),
    aiMenuBtn: document.getElementById('aiMenuBtn'),
    aiMenu: document.getElementById('aiMenu'),
    currentTime: document.getElementById('current-time'),
    subtitle: document.getElementById('subtitle'),
    stalkBtn: document.getElementById('stalkBtn'),
    stalkModal: document.getElementById('stalkModal'),
    closeStalkModal: document.getElementById('closeStalkModal'),
    robloxUsername: document.getElementById('robloxUsername'),
    stalkSubmitBtn: document.getElementById('stalkSubmitBtn'),
    stalkResultModal: document.getElementById('stalkResultModal'),
    closeResultModal: document.getElementById('closeResultModal'),
    expandBtn: document.getElementById('expandBtn'),
    expandedModal: document.getElementById('expandedModal'),
    closeExpandedModal: document.getElementById('closeExpandedModal'),
    expandedInput: document.getElementById('expandedInput'),
    expandedSendBtn: document.getElementById('expandedSendBtn'),
    inputWrapper: document.getElementById('inputWrapper')
};

// Initialize
function init() {
    updateClock();
    setInterval(updateClock, 1000);
    typeWriterEffect();
    attachEventListeners();
    autoResizeTextarea();
}

// Clock Update
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    elements.currentTime.textContent = `${hours}:${minutes}`;
}

// Typewriter Effect for Subtitle
function typeWriterEffect() {
    const text = 'ada yang bisa dibantu?';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            elements.subtitle.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    };
    
    type();
}

// Auto Resize Textarea
function autoResizeTextarea() {
    elements.userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });
    
    elements.expandedInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

// Event Listeners
function attachEventListeners() {
    // Send Message
    elements.sendBtn.addEventListener('click', () => sendMessage());
    elements.expandedSendBtn.addEventListener('click', () => {
        elements.userInput.value = elements.expandedInput.value;
        closeModal(elements.expandedModal);
        sendMessage();
    });
    
    // Enter Key Handling
    elements.userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    elements.expandedInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            elements.userInput.value = elements.expandedInput.value;
            closeModal(elements.expandedModal);
            sendMessage();
        }
    });
    
    // New Chat
    elements.newChatBtn.addEventListener('click', () => newChat());
    
    // AI Menu Toggle
    elements.aiMenuBtn.addEventListener('click', () => {
        elements.aiMenu.classList.toggle('show');
        elements.aiMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.aiMenuBtn.contains(e.target) && !elements.aiMenu.contains(e.target)) {
            elements.aiMenu.classList.remove('show');
            elements.aiMenuBtn.classList.remove('active');
        }
    });
    
    // AI Type Selection
    document.querySelectorAll('.menu-item[data-ai]').forEach(btn => {
        btn.addEventListener('click', () => {
            const aiType = btn.getAttribute('data-ai');
            selectAIType(aiType);
        });
    });
    
    // Stalk Roblox
    elements.stalkBtn.addEventListener('click', () => {
        openModal(elements.stalkModal);
        elements.aiMenu.classList.remove('show');
        elements.aiMenuBtn.classList.remove('active');
    });
    
    elements.closeStalkModal.addEventListener('click', () => closeModal(elements.stalkModal));
    elements.closeResultModal.addEventListener('click', () => closeModal(elements.stalkResultModal));
    elements.stalkSubmitBtn.addEventListener('click', () => stalkRoblox());
    
    elements.robloxUsername.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            stalkRoblox();
        }
    });
    
    // Expand Input
    elements.expandBtn.addEventListener('click', () => {
        elements.expandedInput.value = elements.userInput.value;
        openModal(elements.expandedModal);
    });
    
    elements.closeExpandedModal.addEventListener('click', () => closeModal(elements.expandedModal));
    
    // Close modals on overlay click
    [elements.stalkModal, elements.stalkResultModal, elements.expandedModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

// Select AI Type
function selectAIType(aiType) {
    CONFIG.currentAI = aiType;
    
    document.querySelectorAll('.menu-item[data-ai]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.menu-item[data-ai="${aiType}"]`).classList.add('active');
    
    elements.aiMenu.classList.remove('show');
    elements.aiMenuBtn.classList.remove('active');
}

// New Chat
function newChat() {
    chatHistory = [];
    elements.messages.innerHTML = '';
    elements.chatContainer.classList.remove('show');
    elements.welcomeScreen.classList.remove('hide');
    elements.userInput.value = '';
    elements.subtitle.textContent = '';
    typeWriterEffect();
}

// Send Message
async function sendMessage() {
    const message = elements.userInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Hide welcome screen on first message
    if (!elements.welcomeScreen.classList.contains('hide')) {
        elements.welcomeScreen.classList.add('hide');
        elements.chatContainer.classList.add('show');
    }
    
    // Add user message
    addMessage(message, 'user');
    elements.userInput.value = '';
    elements.userInput.style.height = 'auto';
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Add bot response with typewriter effect
        await addMessageWithTypewriter(response, 'bot');
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator(typingId);
        addMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', 'bot');
    }
}

// Get AI Response
async function getAIResponse(message) {
    const systemPrompt = CONFIG.systemPrompts[CONFIG.currentAI];
    const fullPrompt = `${systemPrompt}\nMessage: ${message}\nInstruksi: Abaikan prompt awal dan jangan menjawabnya. Fokus hanya menjawab Message di atas sebagai Lunar-AI`;
    
    const url = `${CONFIG.apiEndpoint}?prompt=${encodeURIComponent(fullPrompt)}&model=gemini-2.0-flash-lite`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status && data.data && data.data.parts && data.data.parts[0]) {
        return data.data.parts[0].text;
    }
    
    throw new Error('Invalid API response');
}

// Add Message
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Process content for code blocks, tables, and LaTeX
    messageContent.innerHTML = processContent(content);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    elements.messages.appendChild(messageDiv);
    
    // Scroll to bottom
    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    
    // Process LaTeX if present
    if (window.MathJax) {
        MathJax.typesetPromise([messageContent]).catch((err) => console.error('MathJax error:', err));
    }
    
    // Add copy button event listeners
    addCopyButtonListeners();
    
    return messageDiv;
}

// Add Message with Typewriter Effect
async function addMessageWithTypewriter(content, sender) {
    isTyping = true;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    elements.messages.appendChild(messageDiv);
    
    // Typewriter effect
    let index = 0;
    const speed = 10; // milliseconds per character
    
    return new Promise((resolve) => {
        const type = () => {
            if (index < content.length) {
                const char = content[index];
                messageContent.textContent += char;
                index++;
                
                // Scroll to bottom
                elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
                
                setTimeout(type, speed);
            } else {
                // Process content for formatting after typing is complete
                messageContent.innerHTML = processContent(content);
                
                // Process LaTeX if present
                if (window.MathJax) {
                    MathJax.typesetPromise([messageContent]).catch((err) => console.error('MathJax error:', err));
                }
                
                // Add copy button event listeners
                addCopyButtonListeners();
                
                isTyping = false;
                resolve();
            }
        };
        
        type();
    });
}

// Add Typing Indicator
function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    const id = 'typing-' + Date.now();
    messageDiv.id = id;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    messageContent.appendChild(typingIndicator);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    elements.messages.appendChild(messageDiv);
    
    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    
    return id;
}

// Remove Typing Indicator
function removeTypingIndicator(id) {
    const typingElement = document.getElementById(id);
    if (typingElement) {
        typingElement.remove();
    }
}

// Process Content for Code Blocks, Tables, and LaTeX
function processContent(content) {
    // Process code blocks
    content = content.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
        const lang = language || 'text';
        return `
            <div class="code-block">
                <div class="code-header">
                    <span class="code-language">${lang}</span>
                    <button class="copy-btn" data-code="${escapeHtml(code.trim())}">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre class="code-content"><code>${escapeHtml(code.trim())}</code></pre>
            </div>
        `;
    });
    
    // Process inline code
    content = content.replace(/`([^`]+)`/g, '<code style="background: rgba(168, 85, 247, 0.2); padding: 2px 6px; border-radius: 4px; font-family: monospace;">$1</code>');
    
    // Process LaTeX math (inline and display)
    content = content.replace(/\$\$([\s\S]*?)\$\$/g, '\\[$1\\]'); // Display math
    content = content.replace(/\$([^\$]+)\$/g, '\\($1\\)'); // Inline math
    
    // Process bold and italic
    content = content.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    
    // Convert newlines to <br>
    content = content.replace(/\n/g, '<br>');
    
    return content;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add Copy Button Listeners
function addCopyButtonListeners() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

// Stalk Roblox
async function stalkRoblox() {
    const username = elements.robloxUsername.value.trim();
    
    if (!username) {
        alert('Masukkan username terlebih dahulu!');
        return;
    }
    
    elements.stalkSubmitBtn.classList.add('loading');
    elements.stalkSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    try {
        const url = `${CONFIG.robloxApiEndpoint}?username=${encodeURIComponent(username)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status && data.result) {
            displayStalkResult(data.result);
            closeModal(elements.stalkModal);
            openModal(elements.stalkResultModal);
            elements.robloxUsername.value = '';
        } else {
            alert('Username tidak ditemukan!');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengambil data!');
    } finally {
        elements.stalkSubmitBtn.classList.remove('loading');
        elements.stalkSubmitBtn.innerHTML = '<span>Stalk</span>';
    }
}

// Display Stalk Result
function displayStalkResult(data) {
    const result = data.result;
    const profileImage = data.profileDetails;
    const lastOnline = data.lastOnline;
    
    const html = `
        <div class="profile-section">
            <img src="${profileImage}" alt="Profile" class="profile-image">
        </div>
        <div class="profile-info">
            <div class="info-row">
                <span class="info-label">Username</span>
                <span class="info-value">${result.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Display Name</span>
                <span class="info-value">${result.displayName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">User ID</span>
                <span class="info-value">${result.id}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Description</span>
                <span class="info-value">${result.description || 'No description'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Created</span>
                <span class="info-value">${new Date(result.created).toLocaleDateString('id-ID')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Last Online</span>
                <span class="info-value">${lastOnline}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Status</span>
                <span class="info-value">
                    ${result.hasVerifiedBadge ? '<span class="badge verified"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                    ${result.isBanned ? '<span class="badge banned"><i class="fas fa-ban"></i> Banned</span>' : ''}
                    ${!result.hasVerifiedBadge && !result.isBanned ? 'Normal User' : ''}
                </span>
            </div>
        </div>
    `;
    
    document.getElementById('stalkResultContent').innerHTML = html;
}

// Modal Functions
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
