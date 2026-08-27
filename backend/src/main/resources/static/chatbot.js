// ========================================
// HealthCheck AI Chatbot
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // CREATE CHAT BUTTON
    // ==============================

    const chatbotButton = document.createElement("button");

    chatbotButton.type = "button";
    chatbotButton.className = "ai-chat-button";

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

            <button type="button"
                data-question="What is a healthy breakfast?">
                🥗 Healthy breakfast
            </button>

            <button type="button"
                data-question="What exercises are good for beginners?">
                🏃 Beginner exercises
            </button>

            <button type="button"
                data-question="How can I improve my sleep?">
                😴 Better sleep
            </button>

        </div>


        <div class="ai-input-area">

            <textarea
                class="ai-input"
                placeholder="Ask something about health..."
                rows="1">
            </textarea>

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
                    <p>${formatAIResponse(text)}</p>
                </div>
            `;

        }


        messages.appendChild(message);

        messages.scrollTop =
            messages.scrollHeight;

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

            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>

        `;

        messages.appendChild(typing);

        messages.scrollTop =
            messages.scrollHeight;

        return typing;

    }


    // ==============================
    // SEND MESSAGE
    // ==============================

    async function sendMessage(customMessage = "") {

        const message =
            customMessage ||
            input.value.trim();


        if (!message) {
            return;
        }


        // User message

        addMessage(message, "user");

        input.value = "";

        input.style.height = "auto";


        // Typing

        const typing =
            showTyping();

        sendButton.disabled = true;


        try {

            console.log(
                "Sending AI message:",
                message
            );


            const response =
                await fetch("/api/chat", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
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


            addMessage(
                data.reply ||
                "Sorry, I couldn't generate a response.",
                "bot"
            );


        } catch (error) {

            console.error(
                "HealthCheck AI Error:",
                error
            );


            typing.remove();


            addMessage(
                "Sorry, I'm having trouble connecting right now. Please try again.",
                "bot"
            );

        }


        sendButton.disabled = false;

        input.focus();

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

            input.style.height = "auto";

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
    // SECURITY
    // ==============================

    function escapeHtml(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    // ==============================
    // AI RESPONSE FORMAT
    // ==============================

    function formatAIResponse(text) {

        let safe =
            escapeHtml(text);


        safe =
            safe.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
            );


        safe =
            safe.replace(
                /\n/g,
                "<br>"
            );


        return safe;

    }


    console.log(
        "HealthCheck AI Chatbot loaded successfully"
    );

});