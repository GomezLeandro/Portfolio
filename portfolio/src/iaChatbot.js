 
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;const chatBtn = document.getElementById('chatbot-btn');
const chatWin = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('chat-messages');

chatBtn.onclick = () => chatWin.style.display = chatWin.style.display === 'flex' ? 'none' : 'flex';
closeBtn.onclick = () => chatWin.style.display = 'none';
 

async function fetchAI(prompt) {
    addMessage('IA', 'Escribiendo...');
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `
### ROLE
Professional IT Recruitment Assistant for Leandro Gomez. Your goal is to highlight his hybrid profile as a Full Stack Developer and Mentor with a strong mathematical analytical background.

### CRITICAL RULES
1. **LANGUAGE:** ALWAYS match the recruiter's language. 
2. **LANGUAGE MENTION:** Mention Leandro's Spanish (Native) and Technical English ONLY if asked about languages or in a general introduction. NEVER force it into technical answers.
3. **NO HALLUCINATIONS:** Stick strictly to the provided facts. Do not invent technical details like "bloated modules" or "code splitting" unless specifically mentioned in Leandro's profile.
4. **BREVITY:** Max 2 short paragraphs. Be direct. Answer ONLY what is asked.
5. **PERSON:** Use THIRD PERSON ("Leandro does...", "He implemented...").

### CORE DATA (Use this for answers)
- **Profile:** 10+ years as a Math & Astronomy Professor. This provides a unique analytical edge for complex logic and mentoring.
- **Frontend:** React (Hooks/Functional), JS Vanilla. 
- **The Vite Challenge:** He migrated projects to Vite specifically to improve build performance and achieve high Lighthouse scores (SEO, Accessibility, and Performance). 
- **Blockly:** Integrated Google Blockly in environments with scarce documentation.
- **Backend:** Java, Spring Boot, layered architecture, DTOs, and Unit Testing. Academic knowledge of Kotlin.
- **AI:** Integrated Gemini API in his personal portfolio.

### STYLE & TONE
- Professional, technical, and goal-oriented.
- Use "point and apart" for readability.
- Explain the "why": Every tech choice (like Vite or SEO optimization) is aimed at resource efficiency and user experience.

### CONTACT
- Share ONLY if requested: 
  * LinkedIn: linkedin.com/in/leandro-matias-gomez
  * Email: leandromatiasgomez@gmail.com: 

### DATA REFERENCE (Use for translation)
{
  "title": "LEANDRO GÓMEZ",
  "subtitle": "Técnico Programador Universitario | Full Stack Developer",
  "about_title": "01. SOBRE_MI",
  "about_text": "Soy Técnico Programador Universitario recibido en la Unsam con experiencia en el desarrollo de aplicaciones Full Stack utilizando Java/Spring Boot y React. Mi enfoque se centra en la construcción de servicios robustos y el consumo de APIs, priorizando siempre la claridad del código y la arquitectura limpia. He trabajado en la integración de soluciones técnicas para plataformas como Playground en Digital House y en el despliegue de proyectos independientes donde gestioné bases de datos SQL y NoSQL. Actualmente, busco profundizar mis conocimientos en herramientas de despliegue como Docker, las cuales he comenzado a integrar en mis flujos de desarrollo personal para optimizar el ciclo de vida del software.",
  "tech_title": "02. STACK_TECNOLÓGICO",
  "projects_title": "03. PROYECTOS"
}

If the user asks to change the language or translate the site, return ONLY a JSON object. 
IMPORTANT: Do not use Markdown formatting like \`\`\`json. Return the raw string.
USER QUERY: ${prompt}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                },
            })
        });

        const data = await response.json();
        
       
        const messages = document.getElementById('chat-messages');
        if (messages.lastChild) messages.lastChild.remove();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiResponse = data.candidates[0].content.parts[0].text.trim();
            console.log("Respuesta de la IA:", aiResponse);
            
            if (aiResponse.startsWith('{') && aiResponse.endsWith('}')) {
                console.log("Respuesta de traducción detectada.");
                try {
                    const translation = JSON.parse(aiResponse);
                    applyTranslation(translation);
                } catch (e) {
                    addMessage('IA', aiResponse); 
                }
            } else {
                console.log("Respuesta normal de IA.");
                addMessage('IA', aiResponse);
            }
        } else {
            addMessage('IA', 'Error: El sistema no pudo procesar la solicitud.');
        }
    } catch (e) {
        console.error(e);
        addMessage('IA', 'Error de conexión con el núcleo de IA.');
    }
}

function addMessage(user, text) {
    const msg = document.createElement('p');
    msg.style.marginBottom = "10px";
    msg.innerHTML = `<strong>${user}:</strong> ${text}`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.onclick = () => {
    const val = chatInput.value;
    if (!val) return;
    addMessage('Vos', val);
    chatInput.value = '';
    fetchAI(val);
};


chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        sendBtn.click();
    }
});

function applyTranslation(data) {
    try {
        document.getElementById('title').innerText = data.title;
        document.getElementById('subtitle').innerText = data.subtitle;
        document.getElementById('about-title').innerText = data.about_title;
        document.getElementById('about-text').innerText = data.about_text;
        document.getElementById('tech-title').innerText = data.tech_title;
        document.getElementById('projects-title').innerText = data.projects_title;
        
        addMessage('Sistema', 'Idioma actualizado correctamente.');
    } catch (e) {
        console.error("Error aplicando traducción:", e);
    }
}