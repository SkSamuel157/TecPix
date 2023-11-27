const campoSenha = document.querySelector("#senha");
const botaoMostrarSenha = document.querySelector("#botaoMostrarSenha");
const legenda = document.querySelector(".legenda");

botaoMostrarSenha.addEventListener("click", function(){
    const estadoAtualDoCampoDeSenha = campoSenha.getAttribute("type") === "password" ? "text" : "password"
    
    campoSenha.setAttribute("type", estadoAtualDoCampoDeSenha);

    legenda.innerHTML = estadoAtualDoCampoDeSenha === "password" ? "Mostrar Senha" : "Ocultar";
});

//AREA DA FOTO

var mediaStream;
var downloadLink = document.createElement('a');

function abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
        mediaStream = stream;
        const areaVideo = document.getElementById('camera');
        areaVideo.srcObject = stream;
    }).catch(function (error) {
        console.error('Erro ao acessar a câmera:', error);
    });
}

function tirarFoto() {
    const areaVideo = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = areaVideo.videoWidth;
    canvas.height = areaVideo.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(areaVideo, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL();
    const fotoDiv = document.getElementById('foto');
    fotoDiv.style.backgroundImage = `url(${imageDataURL})`;
    downloadLink.href = imageDataURL;
    downloadLink.download = 'foto.png';
    downloadLink.textContent = 'Clique para baixar';
    document.body.appendChild(downloadLink);
}

function fechar() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        const areaVideo = document.getElementById('camera');
        areaVideo.srcObject = null;
        mediaStream = null;
    }
}

function salvarFoto() {

    isPhotoSaved = true;
    localStorage.setItem('photoSaved', 'true');
    alert('Foto salva com sucesso!');
}
