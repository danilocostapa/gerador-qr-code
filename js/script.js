function generateQRCode() {
    let text = document.getElementById('text').value;
    let color = document.getElementById('color').value.substring(1); // Remove #
    let model = document.getElementById('model').value;
    let subtext = document.getElementById('subtext').value;
    let qrcodeDiv = document.getElementById('qrcode');
    let downloadBtn = document.getElementById('download');
    
    if (text.trim() === "") {
        alert("Por favor, insira um texto ou link válido!");
        return;
    }
    
    let qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}&color=${color}`;
    
    let qrHTML = `<img src="${qrImage}" alt="QR Code" class="mt-3">`;
    if (subtext.trim() !== "") {
        qrHTML += `<p class='mt-2'>${subtext}</p>`;
    }
    
    qrcodeDiv.innerHTML = qrHTML;
    
    downloadBtn.href = qrImage;
    downloadBtn.classList.remove('d-none');
}