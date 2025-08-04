// Função para converter a altura de metros para centímetros
// ou validar se já está em centímetros, retornando 0 em caso de erro
function converter() {
        let alturaInput = document.getElementById('altura').value;

    if (alturaInput.includes(',') || alturaInput.includes('.')) { // Se a altura tiver virgula ou ponto ele converte 
        let alturaNum = parseFloat(alturaInput.replace(',', '.'));

        if (isNaN(alturaNum) || alturaNum <= 0) {
            window.alert('[ERRO] Altura inválida! Por favor, insira um valor válido.');
            return 0; // Retorna 0 para indicar erro
        }
        return alturaNum * 100; // Converte metros para centímetros
    } else {
        let alturaNum = parseFloat(alturaInput);

        if (isNaN(alturaNum) || alturaNum <= 0) {
            window.alert('[ERRO] Altura inválida! Por favor, insira um valor válido.');
            return 0; // Retorna 0 para indicar erro
        }

        return alturaNum;
    }
}

// Função para calcular o TMB (Taxa Metabólica Basal)
function tmb() {
    var nome = document.getElementById('nome');
    var idade = document.getElementById('idade');
    var peso = document.getElementById('peso');
    var sexo = document.getElementById('sexo');
    var res1 = document.getElementById('res1');

    let alturaNum = converter();

    if (nome.value.length <= 0 || 
        idade.value.length <= 0 || 
        peso.value.length <= 0 || 
        sexo.value.length <= 0) {
        window.alert('[ERRO] Verifique os dados e tente novamente!');
        res1.innerHTML = 'Resultado:';
        return;
    }

    let resultado
    if ( sexo.value == 'Masculino') {
        resultado = ((10 * Number(peso.value)) + (6.25 * alturaNum) - (5 * Number(idade.value)) + 5);
    } else {
        resultado = ((10 * Number(peso.value)) + (6.25 * alturaNum) - (5 * Number(idade.value)) - 161);
    }
        res1.innerHTML = `Olá <strong>${nome.value}</strong>, seu TMB é: <strong>${resultado.toFixed(2)}</strong> kcal`;
    document.getElementById('gastoCalorico').style.display = 'block';
    document.getElementById('calc1').style.display = 'none';

    return resultado;

    }

function calcularTDEE() {
    const frequencia = document.getElementById('freq');
    const tipo = document.getElementById('tipo');
    const duracao = Number(document.getElementById('duracao').value);
    const objetivo = document.getElementById('objetivo');
    const peso = parseFloat(document.getElementById('peso').value);
    const res3 = document.getElementById('res3');
    let taxa = tmb(); // Chama a função tmb para obter o TMB

    if (frequencia.value.length <= 0 || 
        tipo.value.length <= 0 || 
        duracao <= 0 || 
        objetivo.value.length <= 0) {
        window.alert('[ERRO] Verifique os dados e tente novamente!');
        res3.innerHTML = 'Resultado:';
        return;
    } 
    let met;
    switch (tipo.value) {
        case 'Musculação':
            met = 6.0;
            break;
        case 'Corrida':
            met = 8.3;
            break
        case 'Caminhada':
            met = 3.5;
            break;
        default:
            met = 1.0; // Valor de Repouso
    }

    let caloriasAtividade = (met * peso * duracao) / 7; // Calcular calorias gasta na atividade por dia
    let tdee = taxa + caloriasAtividade; // Calcular TDEE

    if (objetivo.value === 'Perder Peso') {
        tdee -= 500; // Reduzir 500 kcal para perda de peso
    } else if (objetivo.value === 'Ganhar Massa') {
        tdee += 500; // Aumentar 500 kcal para ganho de massa
    }   
    
    res3.innerHTML = `Com base em seu objetivo: <strong>${tdee.toFixed(2)}</strong> kcal`;
    




}

// Função do total de Calorias da Dieta
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