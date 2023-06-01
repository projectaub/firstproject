const api_key = "api_key=1aad75623eb6feb520bd924c01137fd1";
const base_url = "https://api.themoviedb.org/3";
const api_url =
  "https:api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" + api_key;
const img_url = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = base_url + "/search/movie?" + api_key;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWFkNzU2MjNlYjZmZWI1MjBiZDkyNGMwMTEzN2ZkMSIsInN1YiI6IjY0NzU1ZTg4YzI4MjNhMDEwNmRmNzM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7XqRGZIBWu1e1a2FhbhiRbjgBtGTV4PnTh61ZDIrrRc",
  },
};

let getmovies = (url) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      showmovies(data.results);
    });
};

getmovies(api_url);

let showmovies = (data) => {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
                        <img onclick="alert(${id})" id="alert" src="${
      img_url + poster_path
    }" alt="${title}" />
                        <div calss="movie-info">
                        <h3>${title}</h3>
                        <span class="green">${vote_average}</span>
                        </div>
                        <div class="overview">${overview}</div>`;
    main.appendChild(movieEl);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchterm = search.value;

  if (searchterm) {
    getmovies(searchURL + "&query=" + searchterm);
  }
});

// title(제목), overview(내용 요약), poster_path(포스터 이미지 경로),
// vote_average(평점) 이렇게 4가지 정보가 필수로 들어갑니다.
