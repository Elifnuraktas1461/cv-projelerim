// Sepet verilerini tutacak kod
let sepet = JSON.parse(localStorage.getItem('sepet')) || [];

// Sepete ürün ekleme işlemi
function sepeteEkle(urunAdi, urunFiyati, urunResmi) {
    const urun = {
        ad: urunAdi,
        fiyat: urunFiyati,
        resim: urunResmi
    };
    sepet.push(urun);
    localStorage.setItem('sepet', JSON.stringify(sepet));  // Sepeti yerel depolamaya kaydetme
    alert(`${urunAdi} sepete eklendi!`);
}

// Sepeti görünum
function sepetiGoruntule() {
    const sepetListesi = document.getElementById('sepet-listesi');
    sepetListesi.innerHTML = ''; // Sepeti  sıfırlıyoruz

    if (sepet.length === 0) {
        sepetListesi.innerHTML = '<p>Sepetiniz boş.</p>';
        return;
    }

    sepet.forEach((urun, index) => {
        const urunElement = document.createElement('div');
        urunElement.classList.add('sepet-urun');
        urunElement.innerHTML = `
            <img src="${urun.resim}" alt="${urun.ad}">
            <span>${urun.ad} - ${urun.fiyat}₺</span>
            <button onclick="urunSil(${index})">Sil</button>
        `;
        sepetListesi.appendChild(urunElement);
    });
}

// Ürün silme işlemi
function urunSil(index) {
    sepet.splice(index, 1);
    localStorage.setItem('sepet', JSON.stringify(sepet)); // Sepeti güncelle
    sepetiGoruntule(); // Sepeti tekrar görüntüle
}

// Ödeme işlemi
function odemeIslemi() {
    if (sepet.length === 0) {
        alert('Sepetinizde ürün bulunmuyor.');
        return;
    }
    let toplamFiyat = sepet.reduce((toplam, urun) => toplam + urun.fiyat, 0);
    alert(`Toplam ödeme: ${toplamFiyat}₺`);
    sepet = []; // Sepeti boşalt
    localStorage.setItem('sepet', JSON.stringify(sepet)); // Sepeti güncelle
    sepetiGoruntule(); // Sepeti tekrar görüntüle
}

// Sayfa yüklendiğinde sepetteki ürünleri görüntüle
document.addEventListener('DOMContentLoaded', sepetiGoruntule);
