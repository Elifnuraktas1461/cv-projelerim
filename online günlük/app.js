let passwordVerified = false;

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
}


function verifyPassword() {
  const password = document.getElementById('password').value;
  if (password === '1234') {
    passwordVerified = true;
    document.getElementById('password-container').style.display = 'none';
    document.getElementById('add-daily').style.display = 'block';
  } else {
    alert('Yanlış şifre!');
  }
}


function saveNote() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `<p>${noteText}</p><button onclick="deleteNote(this)">Sil</button>`;
    document.getElementById('notes-container').appendChild(note);
    noteInput.value = ''; 
  } else {
    alert('Not boş olamaz!');
  }
}


function deleteNote(button) {
  button.parentElement.remove();
}
