// 1 . Selecionar os elementos do html
// Que vai ser o forms
const form = document.querySelector("#form-gadgets");

const resposta = document.querySelector("#resposta");

// 2 . Comunicacao com a API
// Lembrete o codeverse tem APIKey ou seja senha nas req.

const apiKey = "cv_YdORvvRegKPEHIywaYwWPsE4ExrywMjTv0Kw1t2BrdS5USthKxWECA5ImuAFdNFG";

// Tem que falar o link (endpoint)
const apiUrl = "https://api-ds.codeverse.dev.br/api/gadgets";

// 3. Capturar o evento de click do form

form.addEventListener("submit", async function (event) {
  //impede o comportamento padrao do forms, recarregar ou navegar para outra pagina automaticamente.
  event.preventDefault();

  //pegar os dados do form.

  const dados =  new FormData(form);

  //organizar esse objeto e  montar

  const gadget = {
      title: dados.get("title"),
      categoria: dados.get("categoria"),
      marca: dados.get("marca"),
      preco: dados.get("preco"),
      ano_lancamento: dados.get("ano_lancamento"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando heroi para a API....";

// 5 . Enviando a req para a API.

//trycatch é um bloco do js que executa alguma coisa que pode ter erros.
// caso aconteça um erro, (qq tipo) o bloco catch trata esse erro.

try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },

    //enviar os dados

    body: JSON.stringify(gadget),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = error;
    return;
  }

  if(respostaApi.ok){
    resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})