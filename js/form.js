//máscara do cep
$("#cepField").inputmask({"mask": "99999-999"});

//formulario
function btnEnviar() {
    $("#form").submit(function(e) {
        e.preventDefault();
    });

    var cep = document.getElementById("cepField").value;
    //remove traço da mascara
    cepst = cep.replace('-','');

    var cepUrl = "https://viacep.com.br/ws/" + cepst + "/json/";

    console.log(cepUrl)

    var p = cep.includes("_")

    if (p == true) {
        document.getElementById("erro").textContent="Preencha todos os números";
    }

    $.ajax({ 
        url: cepUrl, 
    });

    $.getJSON(cepUrl, function(data) {
        // JSON result in `data` variable
        document.getElementById("cep").textContent=data.cep;
        document.getElementById("estado").textContent=data.uf;
        document.getElementById("cidade").textContent=data.localidade;
        document.getElementById("rua").textContent=data.logradouro;
    
        if (data.erro == true) {
            document.getElementById("erro").textContent="CEP Inválido!";
            document.getElementById("result").classList.add('result-hide');
        } else {
            document.getElementById("erro").textContent="";
            document.getElementById("result").classList.remove('result-hide');
        }
    });
}