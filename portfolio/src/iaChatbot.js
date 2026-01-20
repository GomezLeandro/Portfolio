 
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
  "projects_title": "03. PROYECTOS",
  "description_0: "Ecosistema digital desarrollado para MM Ingeniería, especialistas en la fabricación de maquinaria para la transformación de residuos orgánicos en subproductos ecológicos. El proyecto se centró en comunicar procesos técnicos complejos (método erTH) mediante una interfaz limpia y profesional en WordPress. Incluye optimización de tiempos de carga y una estructura de contenidos pensada para convertir visitas en consultas técnicas especializadas.",
  "description_1": "Plataforma web corporativa diseñada para un estudio de abogados en Estados Unidos. Realizada íntegramente en WordPress con un enfoque en el rendimiento técnico y la experiencia de usuario (UX). Implementación de diseño responsivo de alta gama y optimización SEO técnica para mejorar el posicionamiento en el mercado legal competitivo de Florida.",
  "description_2": "Desarrollo de plataforma corporativa desarrollada integralmente en React con Vite, optimizada para alto rendimiento y SEO técnico.",
  "description_2_1: "El proyecto se destaca por una arquitectura basada en componentes desacoplados y reutilizables, diseñada especificamente para garantizar la escalabilidad del producto a largo plazo.",
  "description_2_2": "El codigo sigue principios de Clean Code con una organizacion semántica y logica para facilitar el mantenimiento futuro.",
  "description_2_3": "Implementación de diseño responsivo componentes reutilizables para mejorar la experiencia del usuario en múltiples dispositivos. ",
  "project_3": "PORTFOLIO PERSONAL (CHATBOT INTELIGENTE)",
  "description_3": "Este proyecto no es solo una vitrina de trabajos, sino una plataforma de experimentación en UX conversacional. Desarrollado con una estética Cyberpunk Minimalista, el sitio integra un Asistente de IA personalizado capaz de responder sobre mi stack tecnológico y trayectoria en tiempo real.",
  "description_3_1" : "Características destacadas:",
  "description_3_2": "Traducción Inteligente: Utiliza la capacidad de la IA para traducir dinámicamente todo el contenido del portfolio al idioma que el usuario prefiera, rompiendo las barreras lingüísticas de forma instantánea.",
  "description_3_3": "Pipeline de CI/CD: Desplegado en Vercel, lo que garantiza una integración y despliegue continuos; cada mejora en el código se refleja en producción automáticamente tras pasar los controles de calidad.",
  "description_3_4": "Arquitectura con Vite: Construido sobre Vite para asegurar una experiencia de desarrollo ágil y tiempos de carga ultrarrápidos en el navegador.",
  "description_3_5": "Estructura Dinámica: La arquitectura se basa en una gestión de datos que permite la actualización fluida de contenidos y componentes optimizados para el rendimiento.",
  "project_4": "JUEGO CON GOOGLE BLOCKLY",
  "description_4": "BLOCKLY: TRANSPILADOR VISUAL Y MOTOR DE SIMULACIÓN",
  "description_4_1": "Decisiones de implementación:",
  "description_4_2": "Shadow Execution: En lugar de mover el avión en tiempo real mientras se evalúa el código, implementé un motor que genera una moveQueue. Esta cola de movimientos permite validar colisiones y límites del mapa antes de que empiece la animación, asegurando que el estado visual esté siempre sincronizado con la lógica interna.",
  "description_4_3": "Gestión de colisiones por proximidad: Para evitar los errores de precisión del punto flotante en JavaScript, desarrollé una función de tolerancia (isSameTile). Esto garantiza que el contacto con obstáculos se detecte de forma consistente sin depender de coordenadas exactas al píxel.",
  "description_4_4": "Feedback de UI por topología de bloques: Configuré listeners en el workspace para analizar la conexión de los bloques. El sistema detecta \"nodos huérfanos\" (bloques sin padre ejecutable) y aplica transformaciones de opacidad en el DOM de Blockly, eliminando ruido visual y errores de ejecución silenciosos.",
  "description_4_5": "Arquitectura de estados en React: Utilicé una estructura desacoplada donde Blockly solo actúa como el emisor de lógica, el motor físico procesa los datos y React se limita a reflejar esos cambios de posición, manteniendo el componente de vista liviano y eficiente."
}

If the user asks to change the language or translate the site, return ONLY a JSON object. 
IMPORTANT: Do not use Markdown formatting like \`\`\`json. Return the raw string.
### SUGGESTIONS RULE
At the end of every conversational response (NOT in JSON translations), 
add a new line starting with "SUGGESTIONS:" followed by 3 short 
one-sentence questions the user might ask next, separated by semicolons.
Example: SUGGESTIONS: Tell me about Java '\n' How to contact him?'\n' See projects.
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
        document.getElementById('description-0').innerText = data.description_0;
        document.getElementById('description-1').innerText = data.description_1;
        document.getElementById('description-2').innerText = data.description_2;
        document.getElementById('description-2.1').innerText = data.description_2_1;
        document.getElementById('description-2.2').innerText = data.description_2_2;
        document.getElementById('description-2.3').innerText = data.description_2_3;
        document.getElementById('project-3').innerText = data.project_3;
        document.getElementById('description-3').innerText = data.description_3;
        document.getElementById('description-3.1').innerText = data.description_3_1;
        document.getElementById('description-3.2').innerText = data.description_3_2;
        document.getElementById('description-3.3').innerText = data.description_3_3;
        document.getElementById('description-3.4').innerText = data.description_3_4;
        document.getElementById('description-3.5').innerText = data.description_3_5;
        document.getElementById('project-4').innerText = data.project_4;
        document.getElementById('description-4').innerText = data.description_4;
        document.getElementById('description-4.1').innerText = data.description_4_1;
        document.getElementById('description-4.2').innerText = data.description_4_2;
        document.getElementById('description-4.3').innerText = data.description_4_3;
        document.getElementById('description-4.4').innerText = data.description_4_4;
        document.getElementById('description-4.5').innerText = data.description_4_5;
        
        addMessage('Sistema', 'Idioma actualizado correctamente.');
    } catch (e) {
        console.error("Error aplicando traducción:", e);
    }
}