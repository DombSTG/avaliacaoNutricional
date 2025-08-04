function calcular() {
    var prot = document.getElementById('txtproteinas');
    var carb = document.getElementById('txtcarbo');
    var gord = document.getElementById('txtg');
    var res = document.getElementById('res');

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