const filmler = [
    "Inception (2010)",
    "The Dark Knight (2008)",
    "Interstellar (2014)",
    "Pulp Fiction (1994)",
    "The Matrix (1999)",
    "Fight Club (1999)",
    "The Godfather (1972)",
    "Forrest Gump (1994)",
    "The Shawshank Redemption (1994)",
    "The Lord of the Rings: The Return of the King (2003)"
];

function filmOner() {
    const rastgeleFilm = filmler[Math.floor(Math.random() * filmler.length)];
    document.getElementById("film").innerText = "Önerilen Film: " + rastgeleFilm+"harika seçim iyi seyirler😍🍿";
}
