// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => { 
            preloader.classList.add('hidden');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 800); 
        }, 500); 
    }
});

// --- ANIMAÇÃO DE DIGITAÇÃO HERO ---
const heroTitleElement = document.getElementById('heroTitle');
const heroSubtitleElement = document.getElementById('heroSubtitle');

const typingTexts = [
    "Artiflex IA: Revolucionando...",
    "Atendimento Inteligente Avançado.",
    "O Futuro da Interação Digital.",
    "Soluções com IA para Você."
];
const heroSubtitleText = "Nossos assistentes virtuais não são chatbots comuns. São IAs que conversam, entendem e resolvem, elevando a experiência do seu cliente a um novo patamar.";

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; 
const deletingSpeed = 50; 
const delayBetweenTexts = 1500; 

function typeHero() {
    if (!heroTitleElement) return; 
    const currentText = typingTexts[textIndex];
    heroTitleElement.classList.add('is-typing'); 

    if (isDeleting) {
        heroTitleElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitleElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeHero, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length; 
        setTimeout(typeHero, typingSpeed / 2); 
    } else {
        setTimeout(typeHero, isDeleting ? deletingSpeed : typingSpeed);
    }
}

function typeHeroSubtitle() {
    if (!heroSubtitleElement) return;
    let subCharIndex = 0;
    heroSubtitleElement.textContent = ''; 
    heroSubtitleElement.classList.add('visible'); 

    function typeSub() {
        if (subCharIndex < heroSubtitleText.length) {
            heroSubtitleElement.textContent += heroSubtitleText.charAt(subCharIndex);
            subCharIndex++;
            setTimeout(typeSub, 20); 
        }
    }
    typeSub();
}


// --- ANIMAÇÃO DE PARTÍCULAS NO CANVAS ---
const canvas = document.getElementById('particle-canvas');
let ctx; 
let particlesArray;

