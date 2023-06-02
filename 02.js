// api 사용하기위한 상수
const api_key = "api_key=1aad75623eb6feb520bd924c01137fd1";
const base_url = "https://api.themoviedb.org/3";
const api_url =
  "https:api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" + api_key;
const img_url = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = base_url + "/search/movie?" + api_key;
// api 를 가져오기위한 요구옵션
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWFkNzU2MjNlYjZmZWI1MjBiZDkyNGMwMTEzN2ZkMSIsInN1YiI6IjY0NzU1ZTg4YzI4MjNhMDEwNmRmNzM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7XqRGZIBWu1e1a2FhbhiRbjgBtGTV4PnTh61ZDIrrRc",
  },
};
//api를 fetch로 받아오는 화살표 함수
let getmovies = (url) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      showmovies(data.results);
    });
};
// getmovies 함수 실행
getmovies(api_url);
//화살표함수 , forEach를 돌린다 . data.results 에서 받은 데이터를  구조분해할당한 movie 상수로 forEach 해서 돌려버린다
let showmovies = (data) => {
  main.innerHTML = "";
  data.forEach((movie) => {
    // 구조분해 할당 .
    const { title, poster_path, vote_average, overview, id } = movie;
    // movieEl html 에 div 를 만들고 moviEl 에 movie 새로운 클래스를 생성한다.
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    // movieEl 그러니까 새로만든 div에 innerHTML을 사용해서 백틱 ``으로 html을 작성 ${변수}를 넣고 가져온 api에 따라서 반복되게
    movieEl.innerHTML = `
                        <img onclick="alert(${id})" id="alert" src="${
      img_url + poster_path
    }" alt="${title}" />
                        <div calss="movie-info">
                        <h3>${title}</h3>
                        <span class="green">${vote_average}</span>
                        </div>
                        <div class="overview">${overview}</div>`;
    // 메인의 하위요소에 moveEl을 추가한다 main 위의 상수에서 선언했듯이 html에 있는 id main 부분
    main.appendChild(movieEl);
  });
};
// 해당 요소에서 이벤트가 발생했을때 호출할 함수를 등록
form.addEventListener("submit", (e) => {
  //이벤트 발생시 기본동작 을 취소한다 .기본동작은 sumit(제출)을 막아줌
  e.preventDefault();
  const searchterm = search.value;
  // searchterm 과 같은 true 이면 getmovies 함수에 showmovie 함수를 실행해라
  if (searchterm) {
    // query는 웹서버 정보를 찾기위해 사용된다 .
    getmovies(searchURL + "&query=" + searchterm);
  }
});

// title(제목), overview(내용 요약), poster_path(포스터 이미지 경로),
// vote_average(평점) 이렇게 4가지 정보가 필수로 들어갑니다.
