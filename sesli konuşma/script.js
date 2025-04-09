const textInput = document.getElementById("text-input");
const recordButton = document.getElementById("record-button");
const audioList = document.getElementById("audio-list");

// Seslendirme ve kaydetme işlevi
recordButton.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) {
    alert("Lütfen seslendirmek için bir metin girin.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "tr-TR";

  utterance.onend = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const audioURL = URL.createObjectURL(blob);
    addAudioToList(audioURL, text);
  };

  speechSynthesis.speak(utterance);
});

// Listeye kaydedilen sesi ekle
function addAudioToList(audioURL, text) {
  const li = document.createElement("li");

  const audio = document.createElement("audio");
  audio.src = audioURL;
  audio.controls = true;

  const playButton = document.createElement("button");
  playButton.textContent = "Dinle";
  playButton.classList.add("audio-controls");

  playButton.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    speechSynthesis.speak(utterance);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Sil";
  deleteButton.classList.add("audio-controls");

  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(audio);
  li.appendChild(playButton);
  li.appendChild(deleteButton);
  audioList.appendChild(li);
}
