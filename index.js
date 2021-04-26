const TMDB_ENDPOINT_BASE = "https://api.themoviedb.org/3";
let maxFilmesDestaque = 4;

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
  maxFilmesDestaque += 4;
  mostraFilmesEmDestaque(maxFilmesDestaque)
}

function deletaCampoDePesquisa() {
  console.log(document.querySelector("#inputSearch").value);
  document.querySelector("#inputSearch").value = "";
  console.log(document.querySelector("#inputSearch").value);
  return;
}

// Função que cria os cards dos filmes em cartaz
function mostraFilmesEmCartaz() {
  console.log("Mostra filmes em cartaz");
  //Executar requisição AJAX
  requisicaoAjaxAPI("/movie/now_playing") // Passar a URL ENDPOINT BASE + /movie/now_playing
    // Receber o JSON
    .done(function (data) {
      let codigo_html = "";

      // Montar os cards
      for (i = 0; i < 5; i++) {
        // concatenar o código do card com os dados do JSON
        titulo = data.results[i].title;
        imagem =
          "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
        descricao = data.results[i].overview;
        estreia = data.results[i].release_date;

        codigo_html += `<div class="carousel-item col-12">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 d-flex">
            <img class="justify-content-center" style="width:auto; max-height: 400px;" src="${imagem}" alt="${titulo}" />
          </div>
          <div class="lancamento-sinopse col-12 col-sm-12 col-md-6 col-lg-8">
            <h2>${titulo}</h2>
            <p class="line-clamp">
              <b>Sinopse:</b> ${descricao}
            </p>
            <p><b>Diretor:</b> Denis Villeneuve</p>
            <p>
              <b>Roteiro:</b> Eric Roth | Denis Villeneuve | Jon Spaihts
            </p>
            <p><b>Estreia:</b> ${estreia}</p>
            <p>
              <b>Elenco:</b> Timothée Chalamet | Rebecca Ferguson | Oscar
              Isaac | Zendaya
            </p>
            <p><b>Avaliação:</b></p>
            <span class="fa fa-star stars star1"></span>
            <span class="fa fa-star stars star2"></span>
            <span class="fa fa-star stars star3"></span>
            <span class="fa fa-star stars star4"></span>
            <span class="fa fa-star stars star5"></span>
          </div>
        </div>
      </div>`;
      }

      // Repassar os cards para a página
      $(".carousel-inner.row").html(codigo_html);
      console.log(document.querySelector(".carousel-item"));
      document.querySelector(".carousel-item").classList.add("active");
    })
    .fail(function(jqXHR, textStatus, msg){
      alert(msg);
 });
}

// Função que cria os cards dos filmes em destaque
function mostraFilmesEmDestaque(qtdFilmes) {
  console.log("Mostra filmes em destaque");
  //Executar requisição AJAX
  requisicaoAjaxAPI("/movie/popular")
    // Receber o JSON
    .done(function (data) {
      console.log(data)
      let codigo_html = "";

      // Montar os cards
      for (i = 0; i < qtdFilmes; i++) {
        // concatenar o código do card com os dados do JSON
        titulo = data.results[i].title;
        imagem =
          "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
        descricao = data.results[i].overview;

        codigo_html += `<div class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-3"<div class="card destaque-card">
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
      $(".destaque-card-group").html(codigo_html);
    })
    .fail(function(jqXHR, textStatus, msg){
      alert(msg);
 });
}

$(document).ready(function () {
  mostraFilmesEmCartaz();
  mostraFilmesEmDestaque(maxFilmesDestaque);

  $(".icone-lupa").click(() => {
    sessionStorage.setItem("search_string", document.querySelector("#inputSearch").value);
    location.assign("./search-result.html");
  });
});
