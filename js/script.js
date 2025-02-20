class AluguelGeral {
    constructor(nome_cliente, veiculo, quant_dia, valor_dia, data_retirada, preco_total) {
        this.nome_cliente = nome_cliente;
        this.veiculo = veiculo;
        this.quant_dia = parseInt(quant_dia); //vai garantir que é um numero
        this.valor_dia = parseFloat(valor_dia); //mesma coisa do de cima
        this.data_retirada = data_retirada;
        this.preco_total = parseFloat(preco_total); //armazena o valor total
    }
}

class AluguelCarros {
    constructor() {
        this.aluguel = [];
        this.listaCarros = document.getElementById("listaCarros");
    }

    //adiciona na tabela o aluguel
    adicionar_aluguel(aluguel) {
        this.aluguel.push(aluguel);
    }

    //remove o aluguel da lista
    remover_aluguel(indice) {
        this.aluguel.splice(indice, 1);
        this.atualizar_tabela_aluguel();
    }

    //atualiza a tabela
    atualizar_tabela_aluguel() {
        //limpa antes, para nao ficar valores repetidos na hora de editar um aluguel
        this.listaCarros.innerHTML = "";

        this.aluguel.forEach((carro, index) => {
            this.listaCarros.innerHTML += `
            <tr>
                <td>${carro.nome_cliente}</td>
                <td>${carro.veiculo}</td>
                <td>${carro.quant_dia}</td>
                <td>R$ ${carro.valor_dia.toFixed(2)}</td>
                <td>R$ ${carro.preco_total.toFixed(2)}</td>
                <td>${carro.data_retirada}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editar_aluguel(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="gerencia_aluguel.remover_aluguel(${index})">Remover</button>
                </td>
            </tr>
            `;
        });
    }
}

let gerencia_aluguel = new AluguelCarros();

const form = document.querySelector(".form-aluguel");
const form_indice = document.getElementById("indice");
const form_nome_cliente = document.getElementById("nome-cliente");
const form_veiculo = document.getElementById("veiculo");
const form_quant_dia = document.getElementById("quant-dias");
const botaoSubmit = document.getElementById("botao-submit");

//definindo o preço dos veiculos
const preco_veiculos = {
    "Creta 2025 1.0": 150,
    "Volkswagen Polo 1.2": 200,
    "Volkswagen T-Cross": 250
};

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const indice = form_indice.value.trim();
    const nome_cliente = form_nome_cliente.value.trim();
    const veiculo = form_veiculo.value;
    const quant_dia = parseInt(form_quant_dia.value.trim()); //uma funcção para sempre ser numero aqui
    const valor_dia = preco_veiculos[veiculo] || 0;
    const preco_total = valor_dia * quant_dia;

    let carro = new AluguelGeral(
        nome_cliente,
        veiculo,
        quant_dia,
        valor_dia,
        `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, //data e hora
        preco_total
    );
    

    if (indice === "") {
        gerencia_aluguel.adicionar_aluguel(carro);
    } else {
        gerencia_aluguel.aluguel[indice] = carro;
    }

    gerencia_aluguel.atualizar_tabela_aluguel();

    form.reset();
    form_indice.value = "";
    botaoSubmit.innerText = "Enviar";
});

function editar_aluguel(index) {
    const carro = gerencia_aluguel.aluguel[index];

    form_indice.value = index;
    form_nome_cliente.value = carro.nome_cliente;
    form_veiculo.value = carro.veiculo;
    form_quant_dia.value = carro.quant_dia;

    botaoSubmit.innerText = "Editar Aluguel";
}
