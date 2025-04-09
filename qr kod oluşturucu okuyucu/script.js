document.getElementById('generateBtn').addEventListener('click', function() {
    var text = document.getElementById('qrText').value;
    if (text) {
        var qrCodeContainer = document.getElementById('qrCodeContainer');
        qrCodeContainer.innerHTML = ""; 
        var qrCode = new QRCode(qrCodeContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        alert("Lütfen bir metin veya URL girin.");
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    var qrCodeContainer = document.getElementById('qrCodeContainer');
    var qrImage = qrCodeContainer.querySelector('img');
    if (qrImage) {
        var link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qr_code.png';
        link.click();
    } else {
        alert("Önce bir QR kod oluşturun.");
    }
});

document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('scanner').style.display = 'block';
    startScanner();
});

document.getElementById('stopScan').addEventListener('click', function() {
    stopScanner();
    document.getElementById('scanner').style.display = 'none';
});

function startScanner() {
    var video = document.getElementById('qrVideo');
    var scanner = new QrScanner(video, function(result) {
        alert('QR Kodu: ' + result.data);
        stopScanner();
        document.getElementById('scanner').style.display = 'none';
    });
    scanner.start();
}

function stopScanner() {
    var video = document.getElementById('qrVideo');
    var scanner = new QrScanner(video);
    scanner.stop();
}
