function filmOner() {
    const filmAdi = document.getElementById("filmInput").value.trim().toLowerCase();
    
    if (filmAdi === "") {
        document.getElementById("film").innerText = "Lütfen bir film ismi girin!";
        return;
    }

    const cevaplar = {
        "bilim kurgu": "Interstellar, (2014)Inception Blade, Runner 2049 .",
        "korku":"Hereditary (2018) , The Conjuring , Get Out ",
        "komedi":"The Grand Budapest Hotel , superbad , Yes Man ",
        "romantik":"La La Land , Pride & Prejudice , Before Sunrise",
        "dram":"the green mile , The Pursuit of Happyness , Forrest Gump",
        "Gerilim":"gone girl , Shutter Island , prisonners",
        "aksiyon":"Mad Max: Fury Road , John Wick , Gladiator",
        "fantastik":"The Lord of the Rings: The Fellowship of the Ring , Harry Potter and the Prisoner of Azkaban , Pan's Labyrinth",
        "animasyon":"coco , soul , up",
        "yerli film":"babam ve oglum , kelebekler , ahlat ağacı",
        "Polisiye / Suç ":"The Godfather , se7en , The Departed "
    };

    const cevap = cevaplar[filmAdi] || "bu kategoriyi bulamadım  anlaşılır bir biçimde  yazınız! Lütfen bilimkurgu , komedi , dram , korku , romantik , Gerilim , Aksiyon , Fantastik  ,Animasyon , Yerli Film , Polisiye / Suç  kategorilerinden yazınız🎥";
    
    document.getElementById("film").innerText = cevap;
}
