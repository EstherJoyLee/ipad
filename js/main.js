import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (e) {
  e.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", (e) => {
  e.stopPropagation();
});
window.addEventListener("click", function (e) {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}

function hideBasket() {
  basketEl.classList.remove("show");
}

// 검색!
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
  // 0.6초 이후에 focus method를 호출하는 이유:
  // input의 부모 요소인 .search-wrap이 visibility hidden이었다가
  // visible 로 변환되는데 transition을 0.4초로 설정하고
  // transition-delay를 0.2로 설정해두었기 때문이다.
  // visibility:hidden을 설정한 요소는 DOM에는 존재하지만 시각적으로는 숨겨져 있다.
  // Browser는 시각적으로 보이지 않는 요소에 대해 사용자 Event를 처리하지 않도록
  // 최적화되어 있기 때문에 해당 요소가 시각적으로 완전히 보여지는 상태가 되기 전까지는
  // 사용자와 상호작용할 수 없다. 따라서 search-wrap이 완전히 나타나기까지 걸리는
  // 0.6초라는 시간동안 해당 요소를 포함한 자식 요소는 사용자와 상호작용을 할 수 없기 때문에
  // search-wrap의 자식 요소인 input에 focus method를 발생시키려면 setTimeout으로
  // 0.6초라는 delay 시간을 강제해야 한다.
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

// 요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  this.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  this.classList.add("hide");
  playBtn.classList.remove("hide");
});

// '당신에게 맞는 iPad는?' 렌더링!
const itemsEl = document.querySelector("section.compare .items");
console.log(ipads);
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `
      <li style="background-color: ${color}"></li>
    `;
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">&#8361; ${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a class="link" href="${ipad.url}">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// FOOTER LINKS
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
