function converter() {
    let alturaInput = document.getElementById('altura').value;
    return parseFloat(alturaInput.replace(',', '.'));

}



function tmb() {
    var nome = document.getElementById('nome');
    var idade = document.getElementById('idade');
    var peso = document.getElementById('peso');
    var sexo = document.getElementById('sexo');
    var res1 = document.getElementById('res1');

    let altura = converter();

    if (nome.value.length <= 0 || idade.value.length <= 0 || altura.value.length <= 0 || peso.value.length <= 0 || sexo.value.length <= 0) {
        window.alert('[ERRO] Verifique os dados e tente novamente!');
    } else if ( sexo.value == 'Masculino') {
        var resultado = ((10 * Number(peso.value)) + (6.25 * altura) - (5 * Number(idade.value)) + 5);
        res1.innerHTML = `Olá <strong>${nome.value}</strong>, seu TMB é: <strong>${resultado.toFixed(2)}</strong> kcal`;
    } else {
        var resultado = ((10 * Number(peso.value)) + (6.25 * altura) - (5 * Number(idade.value)) - 161);
        res1.innerHTML = `Olá <strong>${nome.value}</strong>, seu TMB`
    }
}


function calcular() {
    var prot = document.getElementById('txtproteinas');
    var carb = document.getElementById('txtcarbo');
    var gord = document.getElementById('txtg');
    var res = document.getElementById('res1');

    if (prot.value.length == 0 || carb.value.length == 0 || gord.value.length == 0) {
        window.alert('[ERRO] Verifique os dados e tente novamente!');
    }   else {
        var p = Number(prot.value);
        var c = Number(carb.value);
        var g = Number(gord.value);
        var quatro = (p + c) * 4;
        var resultado = quatro + (g * 9);
        res.innerHTML = `O total de calorias é: <strong>${resultado}</strong> kcal`;
    }



}