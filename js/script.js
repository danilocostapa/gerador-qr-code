function generateQRCode() {
    // Coleta de valores dos inputs
    let content = document.getElementById('content').value;
    let color = document.getElementById('color').value.substring(1); // Remove a # do código da cor
    let size = document.getElementById('size').value; // Tamanho do QR Code
    let icon = document.getElementById('icon').files[0]; // Ícone para o centro
    let textBelow = document.getElementById('textBelow').value; // Texto abaixo do QR Code
    let qrcodeCanvas = document.getElementById('qrCanvas');
    let qrTextBelow = document.getElementById('qrTextBelow');
    let downloadBtn = document.getElementById('download');

    // Validação para garantir que o campo de conteúdo não esteja vazio
    if (content.trim() === "") {
        alert("Por favor, insira um texto ou URL válido!");
        return;
    }

    // Gerar o QR Code básico com a API
    let qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}&color=${color}`;

    // Gerar a imagem do QR Code
    let qrHTML = `<img src="${qrImage}" alt="QR Code" class="mt-3">`;

    // Se houver texto abaixo do QR Code, adicionar
    if (textBelow.trim() !== "") {
        qrHTML += `<p class='mt-2'>${textBelow}</p>`;
    }

    // Exibir o QR Code gerado
    qrcodeCanvas.innerHTML = qrHTML;

    // Se o ícone for selecionado, adicionar ao centro do QR Code
    if (icon) {
        let iconURL = URL.createObjectURL(icon);
        let qrCodeImage = new Image();
        qrCodeImage.src = qrImage;

        qrCodeImage.onload = () => {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;

            // Desenha o QR Code
            ctx.drawImage(qrCodeImage, 0, 0, size, size);

            // Desenha o ícone no centro do QR Code
            let iconImage = new Image();
            iconImage.src = iconURL;
            iconImage.onload = () => {
                let iconSize = size / 5; // Tamanho do ícone (20% do QR Code)
                let iconX = (size - iconSize) / 2;
                let iconY = (size - iconSize) / 2;

                ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);

                // Atualiza a imagem com o ícone
                let finalQRCode = canvas.toDataURL();
                qrcodeCanvas.innerHTML = `<img src="${finalQRCode}" alt="QR Code com Ícone" class="mt-3">`;
            };
        };
    }

    // Exibir texto abaixo, se houver
    qrTextBelow.innerHTML = textBelow ? textBelow : '';

    // Preparar o link para download
    downloadBtn.href = qrImage;
    downloadBtn.classList.remove('d-none');
}
