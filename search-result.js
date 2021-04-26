const TMDB_ENDPOINT_BASE = "https://api.themoviedb.org/3";
let maxFilmesPesquisa = 12;

function requisicaoAjaxAPI(route, queryString) {
    return $.ajax({
      // Passar a URL ENDPOINT BASE + /movie/now_playing
      url: TMDB_ENDPOINT_BASE + `${route}`,
      data: {
        api_key: "4ac8cd0541804d4edc5ca11d0e1fd84d",
        language: "pt-BR",
        region: "BR",
        ...(queryString && queryString.length ? { query: queryString } : {}),
      },
    })
}

function maisFilmes(event) {
    maxFilmesPesquisa += 8;
    pesquisaFilmes(maxFilmesPesquisa);
}

function deletaCampoDePesquisa() {
    console.log(document.querySelector("#inputSearch").value);
    document.querySelector("#inputSearch").value = "";
    console.log(document.querySelector("#inputSearch").value);
    return;
}

function pesquisaFilmes(qtdFilmes) {
    //Executar requisição AJAX
    console.log("Iniciando pesquisa");
  
    requisicaoAjaxAPI("/search/movie", sessionStorage.getItem("search_string"))
      // Receber o JSON
      .done(function (data) {
        
        console.log("Requisição finalizada com sucesso");
        let codigo_html = "";
        if(data.results.length == 0) {
            codigo_html = `
            <h5 class="col-12 d-flex justify-content-center">Sem resultados para essa pesquisa</h5>
            `
            $("#lista_filmes").html(codigo_html);
            console.log("Sem resultados de pesquisa");
            return;
        }

        console.log(data);
        sessionStorage.setItem("data", data);
  
        // Montar os cards
        for (i = 0; i < qtdFilmes; i++) {
          titulo = data.results[i].title;
          imagem =
            "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
          descricao = data.results[i].overview;
          // concatenar o código
          codigo_html += `<div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"><div class="card" style="width: 18rem">
                  <img
                      src="${imagem}"
                      class="card-img-top"
                      alt="${titulo}"
                  />
                  <div class="card-body">
                      <h5 class="card-title">${titulo}</h5>
                      <p class="card-text line-clamp">${descricao}</p>
                      <a href="#" class="btn btn-primary">Abrir filme</a>
                  </div>
                  </div>
              </div>`;
        }
        // Repassar os cards para a página
        $("#lista_filmes").html(codigo_html);
      })
      .fail(function (data) {
        console.log("Eh.... Deu ruim");
        console.log(data);
      });
      console.log(sessionStorage.getItem("search_string"));
      console.log("Fim da função de pesquisa");
}

$(document).ready(function () {
    pesquisaFilmes(maxFilmesPesquisa);

    $(".icone-lupa").click(() => {
      sessionStorage.setItem("search_string", document.querySelector("#inputSearch").value);
      location.assign("./search-result.html");
      pesquisaFilmes(maxFilmesPesquisa);
    });
  });
