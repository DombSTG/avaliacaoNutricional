/* Correções futuras
    - Botão de voltar
    - Anti-burro no horario de treino
    - Se a frequencia é Sedentaria não abre as outras opções de digitação - CONCLUIDO
    - Não sumir o botao e nao perder o formulário
    - Independente da frequencia ele nao altera o resultado, trocar pra selecao perguntando se pratica atividade - CONCLUIDO
*/

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

    let peso;
// Função para calcular o TMB (Taxa Metabólica Basal)
function tmb() {
    var nome = document.getElementById('nome');
    var idade = document.getElementById('idade');
    peso = Number(document.getElementById('peso').value);
    var sexo = document.getElementById('sexo');
    var res1 = document.getElementById('res1');

    let alturaNum = converter();

    if (nome.value.length <= 0 || 
        idade.value.length <= 0 || 
        peso <= 0 || 
        sexo.value.length <= 0) {
        window.alert('[ERRO] Verifique os dados e tente novamente!');
        res1.innerHTML = 'Resultado:';
        return;
    }

    let resultado
    if ( sexo.value == 'Masculino') {
        resultado = ((10 * Number(peso)) + (6.25 * alturaNum) - (5 * Number(idade.value)) + 5);
    } else {
        resultado = ((10 * Number(peso)) + (6.25 * alturaNum) - (5 * Number(idade.value)) - 161);
    }
        res1.innerHTML = `Olá <strong>${nome.value}</strong>, seu TMB é: <strong>${resultado.toFixed(2)}</strong> kcal`;
    document.getElementById('gastoCalorico').style.display = 'block';
    document.getElementById('calc1').style.display = 'none';

    return resultado;

    }

// Função para ativar o restante caso seja resposta sim
function ativarForm() {
    let fativ = document.getElementsByName('ativ')
    const res4 = document.getElementById('res4')
    let taxa = tmb()

    if (fativ[0].checked) {
        document.getElementById('valores3').style.display = 'block'
        document.getElementById('avancar').style.display = 'none'
    } else if (fativ[1].checked) {
        res4.innerHTML = `Seu gasto energético diário é <strong>${taxa.toFixed(2)}</strong> kcal (sem atividade física)`;
        document.getElementById('dieta').style.display = 'block';
        document.getElementById('avancar').style.display = 'none'
    }
}

// Calcular TDEE
function calcularTDEE() {
    const frequencia = document.getElementById('freq');
    const tipo = document.getElementById('tipo');
    const duracao = Number(document.getElementById('duracao').value);
    const objetivo = document.getElementById('objetivo');
    const peso = parseFloat(document.getElementById('peso').value);
    const res3 = document.getElementById('res3');
    const dias = Number(document.getElementById('dias').value)
    let fativ = document.getElementsByName('ativ')
    let taxa = tmb(); // Chama a função tmb para obter o TMB

    if (tipo.value.length <= 0 || 
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

    let caloriasAtividade = (met * peso * duracao * dias) / 7; // Calcular calorias gasta na atividade por dia
    let tdee = taxa + caloriasAtividade; // Calcular TDEE

/*    if (objetivo.value === 'Perder Peso') {
        tdee -= 500; // Reduzir 500 kcal para perda de peso
    } else if (objetivo.value === 'Ganhar Massa') {
        tdee += 500; // Aumentar 500 kcal para ganho de massa
    }   */
    
    res3.innerHTML = `Seu gasto energético diário é <strong>${tdee.toFixed(2)}</strong> kcal`;

    document.getElementById('dieta').style.display = 'block';
    document.getElementById('calc3').style.display = 'none';
    return tdee;
    
}

// Função do total de Calorias da Dieta
function calcular() {
    let tdee = calcularTDEE()
    let objetivo = document.getElementById('objetivo').value
    let dieta = document.getElementById('escolhaDieta').value
    let res5 = document.getElementById('res5')

    let calorias;
    if (objetivo === "Perder Peso") {
        calorias = tdee - (tdee * 0.20) // -20%
    } else if (objetivo === "Manter Peso") {
        calorias = tdee;
    } else if(objetivo === "Ganhar Massa") {
        calorias = tdee + (tdee * 0.15); // +15%
    }
    
    let gramasProteina;
    if (dieta === "Padrão") {
        gramasProteina = peso * 2.2;
    } else {
        gramasProteina = peso * 1.8;
    }
    
    let kcalProteina = gramasProteina * 4 // Descobrindo calorias

    // Conta de Gordura
    let kcalGordura = calorias * 0.25;
    let gramasGordura = kcalGordura / 9;

    // Conta de Carbo
    let kcalCarbo = calorias - (kcalProteina + kcalGordura);
    let gramasCarbo = kcalCarbo / 4;

    res5.innerHTML = `
  <p><strong>Calorias da dieta:</strong> ${calorias.toFixed(0)} kcal</p>
  <p><strong>Proteínas:</strong> ${gramasProteina.toFixed(0)} g (${kcalProteina.toFixed(0)} kcal)</p>
  <p><strong>Gorduras:</strong> ${gramasGordura.toFixed(0)} g (${kcalGordura.toFixed(0)} kcal)</p>
  <p><strong>Carboidratos:</strong> ${gramasCarbo.toFixed(0)} g (${kcalCarbo.toFixed(0)} kcal)</p>
`;

    document.getElementById('calc5').style.display = 'none'

    
}