if (canvas) { 
    ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('hero');
    
    function resizeCanvas() {
        if (heroSection && canvas) { 
            canvas.width = window.innerWidth;
            canvas.height = heroSection.offsetHeight;
            if (particlesArray && particlesArray.length > 0) { 
                 initParticles();
            }
        }
    }
    
    if (heroSection) { 
        resizeCanvas(); 
        window.addEventListener('resize', resizeCanvas);
    }

    class Particle {
        constructor(x, y, size, color, weight) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.weight = weight; 
        }
        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (!canvas) return;
            this.size -= 0.03; 
            if (this.size < 0) {
                this.x = (Math.random() * canvas.width);
                this.y = (Math.random() * canvas.height); 
                this.size = (Math.random() * 3) + 1.5; 
                this.weight = (Math.random() * 0.5) - 0.25; 
            }
            this.y += this.weight;
            if (this.y > canvas.height + this.size) {
                 this.y = 0 - this.size;
                 this.x = (Math.random() * canvas.width);
                 this.weight = (Math.random() * 0.5) - 0.25;
            }
            if (this.y < 0 - this.size) {
                this.y = canvas.height + this.size;
                this.x = (Math.random() * canvas.width);
                this.weight = (Math.random() * 0.5) - 0.25;
            }
        }
    }

    function initParticles() {
        if (!canvas) return;
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 12000; 
        if (numberOfParticles > 120) numberOfParticles = 120; 
        if (numberOfParticles < 40) numberOfParticles = 40; 
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 1; 
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height; 
            let color = 'rgba(135, 206, 250, 0.25)'; 
            let weight = (Math.random() * 0.4) - 0.2; 
            particlesArray.push(new Particle(x, y, size, color, weight));
        }
    }

    function animateParticles() {
        if (!ctx || !canvas || !particlesArray) return; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    function connectParticles() {
        if (!ctx || !particlesArray) return;
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) { 
                let distance = Math.sqrt(
                    Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
                    Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
                );
                
                let connectionDistance = 100; 
                if (canvas.width < 768) connectionDistance = 70; 

                if (distance < connectionDistance) {
                    opacityValue = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(173, 216, 230, ${opacityValue * 0.2})`; 
                    ctx.lineWidth = 0.7; 
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
}

// --- DADOS PARA LISTAS DINÂMICAS ---
const innovationData = [
    { text: "Compreensão Natural da Linguagem (NLU) de Vanguarda", icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.875L5.999 12zm0 0h7.5" },
    { text: "Personalização Dinâmica e Contextual de Interações", icon: "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.774.773a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.164.397.505.71.93.78l.894.15c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.93.78-.164.398-.142.854.108 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.773.774a1.125 1.125 0 01-1.45-.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.383-.764-.93-.78-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.773.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.774.773a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.164.397.505.71.93.78l.894.15c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.93.78-.164.398-.142.854.108 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.773.774a1.125 1.125 0 01-1.45-.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78-.93l-.149-.894c-.09-.542-.56-.94-1.11-.94H8.344c-.55 0-1.02.398-1.11.94l-.149.894c-.07.424-.383.764-.93.78-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.773.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107L4.32 19.06c-.397-.165-.71-.505-.78-.93l-.15-.894c-.09-.542-.56-.94-1.11-.94H1.027c-.55 0-1.02.398-1.11.94l-.149.894c-.07.424-.383.764-.93.78-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.773.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11V21c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738a1.125 1.125 0 01-.12 1.45l-.774.773a1.125 1.125 0 01-1.449-.12l-.738-.527c-.35-.25-.806-.272-1.203-.107L.93 22.06c-.397-.165-.71-.505-.78-.93l-.15-.894c-.09-.542-.56-.94-1.11-.94H.93c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.774.773a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.164.397.505.71.93.78l.894.15c.542.09.94.56.94 1.11V23c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.93.78-.164.398-.142.854.108 1.204l.527.738a1.125 1.125 0 01-.12 1.45l-.773.774a1.125 1.125 0 01-1.45-.12l-.737-.527c-.35-.25-.806-.272-1.204-.108l-.15.894c-.09.542-.56.94-1.11-.94H1.027c-.55 0-1.02.398-1.11.94l-.149.894c-.07.424-.383.764-.93.78-.398-.164-.854-.142-1.204.108l-.738.527c-.32.447-.269 1.06.12 1.45l.773.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11V21z" },
    { text: "Machine Learning Contínuo para Auto-Otimização", icon: "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662s.046 2.453.138 3.662c.153 2.036 1.866 3.628 3.89 3.745 2.713.153 5.385.153 8.098 0 2.024-.117 3.737-1.71 3.89-3.745.092-1.21.138-2.43.138-3.662zM16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" }
];

const benefitsData = [
    { title: "Atendimento Hiper-Personalizado", desc: "Proporcione experiências de conversação únicas, adaptadas a cada cliente, muito além dos chatbots tradicionais.", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z", color: "sky" },
    { title: "Operação Ininterrupta 24/7", desc: "Seus clientes atendidos a qualquer hora, todos os dias, com respostas instantâneas, precisas e contextuais.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "sky" },
    { title: "Otimização Inteligente de Custos", desc: "Automatize tarefas complexas, libere sua equipe para focos estratégicos e reduza custos operacionais.", icon: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6", color: "sky" },
    { title: "Data-Driven Insights Acionáveis", desc: "Colete e analise dados profundos das interações para decisões estratégicas e otimização contínua.", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z", color: "purple" },
    { title: "Eleve sua Marca à Vanguarda", desc: "Posicione sua empresa como líder em inovação, oferecendo o que há de mais avançado em atendimento com IA.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", color: "purple" },
    { title: "Segurança e Ética em IA", desc: "Plataforma robusta com foco em segurança, privacidade e conformidade, garantindo confiança e responsabilidade.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "purple" }
];

function populateInnovationList() {
    const listElement = document.getElementById('innovationList');
    if (!listElement) return;
    listElement.innerHTML = innovationData.map(item => `
        <li class="flex items-start animate-on-scroll" style="animation-delay: 0.1s">
            <svg class="w-7 h-7 text-sky-400 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${item.icon}"></path></svg>
            <span class="text-slate-300 text-base">${item.text}</span>
        </li>
    `).join('');
}

function populateBenefitsGrid() {
    const gridElement = document.getElementById('benefitsGrid');
    if (!gridElement) return;
    gridElement.innerHTML = benefitsData.map((item, index) => `
        <div class="tech-card animate-on-scroll" style="animation-delay: ${(index * 0.15) + 0.1}s;">
            <div class="tech-card-content">
                <div class="icon-container flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-${item.color}-600/10 text-${item.color}-400 border border-${item.color}-600/20">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${item.icon}"></path></svg>
                </div>
                <h5 class="text-xl font-rajdhani font-semibold text-white mb-3">${item.title}</h5>
                <p class="text-slate-400 text-sm leading-relaxed">${item.desc}</p>
            </div>
        </div>
    `).join('');
}

// --- LÓGICA DO CHAT SIMULADO ---
const chatFabContainer = document.getElementById('chatFabContainer');
const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const closeChatButton = document.getElementById('closeChatButton');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendButton = document.getElementById('chatSendButton');
const openChatButton = document.getElementById('openChatButton'); 

function toggleChatWindow() {
    if (chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        setTimeout(() => { 
            chatWindow.classList.remove('opacity-0', 'translate-y-10', 'scale-95');
            chatWindow.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            chatFabContainer.classList.add('opacity-0'); 
            chatFabContainer.classList.add('pointer-events-none');
        }, 10);
        if (chatMessages.children.length === 0) { // Adiciona mensagem de boas-vindas apenas se o chat estiver vazio
            addMessageToChat('Artiflex IA', 'Olá! 👋 Como posso te ajudar a explorar o futuro do atendimento com IA hoje?', false);
        }
    } else {
        chatWindow.classList.add('opacity-0', 'translate-y-10', 'scale-95');
        chatWindow.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        setTimeout(() => {
            chatWindow.classList.add('hidden');
            chatFabContainer.classList.remove('opacity-0');
            chatFabContainer.classList.remove('pointer-events-none');
        }, 500); 
    }
}

function addMessageToChat(sender, message, isUser) {
    if (!chatMessages) return;
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'p-3', 'rounded-xl', 'max-w-[80%]', 'text-sm', 'leading-relaxed');
    
    const senderElement = document.createElement('div');
    senderElement.classList.add('font-semibold', 'mb-1');
    senderElement.textContent = sender;

    const messageTextElement = document.createElement('p');
    messageTextElement.textContent = message;

    if (isUser) {
        messageElement.classList.add('bg-sky-500', 'text-white', 'self-end', 'rounded-br-none');
        senderElement.classList.add('text-sky-100'); 
        messageElement.appendChild(messageTextElement); 
    } else {
        messageElement.classList.add('bg-slate-700', 'text-slate-200', 'self-start', 'rounded-bl-none');
        senderElement.classList.add('text-purple-300'); 
        messageElement.appendChild(senderElement);
        messageElement.appendChild(messageTextElement);
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}

function getSimulatedAiResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    let response = "Desculpe, ainda estou aprendendo e não entendi bem. Você poderia reformular ou perguntar sobre nossos serviços de assistente virtual com IA?";

    if (lowerInput.includes("olá") || lowerInput.includes("oi") || lowerInput.includes("bom dia") || lowerInput.includes("boa tarde") || lowerInput.includes("boa noite")) {
        response = "Olá! É um prazer conversar com você. 😊 Em que posso ser útil?";
    } else if (lowerInput.includes("artiflex") || lowerInput.includes("empresa")) {
        response = "A Artiflex IA é especialista em revolucionar o atendimento ao cliente através de assistentes virtuais com Inteligência Artificial de ponta. Criamos soluções personalizadas para websites e WhatsApp!";
    } else if (lowerInput.includes("serviços") || lowerInput.includes("o que você faz") || lowerInput.includes("como funciona")) {
        response = "Oferecemos implantação de assistentes virtuais super inteligentes para sites e WhatsApp. Eles não são chatbots comuns, mas sim IAs que conversam, entendem e resolvem, melhorando a experiência do cliente e otimizando seus processos. Quer saber mais sobre alguma funcionalidade específica?";
    } else if (lowerInput.includes("demonstração") || lowerInput.includes("demo")) {
        response = "Esta conversa já é uma pequena demonstração! Para uma apresentação completa e personalizada para o seu negócio, você pode clicar no botão 'Solicite uma Demonstração' em nosso site ou me fornecer seu contato.";
    } else if (lowerInput.includes("preço") || lowerInput.includes("custo") || lowerInput.includes("valor")) {
        response = "Os valores dos nossos projetos são personalizados conforme a necessidade de cada cliente. Para um orçamento detalhado, o ideal é conversarmos sobre suas expectativas. Que tal agendarmos uma ligação rápida?";
    } else if (lowerInput.includes("whatsapp")  || lowerInput.includes("contato")) {
        response = "Sim, integramos nossos assistentes virtuais inteligentes diretamente ao WhatsApp da sua empresa, permitindo um atendimento automatizado e eficiente no canal mais popular do Brasil!";
    } else if (lowerInput.includes("obrigado") || lowerInput.includes("valeu")) {
        response = "De nada! Fico feliz em ajudar. Se tiver mais alguma dúvida, é só perguntar! 😄";
    } else if (lowerInput.includes("tchau") || lowerInput.includes("até mais") || lowerInput.includes("encerrar")) {
        response = "Até logo! Foi um prazer conversar. Lembre-se, a Artiflex IA está aqui para levar seu atendimento ao próximo nível. 😉";
    }

    return response;
}

function handleSendMessage() {
    if (!chatInput || !chatMessages) return;
    const messageText = chatInput.value.trim();
    if (messageText === "") return;

    addMessageToChat('Você', messageText, true);
    chatInput.value = '';

    setTimeout(() => {
        const aiResponse = getSimulatedAiResponse(messageText);
        addMessageToChat('Artiflex IA', aiResponse, false);
    }, 700 + Math.random() * 500); 
}

if (chatFab) {
    setTimeout(() => {
        if(chatFabContainer) chatFabContainer.classList.remove('opacity-0');
    }, 2500);
    chatFab.addEventListener('click', toggleChatWindow);
}
if (openChatButton) { 
    openChatButton.addEventListener('click', () => {
        if (chatWindow && chatWindow.classList.contains('hidden')) {
            toggleChatWindow();
        }
    });
}

if (closeChatButton) {
    closeChatButton.addEventListener('click', toggleChatWindow);
}
if (chatSendButton) {
    chatSendButton.addEventListener('click', handleSendMessage);
}
if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}


// --- INICIALIZAÇÃO GERAL ---
document.addEventListener('DOMContentLoaded', () => {
    if (heroTitleElement) {
        heroTitleElement.textContent = ''; 
        typeHero(); 
        const firstPhraseTime = typingTexts[0].length * typingSpeed + delayBetweenTexts;
        setTimeout(typeHeroSubtitle, firstPhraseTime * 0.6 ); 
    }
    
    populateInnovationList();
    populateBenefitsGrid();

    if (canvas && ctx) { 
        initParticles(); 
        animateParticles();
    }

    const allAnimatedElements = document.querySelectorAll('.animate-on-scroll');
    allAnimatedElements.forEach(element => observer.observe(element));
});

// --- SCROLL & OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.classList.contains('glitch-effect')) {
                let textForGlitch = "";
                Array.from(entry.target.childNodes).forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        textForGlitch += child.textContent;
                    } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'span') {
                        textForGlitch += child.textContent; 
                    } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'br') {
                        textForGlitch += " "; 
                    }
                });
                entry.target.setAttribute('data-text', textForGlitch.replace(/\s+/g, ' ').trim());
            }
        }
    });
}, { threshold: 0.15 }); 

const initialAnimatedElements = document.querySelectorAll('.animate-on-scroll');
initialAnimatedElements.forEach(element => observer.observe(element));

// --- OUTROS SCRIPTS ---
document.getElementById('currentYear').textContent = new Date().getFullYear();

const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuButton && mobileMenu) { 
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.getElementById('mainHeader').offsetHeight || 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
