// Saat güncelleme
function updateTime() {
    const timeElement = document.getElementById("time");
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");
    timeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Alarm kurulumu
let alarmTime = null;
let alarmDay = null;
let alarmReason = null;
let alarmFrequency = null; // Alarm sıklığı
let alarmInterval = null;
const setAlarmBtn = document.getElementById("set-alarm-btn");
const alarmSound = document.getElementById("alarm-sound");
const message = document.getElementById("message");
const alarmResponse = document.getElementById("alarm-response");
const timeLeftElement = document.getElementById("time-left");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

setAlarmBtn.addEventListener("click", () => {
    const alarmInput = document.getElementById("alarm-time");
    const alarmDayInput = document.getElementById("alarm-day");
    const alarmReasonInput = document.getElementById("alarm-reason");
    const alarmFrequencyInput = document.getElementById("alarm-frequency");

    alarmTime = alarmInput.value;
    alarmDay = alarmDayInput.value;
    alarmReason = alarmReasonInput.value.trim();
    alarmFrequency = alarmFrequencyInput.value; // Alarm sıklığı seçimini alıyoruz

    if (alarmTime && alarmDay && alarmReason) {
        message.innerText = `Alarm saati ${alarmTime}, günü ${alarmDay} olarak ayarlandı. Sebep: ${alarmReason}. Alarm sıklığı: ${getFrequencyText()}`;
        alarmInput.disabled = true;
        alarmDayInput.disabled = true;
        alarmReasonInput.disabled = true;
        alarmFrequencyInput.disabled = true;
        setAlarmBtn.disabled = true;
    } else {
        message.innerText = "Lütfen alarm saati, günü, sebebi ve sıklığını doldurun!";
    }
});

// Alarm sıklığına göre metin döndürme
function getFrequencyText() {
    switch (alarmFrequency) {
        case "once":
            return "Bir kez";
        case "daily":
            return "Her gün";
        case "weekly":
            return "Her hafta";
        case "custom":
            return "Özel aralıkla";
        default:
            return "Bilinmiyor";
    }
}

// Alarm kontrolü
function checkAlarm() {
    const currentTime = new Date();
    const currentDay = currentTime.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const currentFormattedTime = `${hours}:${minutes}`;

    // Alarm zamanı ve günü doğruysa, alarmı çal
    if (alarmTime === currentFormattedTime && alarmDay === currentDay) {
        alarmSound.play();
        message.innerText = `Alarm Çalıyor! Sebep: ${alarmReason}`;
        document.body.style.background = "linear-gradient(to right, #ff4040, #ff6060)";
        alarmResponse.style.display = "block";  // "Duydun mu?" sorusunu göster

        // Alarm sıklığına göre tekrar çalma mantığı
        handleAlarmFrequency();
    }
}

// Alarm sıklığına göre işlem
function handleAlarmFrequency() {
    switch (alarmFrequency) {
        case "daily":
            alarmInterval = setInterval(checkAlarm, 60000); // Her gün çalacak
            break;
        case "weekly":
            alarmInterval = setInterval(checkAlarm, 60000); // Her hafta çalacak
            break;
        case "custom":
            // Özel bir aralık belirlemek için ek mantık eklenebilir
            break;
        case "once":
        default:
            clearInterval(alarmInterval); // Alarm bir kez çalacak
            alarmSound.pause();
            alarmSound.currentTime = 0;
            alarmResponse.style.display = "none";
            break;
    }
}

// Alarm cevabını al
yesBtn.addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmResponse.style.display = "none";
    message.innerText = "Alarmı duyduğunuz için teşekkürler!";
    document.body.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)";
});

noBtn.addEventListener("click", () => {
    message.innerText = "Alarmı tekrar çalacak. Lütfen dikkat edin!";
    alarmResponse.style.display = "none"; // Alarm sorusunu gizle
    // Alarm tekrar çalacak şekilde işlem yapılabilir (Opsiyonel)
});

// Kalan süreyi hesaplayalım
function updateTimeLeft() {
    const now = new Date();
    const alarmDate = new Date(now);
    const [alarmHour, alarmMinute] = alarmTime.split(":");
    alarmDate.setHours(alarmHour, alarmMinute, 0, 0); // Alarm zamanı
    const timeDiff = alarmDate - now; // Kalan süreyi hesapla

    if (timeDiff > 0) {
        const hoursLeft = Math.floor(timeDiff / 3600000);
        const minutesLeft = Math.floor((timeDiff % 3600000) / 60000);
        const secondsLeft = Math.floor((timeDiff % 60000) / 1000);
        timeLeftElement.innerText = `Kalan Süre: ${hoursLeft} saat, ${minutesLeft} dakika, ${secondsLeft} saniye`;
    } else {
        timeLeftElement.innerText = "Alarm Zamanı Geldi!";
    }
}

// Saat ve kalan süreyi güncelle
setInterval(updateTime, 1000);
setInterval(updateTimeLeft, 1000);
setInterval(checkAlarm, 1000);
