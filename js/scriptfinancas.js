//Função para a API buscar os dados requisitados

 function getAPI(callback){

    const url = `https://economia.awesomeapi.com.br/${moedas}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data){
        let retorno = data
        callback(null, retorno)
    }else{
        callback('Não foi possivel obter resultado')
    }
    })
    .catch(error => {
        callback(error, null)
    })
 }



//Funcao para exibir as moedas principais no painel


 const moedaContainer = document.getElementById("moedaContainer");
 
 const moedas = "json/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,ARS-BRL,JPY-BRL,CHF-BRL"
 getAPI((erro, dados) => {
        // Loop através dos dados e criar divs para cada moeda
        for (const moeda in dados) {
            const moedaInfo = dados[moeda];
            const div = document.createElement("div");
            div.innerHTML = `

                <div class="ativos">
                <h4 id="titulo">${moedaInfo.code} ${moedaInfo.name}</h4>
                <p id="valor" class="valorMoeda" style="font-size: x-large;">Valor em R$ ${moedaInfo.bid}</p>
                <div class="infosMoeda">
                    <p id="variacao" style="color: orange; font-size: large;">Variação: ${moedaInfo.varBid}</p>
                    <p id="alta"style="color: blue; font-size: large;">Alta: ${moedaInfo.high} <i class="bi bi-arrow-up-right"></i></p>
                    <p id="baixa"style="color: red; font-size: large;">Baixa: ${moedaInfo.low} <i class="bi bi-arrow-down-right"></i></p>
                </div>
                <p id="data" style="text-align: end; font-size: small; color: white;"></p>
                                                                                                                                                                                </p>
            
            </div>
            `;
            moedaContainer.appendChild(div);
        }
    })




// Pega a cotacao da moeda
function cotarMoeda() {


    
   
    tituloMoedaCotada = document.getElementById("tituloMoedaCotada")
    precoMoedaCotada = document.getElementById("precoMoedaCotada")
    variacaoMoedaCotada = document.getElementById("variacaoMoedaCotada")
    valor = document.getElementById("currencySelect").value

    moedasConverter = valor + '-BRL'
    moedaConvertida = `${valor}BRL`
    

        fetch(`https://economia.awesomeapi.com.br/json/last/${moedasConverter}`)
        .then(response => response.json())
        .then( data => {
            

            tituloMoedaCotada.innerHTML = data[moedaConvertida].name
            precoMoedaCotada.innerHTML = "Preço: R$ " + data[moedaConvertida].bid
              
        })
        .catch((error) => {
            tituloMoedaCotada.innerHTML = "Falha na conversão da moeda"
        })
}


/*--------------Codigo do professor---------------*/


        // URL do endpoint
        const endpointURL = "https://economia.awesomeapi.com.br/xml/available/uniq";

        // Função para obter e processar o XML
        async function fetchAndProcessXML() {
            try {
                // Fazer a requisição para o endpoint
                const response = await fetch(endpointURL);
                const xmlText = await response.text();

                // Parse do XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                // Obter as tags dentro do XML
                const currencyTags = xmlDoc.getElementsByTagName("xml")[0].children;

                // Referência ao elemento select
                const selectElement = document.getElementById("currencySelect");

                // Adicionar opções ao select
                for (let i = 0; i < currencyTags.length; i++) {
                    const option = document.createElement("option");
                    option.value = currencyTags[i].tagName; // Nome da tag como value
                    option.text = currencyTags[i].tagName + ' - ' +currencyTags[i].textContent; // Conteúdo da tag
                    selectElement.add(option);
                }
            } catch (error) {
                console.error("Erro ao obter ou processar o XML:", error);
            }
        }

        // Chamar a função para carregar as opções quando a página carregar
        fetchAndProcessXML();
