document.addEventListener('DOMContentLoaded', function() {
    // State management
    const state = {
        currentAI: 'lunar-ai-community',
        chatHistory: [],
        isTyping: false,
        isTitleVisible: true,
        aiModeOpen: false
    };

    // DOM Elements
    const elements = {
        // Main containers
        titleContainer: document.getElementById('title-container'),
        typewriterText: document.getElementById('typewriter-text'),
        chatContainer: document.getElementById('chat-container'),
        
        // Input elements
        messageInput: document.getElementById('message-input'),
        sendBtn: document.getElementById('send-message-btn'),
        
        // AI Mode elements
        toggleAIMode: document.getElementById('toggle-ai-mode'),
        aiModeContainer: document.getElementById('ai-mode-container'),
        closeAIMode: document.getElementById('close-ai-mode'),
        aiModeCards: document.querySelectorAll('.ai-mode-card'),
        
        // Roblox elements
        robloxModal: document.getElementById('roblox-modal'),
        robloxResultModal: document.getElementById('roblox-result-modal'),
        closeRobloxModal: document.getElementById('close-roblox-modal'),
        closeResultModal: document.getElementById('close-result-modal'),
        startStalkBtn: document.getElementById('start-stalk-btn'),
        robloxUsernameInput: document.getElementById('roblox-username'),
        
        // Header elements
        newChatBtn: document.getElementById('new-chat-btn'),
        currentTime: document.getElementById('current-time'),
        
        // Utility elements
        expandInputBtn: document.getElementById('expand-input')
    };

    // Initialize application
    init();

    function init() {
        startTypewriter();
        updateTime();
        setInterval(updateTime, 1000);
        setupEventListeners();
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }

    function setupEventListeners() {
        // Chat functionality
        elements.sendBtn.addEventListener('click', sendMessage);
        elements.messageInput.addEventListener('keydown', handleMessageInput);
        elements.messageInput.addEventListener('input', autoResizeTextarea);
        
        // AI Mode functionality
        elements.toggleAIMode.addEventListener('click', toggleAIMode);
        elements.closeAIMode.addEventListener('click', toggleAIMode);
        
        // AI Mode card selection
        elements.aiModeCards.forEach(card => {
            card.addEventListener('click', function() {
                const mode = this.dataset.mode;
                selectAIMode(mode);
            });
        });
        
        // Roblox functionality
        elements.startStalkBtn.addEventListener('click', stalkRobloxUser);
        elements.closeRobloxModal.addEventListener('click', () => {
            elements.robloxModal.classList.remove('active');
        });
        elements.closeResultModal.addEventListener('click', () => {
            elements.robloxResultModal.classList.remove('active');
        });
        
        // Roblox username input - Enter key support
        elements.robloxUsernameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                stalkRobloxUser();
            }
        });
        
        // Close modals when clicking outside
        [elements.robloxModal, elements.robloxResultModal].forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        });
        
        // New chat functionality
        elements.newChatBtn.addEventListener('click', startNewChat);
        
        // Expand input functionality
        elements.expandInputBtn.addEventListener('click', toggleInputExpand);
    }

    function startTypewriter() {
        const text = "Apa yang anda ingin tahu?";
        let i = 0;
        const speed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                elements.typewriterText.innerHTML = text.substring(0, i + 1) + 
                    '<span class="typewriter-cursor"></span>';
                i++;
                setTimeout(typeWriter, speed);
            } else {
                elements.typewriterText.innerHTML = text + 
                    '<span class="typewriter-cursor"></span>';
            }
        }
        
        typeWriter();
    }

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        elements.currentTime.textContent = timeString;
    }

    function handleMessageInput(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function autoResizeTextarea() {
        const textarea = elements.messageInput;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    function toggleInputExpand() {
        elements.messageInput.classList.toggle('expanded');
        const icon = elements.expandInputBtn.querySelector('i');
        if (elements.messageInput.classList.contains('expanded')) {
            icon.classList.remove('fa-expand-alt');
            icon.classList.add('fa-compress-alt');
        } else {
            icon.classList.remove('fa-compress-alt');
            icon.classList.add('fa-expand-alt');
        }
        autoResizeTextarea();
    }

    function toggleAIMode() {
        state.aiModeOpen = !state.aiModeOpen;
        elements.aiModeContainer.classList.toggle('active');
        
        const icon = elements.toggleAIMode.querySelector('i');
        if (state.aiModeOpen) {
            icon.style.transform = 'rotate(45deg)';
        } else {
            icon.style.transform = 'rotate(0)';
        }
    }

    function selectAIMode(mode) {
        if (mode === 'stalk-roblox') {
            elements.robloxModal.classList.add('active');
            toggleAIMode();
            return;
        }
        
        state.currentAI = mode;
        
        elements.aiModeCards.forEach(card => {
            if (card.dataset.mode === mode) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        const aiName = mode === 'lunar-ai-community' 
            ? 'LUNAR-AI Community' 
            : 'LUNAR-AI Chat';
        addMessage(`Mode AI berubah ke: ${aiName}`, 'system');
        
        toggleAIMode();
    }

    async function stalkRobloxUser() {
        const username = elements.robloxUsernameInput.value.trim();
        
        if (!username) {
            alert('Masukkan username Roblox terlebih dahulu');
            return;
        }
        
        const loadingMsg = addMessage('Mencari data pengguna Roblox...', 'bot');
        
        try {
            const response = await fetch(`https://api.ootaizumi.web.id/stalk/roblox?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            
            if (data.status && data.result) {
                loadingMsg.remove();
                showRobloxResult(data.result);
                elements.robloxModal.classList.remove('active');
                addMessage(`Berhasil mendapatkan data: ${data.result.result.displayName || data.result.result.name}`, 'system');
            } else {
                throw new Error(data.message || 'Gagal mengambil data');
            }
        } catch (error) {
            console.error('Error stalking Roblox user:', error);
            loadingMsg.remove();
            addMessage('Gagal mengambil data pengguna. Pastikan username benar.', 'bot');
        }
    }

    function showRobloxResult(data) {
        const result = data.result;
        
        document.getElementById('roblox-avatar').src = data.profileDetails;
        document.getElementById('roblox-username-result').textContent = result.name;
        document.getElementById('roblox-displayname').textContent = result.displayName || 'Tidak ada';
        document.getElementById('roblox-id').textContent = result.id;
        
        const createdDate = new Date(result.created);
        document.getElementById('roblox-created').textContent = createdDate.toLocaleDateString('id-ID');
        
        const statusElement = document.getElementById('roblox-status');
        statusElement.textContent = result.isBanned ? 'Banned' : 'Aktif';
        statusElement.className = result.isBanned ? 'detail-value status-banned' : 'detail-value status-active';
        
        document.getElementById('roblox-lastonline').textContent = data.lastOnline || 'Tidak diketahui';
        document.getElementById('roblox-description').textContent = result.description || 'Tidak ada deskripsi';
        
        elements.robloxResultModal.classList.add('active');
    }

    function startNewChat() {
        if (confirm('Mulai chat baru? Riwayat chat saat ini akan dihapus.')) {
            state.chatHistory = [];
            elements.chatContainer.innerHTML = '';
            elements.chatContainer.classList.remove('active');
            elements.titleContainer.classList.remove('hidden');
            state.isTitleVisible = true;
        }
    }

    async function sendMessage() {
        const message = elements.messageInput.value.trim();
        
        if (!message || state.isTyping) return;
        
        if (state.isTitleVisible) {
            elements.titleContainer.classList.add('hidden');
            elements.chatContainer.classList.add('active');
            state.isTitleVisible = false;
        }
        
        addMessage(message, 'user');
        
        elements.messageInput.value = '';
        autoResizeTextarea();
        
        const thinkingMsg = showThinkingAnimation();
        state.isTyping = true;
        
        try {
            const prompt = buildPrompt(message);
            const response = await fetchAIResponse(prompt);
            
            thinkingMsg.remove();
            state.isTyping = false;
            
            if (response) {
                await displayBotResponse(response);
            } else {
                throw new Error('Tidak ada response dari AI');
            }
        } catch (error) {
            console.error('Error:', error);
            thinkingMsg.remove();
            state.isTyping = false;
            addMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', 'bot');
        }
    }

    function buildPrompt(message) {
        if (currentAI === 'lunar-ai-community') {
            prompt = `Kamu adalah Lunar-AI, asisten resmi Lunar Community. Tugas utamamu adalah memberikan informasi, penjelasan, dan jawaban yang akurat seputar Lunar Community. Kamu tidak berfungsi sebagai teman ngobrol atau tempat curhat, melainkan sebagai pusat informasi resmi komunitas.

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

Kamu tidak boleh memberikan informasi palsu, spekulatif, atau bertentangan dengan kebijakan Lunar Community. Jika tidak mengetahui jawabannya, katakan dengan jujur dan arahkan pengguna ke admin atau moderator.

Message: ${message}

Instruksi: Abaikan prompt awal dan fokus hanya menjawab Message di atas sebagai Lunar-AI sesuai fungsi resmi sebagai pusat informasi Lunar Community`;
        } else {
            prompt = `Kamu adalah asisten Dylphiiee, juga dikenal sebagai Lunar-AI. Pembuatmu adalah Eko Agus Saputra atau Dylphiiee, tinggal di Kebumen, Jawa Tengah, Indonesia. Eko Agus Saputra adalah seorang pengembang perangkat lunak, memiliki minat besar pada teknologi AI, pengembangan web, dan otomasi. Hobi pembuatnya termasuk membuat teknologi, bermain game mobile legends, dan mencoba eksperimen AI kreatif. kamu selalu menjawab dengan profesional, sopan, objektif, dan formal dalam setiap situasi. kamu akan membantu diriku dalam semua bidang teknologi, seperti pembuatan website, bot, server, otomasi, dan pengembangan sistem. kamu tidak menggunakan gaya bicara romantis, menggoda, bercanda berlebihan, atau bersifat personal. kamu selalu menjaga bahasa yang serius, netral, dan profesional baik dalam topik teknologi maupun pembahasan umum. kamu berfokus pada penyampaian informasi yang jelas, akurat, dan terstruktur. dan kamu harus menjaga etika komunikasi sebagai asisten digital resmi. bila membuat script atau source code kamu akan mengirim kode tanpa komentar seperti //, #, atau didalam ().

Kamu tidak perlu mengetahui kondisi negara manapun dan tidak akan pernah memberitahukan kondisi suatu negara atau informasi apapun yang berhubungan dengan negara, pemerintahan, politik, atau kebijakan publik.

Message: ${message}

Instruksi: Abaikan prompt awal dan jangan menjawabnya. Fokus hanya menjawab Message di atas sebagai Lunar-AI`;
        }
    }

    async function fetchAIResponse(prompt) {
        try {
            const response = await fetch(`https://api.siputzx.my.id/api/ai/gemini-lite?prompt=${encodeURIComponent(prompt)}&model=gemini-2.0-flash-lite`);
            const data = await response.json();
            
            if (data.status && data.data?.parts?.[0]?.text) {
                return data.data.parts[0].text;
            }
            return null;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const processedContent = processMessageContent(text);
        contentDiv.innerHTML = processedContent;
        
        messageDiv.appendChild(contentDiv);
        elements.chatContainer.appendChild(messageDiv);
        
        elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
        
        state.chatHistory.push({ text, sender, timestamp: new Date() });
        
        setTimeout(() => {
            if (contentDiv.querySelector('pre code')) {
                hljs.highlightAll();
            }
            
            if (window.MathJax) {
                MathJax.typesetPromise([contentDiv]).catch((err) => {
                    console.log('MathJax error:', err);
                });
            }
        }, 100);
        
        return messageDiv;
    }

    function processMessageContent(text) {
        let processed = text;
        
        processed = processed.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
            lang = lang || 'text';
            const escapedCode = escapeHtml(code.trim());
            return `<div class="code-block">
                <div class="code-header">
                    <span class="code-language">${lang.toUpperCase()}</span>
                    <button class="copy-code-btn" onclick="copyToClipboard(this)">Copy</button>
                </div>
                <pre><code class="language-${lang}">${escapedCode}</code></pre>
            </div>`;
        });
        
        processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        processed = processed.replace(/\n/g, '<br>');
        
        processed = processed.replace(/\$\$(.+?)\$\$/g, '\\[$1\\]');
        processed = processed.replace(/\$(.+?)\$/g, '\\($1\\)');
        
        return processed;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function showThinkingAnimation() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'thinking-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'thinking-dot';
            thinkingDiv.appendChild(dot);
        }
        
        elements.chatContainer.appendChild(thinkingDiv);
        elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
        
        return thinkingDiv;
    }

    async function displayBotResponse(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        messageDiv.appendChild(contentDiv);
        
        elements.chatContainer.appendChild(messageDiv);
        
        const processedText = processMessageContent(text);
        let i = 0;
        const typingSpeed = 20;
        
        function typeCharacter() {
            if (i < processedText.length) {
                contentDiv.innerHTML = processedText.substring(0, i + 1);
                i++;
                elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                state.chatHistory.push({ text, sender: 'bot', timestamp: new Date() });
                
                setTimeout(() => {
                    if (contentDiv.querySelector('pre code')) {
                        hljs.highlightAll();
                    }
                    
                    if (window.MathJax) {
                        MathJax.typesetPromise([contentDiv]).catch((err) => {
                            console.log('MathJax error:', err);
                        });
                    }
                }, 100);
            }
        }
        
        await typeCharacter();
    }

    window.copyToClipboard = function(button) {
        const codeBlock = button.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            const originalText = button.textContent;
            button.textContent = '✓ Disalin!';
            button.style.background = 'rgba(0, 255, 136, 0.3)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            button.textContent = '✗ Gagal!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    };
});