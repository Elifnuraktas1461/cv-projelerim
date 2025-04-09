function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (message === "") return;

    const chatBox = document.getElementById("infomate");
    
    // Kullanıcı mesajını ekleme kodu
    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user");
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);
    
    // Bot yanıtını ekleme kodu
    setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot");
        botMessage.textContent = getBotReply(message);
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
    
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function getBotReply(message) {
    try {
        const lowerCaseMessage = message.toLowerCase();

        //  Tarih
        if (lowerCaseMessage.includes("bugün tarihte ne oldu")) {
            return getRandomResponse([
                "Bugün tarihte 12 Şubat 1947'de, Türkiye'de ilk kez özel televizyon yayını başlamıştır.",
                "Bugün tarihte 12 Şubat 1993'te, Türkiye'nin en büyük doğalgaz boru hattı olan BOTAŞ, faaliyete geçmiştir.",
                "Bugün tarihte 12 Şubat 1979'da, İran'da Şah Muhammed Rıza Pehlevi'nin devrilmesiyle İran İslam Devrimi başlamıştır."
            ]);
        }


        //  Matematik 4 işlem
        if (lowerCaseMessage.includes("kaç eder")) {
            const mathProblem = message.match(/(\d+)\s*[x*÷+-]\s*(\d+)/);
            if (mathProblem) {
                const num1 = parseInt(mathProblem[1]);
                const num2 = parseInt(mathProblem[2]);
                const operator = message.match(/[x*÷+-]/)[0];

                let result;
                switch (operator) {
                    case 'x': case '*':
                        result = num1 * num2;
                        break;
                    case '/': case '÷':
                        result = num1 / num2;
                        break;
                    case '+':
                        result = num1 + num2;
                        break;
                    case '-':
                        result = num1 - num2;
                        break;
                }
                return `Sonuç: ${result}`;
            }
            return "Lütfen geçerli bir matematiksel işlem girin.";
        }

        //  motivasyon
        if (lowerCaseMessage.includes("motivasyon cümleleri öner")) {
            return getRandomResponse([
                "Başlamak bitirmenin yarısıdır. – H. Jackson Brown",
                "Bir işin yapılması için, sadece yapılması gerektiğine inanmak gerekir.",
                "İyi işler kötü insanlardan çıkmaz. – Konfüçyüs",
                "Gülümsersen, dünya seninle gülümser."
            ]);
        }

        //  espri
        if (lowerCaseMessage.includes("espri yap") || lowerCaseMessage.includes("soğuk espri yap")) {
            return getRandomResponse([
                "Bir inek neden bilgisayar kullanamaz? Çünkü fareyi sevmez. 🐄",
                "Bir kitap neden üzgündü? Çünkü sayfaları çeviriyordu. 📚",
                "Bir robot neden parkta durmaz? Çünkü her zaman 'sinyal yok' der. 🤖"
            ]);
        }

        if (lowerCaseMessage.includes("naber") || lowerCaseMessage.includes("nasılsın")) {
            return getRandomResponse([
                "iyiyim teşekkürler sana nasıl yardımcı olabilirim?",
                "i"
            ]);
        }

        if (lowerCaseMessage.includes("naber") || lowerCaseMessage.includes("nasılsın")) {
            return getRandomResponse([
                "iyiyim teşekkürler sana nasıl yardımcı olabilirim?",
                "nasıl orduğumu sorduğun için teşekkür ederim şimdi sorduğun soruları cevaplamak için sabırsızlanıyorum"
            ]);
        }
        

        // cevap bulunamıyorsa
        return "Üzgünüm, konun gayet güzel ve cevap vermeye değer görünüyor ama bu konuda bir şey bulamadım. Lütfen daha anlaşılır bir şekilde yazınız , unutmayın bazen konuyu az ve öz yazmak en iyisidir.";

    } catch (error) {
        console.error("Bir hata oluştu: ", error);
        return "Bir hata oluştu, lütfen tekrar deneyin.";
    }
}

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "tr-TR";
    recognition.start();

    recognition.onresult = function(event) {
        const userInput = event.results[0][0].transcript;
        const chatBox = document.getElementById("infomate");

        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user");
        userMessage.textContent = userInput;
        chatBox.appendChild(userMessage);

        setTimeout(() => {
            const botMessage = document.createElement("div");
            botMessage.classList.add("chat-message", "bot");
            botMessage.textContent = getBotReply(userInput);
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    };

    recognition.onerror = function(event) {
        console.error("Sesli komut hatası: ", event.error);
    };
}
