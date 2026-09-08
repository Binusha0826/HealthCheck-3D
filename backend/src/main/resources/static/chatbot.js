// ========================================
// HealthCheck AI Chatbot - Final Version
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // CREATE CHAT BUTTON
    // ==============================

    const chatbotButton = document.createElement("button");

    chatbotButton.type = "button";
    chatbotButton.className = "ai-chat-button";
    chatbotButton.setAttribute("aria-label", "Open HealthCheck AI");

    chatbotButton.innerHTML = `
        <span class="ai-icon">✦</span>
        <span>Ask HealthCheck AI</span>
    `;

    document.body.appendChild(chatbotButton);


    // ==============================
    // CREATE CHAT WINDOW
    // ==============================

    const chatbot = document.createElement("div");

    chatbot.className = "ai-chatbot";

    chatbot.innerHTML = `

        <div class="ai-chat-header">

            <div class="ai-header-info">

                <div class="ai-avatar">✦</div>

                <div>
                    <strong>HealthCheck AI</strong>

                    <small>
                        <span class="online-dot"></span>
                        Online
                    </small>
                </div>

            </div>

            <button
                type="button"
                class="ai-close"
                aria-label="Close chatbot">
                ×
            </button>

        </div>


        <div class="ai-chat-messages">

            <div class="ai-message bot">

                <div class="message-avatar">✦</div>

                <div class="message-content">

                    <p>
                        Hi! 👋 I'm HealthCheck AI.
                    </p>

                    <p>
                        Ask me about exercise, nutrition,
                        sleep, hydration or healthy
                        lifestyle habits.
                    </p>

                </div>

            </div>

        </div>


        <div class="ai-suggestions">

            <button
                type="button"
                data-question="What is a healthy breakfast?">
                🥗 Healthy breakfast
            </button>

            <button
                type="button"
                data-question="What exercises are good for beginners?">
                🏃 Beginner exercises
            </button>

            <button
                type="button"
                data-question="How can I improve my sleep?">
                😴 Better sleep
            </button>

        </div>


        <div class="ai-input-area">

            <textarea
                class="ai-input"
                placeholder="Ask something about health..."
                rows="1"
                maxlength="1000"
                aria-label="Health question"></textarea>

            <button
                type="button"
                class="ai-send"
                aria-label="Send message">
                ➤
            </button>

        </div>


        <div class="ai-disclaimer">
            AI provides general educational information only.
            It is not medical advice.
        </div>

    `;

    document.body.appendChild(chatbot);


    // ==============================
    // GET ELEMENTS
    // ==============================

    const messages =
        chatbot.querySelector(".ai-chat-messages");

    const input =
        chatbot.querySelector(".ai-input");

    const sendButton =
        chatbot.querySelector(".ai-send");

    const closeButton =
        chatbot.querySelector(".ai-close");

    const suggestionButtons =
        chatbot.querySelectorAll(".ai-suggestions button");


    // ==============================
    // OPEN CHATBOT
    // ==============================

    chatbotButton.addEventListener("click", () => {

        console.log("HealthCheck AI opened");

        chatbot.classList.add("open");

        setTimeout(() => {
            input.focus();
        }, 200);

    });


    // ==============================
    // CLOSE CHATBOT
    // ==============================

    closeButton.addEventListener("click", () => {

        chatbot.classList.remove("open");

    });


    // ==============================
    // ADD MESSAGE
    // ==============================

    function addMessage(text, type) {

        const message =
            document.createElement("div");

        message.className =
            `ai-message ${type}`;


        if (type === "user") {

            message.innerHTML = `
                <div class="message-content">
                    <p>${escapeHtml(text)}</p>
                </div>
            `;

        } else {

            message.innerHTML = `
                <div class="message-avatar">✦</div>

                <div class="message-content">
                    ${formatAIResponse(text)}
                </div>
            `;

        }


        messages.appendChild(message);

        scrollToBottom();

    }


    // ==============================
    // SCROLL TO BOTTOM
    // ==============================

    function scrollToBottom() {

        messages.scrollTo({
            top: messages.scrollHeight,
            behavior: "smooth"
        });

    }


    // ==============================
    // TYPING INDICATOR
    // ==============================

    function showTyping() {

        const typing =
            document.createElement("div");

        typing.className =
            "ai-message bot typing-message";

        typing.innerHTML = `

            <div class="message-avatar">
                ✦
            </div>

            <div class="typing-content">

                <span class="typing-label">
                    HealthCheck AI is thinking
                </span>

                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        `;

        messages.appendChild(typing);

        scrollToBottom();

        return typing;

    }


    // ==============================
    // SEND MESSAGE
    // ==============================

    async function sendMessage(customMessage = "") {

        if (sendButton.disabled) {
            return;
        }

        const message =
            customMessage ||
            input.value.trim();


        if (!message) {
            return;
        }


        // Limit very long messages
        if (message.length > 1000) {

            addMessage(
                "Please keep your question under 1000 characters.",
                "bot"
            );

            return;
        }


        // Add user message
        addMessage(message, "user");

        input.value = "";

        input.style.height = "auto";


        // Disable controls
        setLoadingState(true);


        // Show typing
        const typing = showTyping();


        try {

            console.log(
                "Sending AI message:",
                message
            );


            // ==============================
            // EXISTING BACKEND API
            // ==============================

            const response =
                await fetch("/api/chat", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })

                });


            console.log(
                "AI response status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                );

            }


            const data =
                await response.json();


            typing.remove();


            const reply =
                data.reply ||
                "Sorry, I couldn't generate a response.";


            addMessage(
                reply,
                "bot"
            );


        } catch (error) {

            console.error(
                "HealthCheck AI Error:",
                error
            );


            typing.remove();


            addMessage(
                "I'm having trouble connecting to the AI right now. Please try again in a moment.",
                "bot"
            );

        }


        setLoadingState(false);

        input.focus();

    }


    // ==============================
    // LOADING STATE
    // ==============================

    function setLoadingState(isLoading) {

        sendButton.disabled =
            isLoading;

        input.disabled =
            isLoading;


        if (isLoading) {

            sendButton.innerHTML = `
                <span class="ai-send-loading"></span>
            `;

            sendButton.setAttribute(
                "aria-label",
                "AI is responding"
            );

        } else {

            sendButton.innerHTML =
                "➤";

            sendButton.setAttribute(
                "aria-label",
                "Send message"
            );

        }

    }


    // ==============================
    // SEND BUTTON
    // ==============================

    sendButton.addEventListener(
        "click",
        () => {
            sendMessage();
        }
    );


    // ==============================
    // ENTER KEY
    // ==============================

    input.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    // ==============================
    // TEXTAREA AUTO RESIZE
    // ==============================

    input.addEventListener(
        "input",
        () => {

            input.style.height =
                "auto";

            input.style.height =
                Math.min(
                    input.scrollHeight,
                    100
                ) + "px";

        }
    );


    // ==============================
    // SUGGESTIONS
    // ==============================

    suggestionButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    sendMessage(
                        button.dataset.question
                    );

                }
            );

        }
    );


    // ==============================
    // ESCAPE KEY
    // ==============================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                chatbot.classList.contains("open")
            ) {

                chatbot.classList.remove("open");

            }

        }
    );


    // ==============================
    // SECURITY
    // ==============================

    function escapeHtml(text) {

        const div =
            document.createElement("div");

        div.textContent =
            text;

        return div.innerHTML;

    }


    // ==============================
    // AI RESPONSE FORMATTER
    // ==============================

    function formatAIResponse(text) {

        let safe =
            escapeHtml(text);


        // Remove escaped markdown backslashes
        safe = safe.replace(
            /\\([#*_\-])/g,
            "$1"
        );


        // Headings
        safe = safe.replace(
            /^### (.*?)$/gm,
            "<h4>$1</h4>"
        );

        safe = safe.replace(
            /^## (.*?)$/gm,
            "<h3>$1</h3>"
        );

        safe = safe.replace(
            /^# (.*?)$/gm,
            "<h3>$1</h3>"
        );


        // Bold
        safe = safe.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


        // Italic
        safe = safe.replace(
            /(?<!\*)\*([^*\n]+)\*(?!\*)/g,
            "<em>$1</em>"
        );


        // Bullet points
        safe = safe.replace(
            /^[\t ]*[\*\-]\s+(.*?)$/gm,
            "<li>$1</li>"
        );


        // Numbered lists
        safe = safe.replace(
            /^\s*(\d+)\.\s+(.*?)$/gm,
            "<li class=\"numbered-item\"><strong>$1.</strong> $2</li>"
        );


        // Convert consecutive bullet items into lists
        safe = safe.replace(
            /(<li>(?:(?!<li>).)*<\/li>(?:\s*<li>(?:(?!<li>).)*<\/li>)*)/gs,
            "<ul>$1</ul>"
        );


        // Horizontal rule
        safe = safe.replace(
            /^-{3,}$/gm,
            "<hr>"
        );


        // Line breaks
        safe = safe.replace(
            /\n{2,}/g,
            "<br><br>"
        );

        safe = safe.replace(
            /\n/g,
            "<br>"
        );


        // Clean unnecessary breaks around HTML blocks
        safe = safe.replace(
            /<br>\s*(<h[34]>)/g,
            "$1"
        );

        safe = safe.replace(
            /(<\/h[34]>)\s*<br>/g,
            "$1"
        );

        safe = safe.replace(
            /<br>\s*(<ul>)/g,
            "$1"
        );

        safe = safe.replace(
            /(<\/ul>)\s*<br>/g,
            "$1"
        );

        safe = safe.replace(
            /<br>\s*(<hr>)/g,
            "$1"
        );


        return safe;

    }


    // ==============================
    // INITIAL MESSAGE
    // ==============================

    console.log(
        "HealthCheck AI Chatbot loaded successfully"
    );

});