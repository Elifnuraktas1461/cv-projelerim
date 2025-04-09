// Dark Mode Toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };
  
  document.querySelector('#dark-mode-toggle').addEventListener('click', toggleDarkMode);
  
  // GSAP Animasyonu
  gsap.from(".recipe-card", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "bounce.out"
  });
  
  document.querySelectorAll(".recipe-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, duration: 0.3 });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3 });
    });
  });
  

  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const fullRecipe = button.nextElementSibling.nextElementSibling;
      if (fullRecipe.style.display === "none") {
        fullRecipe.style.display = "block";
        button.textContent = "Detayı Gizle";
      } else {
        fullRecipe.style.display = "none";
        button.textContent = "Detayı Gör";
      }
    });
  });
a
  function readRecipe(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';  // Türkçe sesli okuma
    window.speechSynthesis.speak(utterance);
  }
  
  document.querySelectorAll('.read-recipe').forEach(button => {
    button.addEventListener('click', () => {
      const recipeText = button.previousElementSibling.previousElementSibling.textContent;
      readRecipe(recipeText);
    });
  });
  