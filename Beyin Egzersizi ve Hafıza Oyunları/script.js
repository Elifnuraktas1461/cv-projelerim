  // Hızlı Okuma Testi
  const texts = [
    "Teknoloji hızla gelişiyor. Her geçen yıl, yeni inovasyonlar hayatımıza giriyor ve hayatımızı kolaylaştırıyor.",
    "Doğa, insanlık için en değerli kaynaktır. İnsanlar doğayı korumak için birçok farklı yöntem geliştirmiştir.",
    "Okuma alışkanlığı, zihni geliştirmenin en etkili yollarından biridir. Kitaplar, sadece bilgi edinmek için değil...",
    "İnsanlar doğa ile uyum içinde yaşamalıdır. Doğal dengeyi korumak, insanın sorumluluğudur.",
    "Dijital dünya hayatımızı şekillendiriyor. İnternetin yaygınlaşması ile birlikte insanlar arasındaki iletişim hızlandı."
];

let startTime;
function startReadingTest() {
    let randomText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById("gameArea").innerHTML = `
        <p id="text">${randomText}</p>
        <button onclick="endReadingTest()">Bitti</button>
    `;
    startTime = new Date();
}

function endReadingTest() {
    let endTime = new Date();
    let timeTaken = (endTime - startTime) / 1000;
    alert("Okuma süreniz: " + timeTaken + " saniye!");
}

// Kelime Tahmin Oyunu
const words = ["elma", "araba", "kalem", "bilgisayar", "telefon", "tablet", "kulaklık", "kivi", "kitap"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let shuffledWord = selectedWord.split("").sort(() => 0.5 - Math.random()).join("");

function startWordGuess() {
    document.getElementById("gameArea").innerHTML = `
        <p>Karışık Kelime: <b>${shuffledWord}</b></p>
        <input type="text" id="wordInput" placeholder="Tahmininizi girin">
        <button onclick="checkWordGuess()">Kontrol Et</button>
    `;
}

function checkWordGuess() {
    let guess = document.getElementById("wordInput").value.toLowerCase();
    if (guess === selectedWord) {
        alert("Tebrikler, doğru tahmin!");
    } else {
        alert("Yanlış! Tekrar deneyin.");
    }
}

// Matematik Problemleri Oyunu kodları
let num1, num2, correctAnswer;

function startMathGame() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    document.getElementById("gameArea").innerHTML = `
        <p>${num1} + ${num2} = ?</p>
        <input type="number" id="mathInput">
        <button onclick="checkMathAnswer()">Cevapla</button>
    `;
}

function checkMathAnswer() {
    let answer = parseInt(document.getElementById("mathInput").value);
    if (answer === correctAnswer) {
        alert("Doğru!");
    } else {
        alert("Yanlış, doğru cevap: " + correctAnswer);
    }
}


function flipCard(index) {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
        selectedCards.push(index);
        document.querySelectorAll('.memory-card')[index].innerText = shuffledCards[index];
        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [first, second] = selectedCards;
    if (shuffledCards[first] === shuffledCards[second]) {
        matchedCards.push(first, second);
    } else {
        setTimeout(() => {
            document.querySelectorAll('.memory-card')[first].innerText = '';
            document.querySelectorAll('.memory-card')[second].innerText = '';
        }, 1000);
    }
    selectedCards = [];
}

// Hızlı Tepki Testi
let reactionStartTime;
let reactionEndTime;

function startReactionTest() {
    document.getElementById("gameArea").innerHTML = `
        <p>Tepki vermek için "Başla" butonuna tıklayın!</p>
        <button id="startButton" onclick="startTest()">Başla</button>
    `;
}

function startTest() {
    document.getElementById("startButton").disabled = true;
    setTimeout(() => {
        document.getElementById("gameArea").innerHTML = `
            <p>Tıklayın!</p>
            <button onclick="endTest()">Tıkla!</button>
        `;
        reactionStartTime = new Date();
    }, Math.floor(Math.random() * 5000) + 1000);
}

function endTest() {
    reactionEndTime = new Date();
    let reactionTime = (reactionEndTime - reactionStartTime) / 1000;
    alert("Tepki süreniz: " + reactionTime + " saniye!");
}