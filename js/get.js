const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-gadgets");
const modelo = document.querySelector("#modelo-gadget");


const apiKey = "cv_YdORvvRegKPEHIywaYwWPsE4ExrywMjTv0Kw1t2BrdS5USthKxWECA5ImuAFdNFG";

const apiUrl = "https://api-ds.codeverse.dev.br/api/gadgets";

async function buscarGadgets() {

  //Mostra uma msg.
  resposta.textContent="Carregando gadgets..."
  
  try {
    //Fazer o get
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    //Verificar se não deu certo
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os gadgets.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    //Percorrer todos os gadgets que esta dentro de resultado.
    for (const gadget of resultado.data){
      
      //fazer uma copia do modelo que criamos no html
      const card = modelo.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".title").textContent = gadget.name;
      card.querySelector(".nome").textContent = gadget.name;
      card.querySelector(".categoria").textContent = gadget.categoria;
      card.querySelector(".marca").textContent = gadget.marca;
      card.querySelector(".preco").textContent = gadget.preco;
      card.querySelector(".ano_lancamento").textContent = gadget.ano_lancamento;

      const imagem = card.querySelector(".imagem-gadget");

      if (gadget.imageUrl){
        imagem.src = gadget.imageUrl;
        imagem.alt = gadget.name;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      // adiciona o card preenchido na tela

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os gadgets. Tente novamente!" 
  }
}

// Executar no arquivo

buscarGadgets();