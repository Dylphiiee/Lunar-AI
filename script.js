// Lunar AI Chat Application
class LunarAI {
    constructor() {
        this.currentAI = 'community';
        this.chatHistory = [];
        this.isProcessing = false;
        this.isMenuOpen = false;
        
        // AI Prompts
        this.prompts = {
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

Kamu tidak boleh memberikan informasi palsu, spekulatif, atau bertentangan dengan kebijakan Lunar Community. Jika tidak mengetahui jawabannya, katakan dengan jujur dan arahkan pengguna ke admin atau moderator.

Message: {message}

Instruksi: Abaikan prompt awal dan fokus hanya menjawab Message di atas sebagai Lunar-AI sesuai fungsi resmi sebagai pusat informasi Lunar Community.`,

            chat: `Kamu adalah asisten Dylphiiee, juga dikenal sebagai Lunar-AI. Pembuatmu adalah Eko Agus Saputra atau Dylphiiee, tinggal di Kebumen, Jawa Tengah, Indonesia. Eko Agus Saputra adalah seorang pengembang perangkat lunak, memiliki minat besar pada teknologi AI, pengembangan web, dan otomasi. Hobi pembuatnya termasuk membuat teknologi, bermain game mobile legends, dan mencoba eksperimen AI kreatif. kamu selalu menjawab dengan profesional, sopan, objektif, dan formal dalam setiap situasi. kamu akan membantu diriku dalam semua bidang teknologi, seperti pembuatan website, bot, server, otomasi, dan pengembangan sistem. kamu tidak menggunakan gaya bicara romantis, menggoda, bercanda berlebihan, atau bersifat personal. kamu selalu menjaga bahasa yang serius, netral, dan profesional baik dalam topik teknologi maupun pembahasan umum. kamu berfokus pada penyampaian informasi yang jelas, akurat, dan terstruktur. dan kamu harus menjaga etika komunikasi sebagai asisten digital resmi. bila membuat script atau source code kamu akan mengirim kode tanpa komentar seperti //, #, atau didalam ().

Kamu tidak perlu mengetahui kondisi negara manapun dan tidak akan pernah memberitahukan kondisi suatu negara atau informasi apapun yang berhubungan dengan negara, pemerintahan, politik, atau kebijakan publik.

Message: {message}

Instruksi: Abaikan prompt awal dan jangan menjawabnya. Fokus hanya menjawab Message di atas sebagai Lunar-AI`
        };
        
        // Initialize
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.initTypewriter();
        this.updateAIInfo();
        this.addWelcomeMessage();
    }
    
    cacheElements() {
        // UI Elements
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.charCount = document.getElementById('charCount');
        this.currentAIElement = document.getElementById('currentAI');
        this.aiToggle = document.getElementById('aiToggle');
        this.aiTypeMenu = document.getElementById('aiTypeMenu');
        this.closeMenu = document.getElementById('closeMenu');
        this.aiOptions = document.querySelectorAll('.ai-option');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.typewriterText = document.getElementById('typewriterText');
        
        // Modals
        this.robloxModal = document.getElementById('robloxModal');
        this.closeRobloxModal = document.getElementById('closeRobloxModal');
        this.cancelStalk = document.getElementById('cancelStalk');
        this.stalkBtn = document.getElementById('stalkBtn');
        this.robloxUsername = document.getElementById('robloxUsername');
        
        // Command buttons
        this.commandButtons = document.querySelectorAll('.command-btn');
        
        // Loading overlay
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }
    
    setupEventListeners() {
        // Message input
        this.messageInput.addEventListener('input', this.handleInput.bind(this));
        this.messageInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.sendBtn.addEventListener('click', this.sendMessage.bind(this));
        
        // AI type selection
        this.aiToggle.addEventListener('click', this.toggleMenu.bind(this));
        this.closeMenu.addEventListener('click', this.toggleMenu.bind(this));
        this.aiOptions.forEach(option => {
            option.addEventListener('click', () => this.selectAI(option.dataset.type));
        });
        
        // Commands
        this.commandButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleCommand(btn.dataset.command));
        });
        
        // New chat
        this.newChatBtn.addEventListener('click', this.newChat.bind(this));
        
        // Roblox stalker modal
        this.closeRobloxModal.addEventListener('click', () => this.hideModal(this.robloxModal));
        this.cancelStalk.addEventListener('click', () => this.hideModal(this.robloxModal));
        this.stalkBtn.addEventListener('click', this.stalkRoblox.bind(this));
        
        // Close modal on background click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideModal(e.target);
            }
        });
        
        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
                if (this.robloxModal.classList.contains('active')) {
                    this.hideModal(this.robloxModal);
                }
            }
        });
        
        // Auto-focus input
        this.messageInput.focus();
    }
    
    initTypewriter() {
        const text = "Ada yang bisa dibantu?";
        const element = this.typewriterText;
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        
        // Start typing after a delay
        setTimeout(type, 500);
    }
    
    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('ai', 'Halo! Saya Lunar-AI. Ada yang bisa saya bantu?', true);
        }, 1500);
    }
    
    handleInput() {
        const text = this.messageInput.value;
        const count = text.length;
        
        // Update character count
        this.charCount.textContent = `${count}/2000`;
        
        // Auto-resize textarea
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 150) + 'px';
        
        // Enable/disable send button
        this.sendBtn.disabled = count === 0 || count > 2000 || this.isProcessing;
        
        // Update character count color
        if (count > 1800) {
            this.charCount.style.color = '#ff6b6b';
        } else if (count > 1500) {
            this.charCount.style.color = '#ffa726';
        } else {
            this.charCount.style.color = 'var(--text-muted)';
        }
    }
    
    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!this.sendBtn.disabled) {
                this.sendMessage();
            }
        }
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isProcessing) return;
        
        // Clear input
        this.messageInput.value = '';
        this.handleInput();
        
        // Add user message to chat
        this.addMessage('user', message);
        
        // Show thinking animation
        this.showThinking();
        
        // Process AI response
        await this.processAIResponse(message);
    }
    
    async processAIResponse(message) {
        this.isProcessing = true;
        
        try {
            // Get the appropriate prompt
            const prompt = this.prompts[this.currentAI].replace('{message}', message);
            
            // Encode the prompt for URL
            const encodedPrompt = encodeURIComponent(prompt);
            
            // API endpoint
            const apiUrl = `https://api.siputzx.my.id/api/ai/gemini-lite?prompt=${encodedPrompt}&model=gemini-2.0-flash-lite`;
            
            // Call API
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            // Remove thinking animation
            this.hideThinking();
            
            if (data.status && data.data && data.data.parts && data.data.parts[0]) {
                const aiResponse = data.data.parts[0].text;
                
                // Add AI message with typewriter effect
                this.addMessage('ai', aiResponse, true);
            } else {
                throw new Error('Invalid API response');
            }
            
        } catch (error) {
            console.error('Error processing AI response:', error);
            this.hideThinking();
            
            // Show error message
            this.addMessage('ai', 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.', false);
        } finally {
            this.isProcessing = false;
            this.sendBtn.disabled = false;
            this.messageInput.focus();
        }
    }
    
    addMessage(type, content, useTypewriter = false) {
        const messageId = Date.now();
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}-message`;
        messageElement.id = `message-${messageId}`;
        
        const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        let messageContent = content;
        
        // Format code blocks
        messageContent = this.formatCodeBlocks(messageContent);
        
        // Format LaTeX math
        messageContent = this.formatMath(messageContent);
        
        messageElement.innerHTML = `
            <div class="message-header">
                <i class="fas ${type === 'user' ? 'fa-user' : 'fa-robot'}"></i>
                <span>${type === 'user' ? 'Anda' : 'Lunar AI'}</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-content" id="content-${messageId}">
                ${useTypewriter ? '' : messageContent}
            </div>
        `;
        
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add to chat history
        this.chatHistory.push({
            id: messageId,
            type: type,
            content: content,
            timestamp: timestamp
        });
        
        // If using typewriter effect, start typing
        if (useTypewriter) {
            this.typewriterEffect(messageId, content);
        } else {
            // Process copy buttons for code blocks
            setTimeout(() => this.setupCopyButtons(messageId), 100);
        }
    }
    
    formatCodeBlocks(text) {
        // Match code blocks with language specifier
        const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
        
        return text.replace(codeBlockRegex, (match, language, code) => {
            const escapedCode = this.escapeHtml(code.trim());
            return `
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-language">${language}</span>
                        <button class="copy-btn" data-code="${this.escapeHtml(code.trim())}">
                            <i class="fas fa-copy"></i>
                            Salin
                        </button>
                    </div>
                    <div class="code-content">
                        <pre>${escapedCode}</pre>
                    </div>
                </div>
            `;
        });
    }
    
    formatMath(text) {
        // Simple LaTeX detection and formatting
        const mathRegex = /\$(.*?)\$/g;
        
        return text.replace(mathRegex, (match, mathContent) => {
            return `
                <div class="math-block">
                    \\[${mathContent}\\]
                </div>
            `;
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    typewriterEffect(messageId, text) {
        const contentElement = document.getElementById(`content-${messageId}`);
        let index = 0;
        let formattedText = '';
        let inCodeBlock = false;
        let currentLanguage = '';
        let codeContent = '';
        
        const type = () => {
            if (index < text.length) {
                const char = text.charAt(index);
                
                // Handle code block start
                if (!inCodeBlock && text.substring(index, index + 3) === '```') {
                    // Find the language
                    const langMatch = text.substring(index + 3).match(/^(\w+)\n/);
                    if (langMatch) {
                        currentLanguage = langMatch[1];
                        formattedText += `\n<div class="code-block">\n<div class="code-header">\n<span class="code-language">${currentLanguage}</span>\n<button class="copy-btn" data-code=""><i class="fas fa-copy"></i> Salin</button>\n</div>\n<div class="code-content">\n<pre>`;
                        index += 3 + currentLanguage.length + 1; // Skip ```, language, and newline
                        inCodeBlock = true;
                        codeContent = '';
                    }
                }
                // Handle code block end
                else if (inCodeBlock && text.substring(index, index + 3) === '```') {
                    const escapedCode = this.escapeHtml(codeContent.trim());
                    formattedText += escapedCode + '</pre>\n</div>\n</div>';
                    index += 3;
                    inCodeBlock = false;
                    currentLanguage = '';
                    codeContent = '';
                }
                // Inside code block
                else if (inCodeBlock) {
                    codeContent += char;
                    index++;
                }
                // Normal text
                else {
                    // Check for LaTeX math
                    if (char === '$') {
                        const nextDollar = text.indexOf('$', index + 1);
                        if (nextDollar !== -1) {
                            const mathContent = text.substring(index + 1, nextDollar);
                            formattedText += `<div class="math-block">\\[${mathContent}\\]</div>`;
                            index = nextDollar + 1;
                        } else {
                            formattedText += char;
                            index++;
                        }
                    } else {
                        formattedText += char;
                        index++;
                    }
                }
                
