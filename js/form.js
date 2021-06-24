//máscara do cep
$("#cepField").inputmask({"mask": "99999-999"});

//busca cep
function buscaCEP() {
    //variável que armazena oque for inserido no campo cep
    var cep = document.getElementById("cepField").value;

    //remove traço da mascara
    cepst = cep.replace('-','');

    //verifica se o campo possui caracteres vazios
    var p = cep.includes("_");

    if (p == true) {
        document.getElementById("custom-erro").textContent="Insira todos os números!";
        document.getElementById("custom-consulta").classList.add('custom-consulta-hide');
    }

    //variavel 
    var cepUrl = "https://viacep.com.br/ws/" + cepst + "/json/";

    //faz a request 
    $.getJSON(cepUrl, function(data) {
        document.getElementById("cep").textContent=data.cep;
        document.getElementById("estado").textContent=data.uf;
        document.getElementById("cidade").textContent=data.localidade;
        document.getElementById("rua").textContent=data.logradouro;

        //verifica se houve erro no json
        switch (data.erro) {
            case true:
                document.getElementById("custom-erro").textContent="CEP Inválido!"
                document.getElementById("custom-consulta").classList.add('custom-consulta-hide');
              break;
        //se não houve erro, mostra os dados requisitados da json
            default :
                document.getElementById("custom-erro").textContent=""
                document.getElementById("custom-consulta").classList.remove('custom-consulta-hide');
              break;
          }
    });
}