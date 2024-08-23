function cadastrar() {
    aguardar();

    var razaoVar = razao_input.value;
    var fantasiaVar = fantasia_input.value;
    var emailVar = email_input.value;
    var cnpjVar = cnpj_input.value;
    var telefoneVar = telefone_input.value;

    var arrobaVar = emailVar.indexOf('@');
    var pontoVar = emailVar.indexOf('.');

    if (
        fantasiaVar.length <= 1
    ) {
        cardError.style.display = "block";
        mensagem_erro.innerHTML += "O nome fantasia tem de ter mais de 1 caractere.";

        finalizarAguardar();
        return false;
    } else if (
        arrobaVar == 0 || pontoVar == 0
    ) {
        cardError.style.display = "block";
        mensagem_erro.innerHTML += "O E-mail tem de ter @ e ponto.";

        finalizarAguardar();
        return false;
    } else if (
        cnpjVar.length != 14
    ) {
        cardError.style.display = "block";
        mensagem_erro.innerHTML += "O CPNJ só pode conter 14 dígitos.";

        finalizarAguardar();
        return false;
    } else if (
        telefoneVar != 13
    ) {
        cardError.style.display = "block";
        mensagem_erro.innerHTML += "O número de telefone só pode conter 13 dígitos.";

        finalizarAguardar();
        return false;
    } else if (
        razaoVar == '' ||
        fantasiaVar == '' ||
        emailVar == '' ||
        cnpjVar == '' ||
        telefoneVar == ''
    ) {
        cardError.style.display = "block";
        mensagem_erro.innerHTML += "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }

    fetch("../empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "applucation/json",
        },
        body: JSON.stringify({
            razaoServer: razaoVar,
            fantasiaServer: fantasiaVar,
            emailServer: emailVar,
            cnpjServer: cnpjVar,
            telefoneServer: telefoneVar,
        }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para a tela de Login...";

            setTimeout (() => {
                window.location = "login.html";
            }, "2000");

            limparFormulario();
            finalizarAguardar();
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

      return false;
}