                contentElement.innerHTML = formattedText;
                this.scrollToBottom();
                setTimeout(type, 20);
            } else {
                // Setup copy buttons after typing is complete
                this.setupCopyButtons(messageId);
                // Re-render MathJax
                if (typeof MathJax !== 'undefined') {
                    MathJax.typesetPromise([contentElement]);
                }
            }
        };
        
        type();
    }
    
    setupCopyButtons(messageId) {
        const contentElement = document.getElementById(`content-${messageId}`);
        const copyButtons = contentElement.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const code = button.getAttribute('data-code') || 
                            button.parentElement.nextElementSibling.querySelector('pre').textContent;
                
                try {
                    await navigator.clipboard.writeText(code);
                    
                    // Visual feedback
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Disalin!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove('copied');
                    }, 2000);
                    
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }
    
    showThinking() {
        const thinkingElement = document.createElement('div');
        thinkingElement.className = 'message ai-message thinking-message';
        thinkingElement.innerHTML = `
            <div class="message-header">
                <i class="fas fa-robot"></i>
                <span>Lunar AI</span>
                <span class="message-time">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="thinking-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        
        this.messagesContainer.appendChild(thinkingElement);
        this.scrollToBottom();
    }
    
    hideThinking() {
        const thinkingElements = document.querySelectorAll('.thinking-message');
        thinkingElements.forEach(el => el.remove());
    }
    
    showLoading() {
        this.loadingOverlay.classList.add('active');
    }
    
    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }
    
    showModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    hideModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.aiTypeMenu.classList.toggle('active');
        
        // Update toggle button
        const icon = this.aiToggle.querySelector('i');
        if (this.isMenuOpen) {
            icon.classList.remove('fa-robot');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-robot');
        }
    }
    
    selectAI(type) {
        this.currentAI = type;
        
        // Update active option
        this.aiOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.type === type);
        });
        
        // Update AI info
        this.updateAIInfo();
        
        // Close menu on mobile
        if (window.innerWidth <= 992) {
            this.toggleMenu();
        }
    }
    
    updateAIInfo() {
        const aiNames = {
            community: 'Lunar AI Community',
            chat: 'Lunar AI Chat'
        };
        
        this.currentAIElement.textContent = aiNames[this.currentAI];
    }
    
    handleCommand(command) {
        switch (command) {
            case 'stalk-roblox':
                this.showRobloxStalker();
                break;
            default:
                console.log('Unknown command:', command);
        }
    }
    
    showRobloxStalker() {
        this.robloxUsername.value = '';
        this.showModal(this.robloxModal);
        
        // Close menu on mobile
        if (window.innerWidth <= 992 && this.isMenuOpen) {
            this.toggleMenu();
        }
        
        // Focus on input
        setTimeout(() => {
            this.robloxUsername.focus();
        }, 300);
    }
    
    async stalkRoblox() {
        const username = this.robloxUsername.value.trim();
        if (!username) {
            this.showNotification('Masukkan username Roblox', 'error');
            return;
        }

        this.hideModal(this.robloxModal);
        
        // Add user message
        this.addMessage('user', `/stalk @${username}`);
        
        // Show thinking
        this.showThinking();
        
        try {
            // Call Roblox Stalk API
            const apiUrl = `https://api.ootaizumi.web.id/stalk/roblox?username=${encodeURIComponent(username)}`;
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'accept': '*/*'
                }
            });
            
            const data = await response.json();
            
            this.hideThinking();
            
            if (data.status && data.result) {
                const result = data.result.result;
                const profileDetails = data.result.profileDetails;
                const lastOnline = data.result.lastOnline;
                
                // Format the response with better styling
                const responseHtml = this.formatRobloxResponse(result, profileDetails, lastOnline);
                
                // Add AI message with formatted response
                this.addFormattedMessage('ai', responseHtml);
                
            } else {
                throw new Error('Invalid API response');
            }
            
        } catch (error) {
            console.error('Error stalking Roblox user:', error);
            this.hideThinking();
            this.addMessage('ai', 'Maaf, terjadi kesalahan saat mengambil data Roblox. Pastikan username benar dan coba lagi.', false);
        }
    }
    
    formatRobloxResponse(result, profileDetails, lastOnline) {
        // Format date
        const createdDate = new Date(result.created);
        const formattedDate = createdDate.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create HTML for Roblox stalk result
        return `
            <div class="roblox-stalk-result">
                <div class="stalk-header">
                    <h4><i class="fas fa-user-circle"></i> Informasi Pemain Roblox</h4>
                    <span class="stalk-timestamp">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                <div class="stalk-content">
                    <div class="avatar-section">
                        <div class="avatar-container">
                            <img src="${profileDetails}" 
                                 alt="${result.name} Avatar" 
                                 class="roblox-avatar"
                                 onerror="this.src='https://via.placeholder.com/150/1a0b2a/8a2be2?text=Avatar+Tidak+Ditemukan'">
                            <div class="avatar-glow"></div>
                        </div>
                        <div class="avatar-info">
                            <h5 class="display-name">${result.displayName}</h5>
                            <p class="username">@${result.name}</p>
                            ${result.hasVerifiedBadge ? 
                                '<span class="verified-badge"><i class="fas fa-check-circle"></i> Terverifikasi</span>' : 
                                '<span class="unverified-badge"><i class="fas fa-times-circle"></i> Tidak Terverifikasi</span>'
                            }
                        </div>
                    </div>
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">
                                <i class="fas fa-id-card"></i>
                                User ID
                            </div>
                            <div class="info-value">${result.id}</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">
                                <i class="fas fa-calendar-plus"></i>
                                Dibuat Pada
                            </div>
                            <div class="info-value">${formattedDate}</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">
                                <i class="fas fa-clock"></i>
                                Terakhir Online
                            </div>
                            <div class="info-value">${lastOnline === "N/A" ? "Tidak tersedia" : lastOnline}</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">
                                <i class="fas fa-ban"></i>
                                Status
                            </div>
                            <div class="info-value">
                                ${result.isBanned ? 
                                    '<span class="banned-status"><i class="fas fa-exclamation-triangle"></i> Terbanned</span>' : 
                                    '<span class="active-status"><i class="fas fa-check"></i> Aktif</span>'
                                }
                            </div>
                        </div>
                    </div>
                    
                    ${result.description ? `
                        <div class="description-section">
                            <div class="description-label">
                                <i class="fas fa-quote-left"></i>
                                Deskripsi
                            </div>
                            <div class="description-text">${this.escapeHtml(result.description)}</div>
                        </div>
                    ` : ''}
                    
                    <div class="stalk-footer">
                        <span class="api-credit">
                            <i class="fas fa-code"></i>
                            Data dari Roblox API via ootaizumi.web.id
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
    
    addFormattedMessage(type, htmlContent) {
        const messageId = Date.now();
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}-message`;
        messageElement.id = `message-${messageId}`;
        
        const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-header">
                <i class="fas ${type === 'user' ? 'fa-user' : 'fa-robot'}"></i>
                <span>${type === 'user' ? 'Anda' : 'Lunar AI'}</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-content formatted-content">
                ${htmlContent}
            </div>
        `;
        
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add to chat history
        this.chatHistory.push({
            id: messageId,
            type: type,
            content: htmlContent,
            timestamp: timestamp,
            isFormatted: true
        });
    }
    
    newChat() {
        // Clear chat history
        this.chatHistory = [];
        this.messagesContainer.innerHTML = '';
        
        // Reset to default AI
        this.selectAI('community');
        
        // Show welcome message
        setTimeout(() => {
            this.addMessage('ai', 'Halo! Saya Lunar-AI. Ada yang bisa saya bantu?', true);
        }, 500);
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                background: var(--surface-blur);
                backdrop-filter: blur(20px);
                border-radius: 10px;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 4000;
                border: 1px solid rgba(138, 43, 226, 0.2);
                box-shadow: var(--shadow-soft);
                animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
                max-width: 400px;
            }
            
            .notification-success {
                border-left: 4px solid #25D366;
            }
            
            .notification-error {
                border-left: 4px solid #ff6b6b;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-primary);
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-success .notification-content i {
                color: #25D366;
            }
            
            .notification-error .notification-content i {
                color: #ff6b6b;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                line-height: 1;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: var(--transition-fast);
            }
            
            .notification-close:hover {
                background: rgba(138, 43, 226, 0.1);
                color: var(--text-primary);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.remove();
            });
        }
    }
}

// Initialize Lunar AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lunarAI = new LunarAI();
});