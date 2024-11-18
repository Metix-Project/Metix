// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var position = sessionStorage.CARGO_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var imagem = sessionStorage.IMAGEM_USUARIO;
    var empresa = sessionStorage.EMPRESA_USUARIO;

    var profileName = document.getElementById("profileName");
    var profilePosition = document.getElementById("profilePosition");
    var profileBusiness = document.getElementById("profileBusiness");

    if (email != null && nome != null && empresa != null) {
        profileName.innerHTML = nome;
        profilePosition.innerHTML = "Cargo: " + position;
        profileBusiness.innerHTML = empresa;
        profileImage.src = imagem;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

