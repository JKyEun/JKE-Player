// 패널 펼치기
const frame = document.querySelector("section");
const articleArr = frame.querySelectorAll("article");
const len = articleArr.length;
const deg = 360 / len;
const names = [
  "WAKE",
  "Before",
  "꿈",
  "눈빛",
  "너를본다면",
  "난 계속 아래로",
  "삼박자",
  "Wake and",
];

for (let i = 0; i < len; i++) {
  articleArr[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
  // 앨범 커버 이미지 적용
  const pic = articleArr[i].querySelector(".pic");
  pic.style.backgroundImage = `url("../img/${names[i]}.jpg")`;
  // 음악 태그 & 파일 적용
  const audio = document.createElement("audio");
  audio.setAttribute("src", `../music/${names[i]}.mp3`);
  audio.setAttribute("loop", "loop");
  audio.setAttribute("controls", "controls")
  articleArr[i].appendChild(audio);
}

// prev, next 버튼 액션 처리
const prevBtn = document.querySelector(".btnPrev--wrap");
const nextBtn = document.querySelector(".btnNext--wrap");

let num = 0; // 회전 각도 정하는 변수
let activeIdx = 0; // 활성화된 패널의 인덱스

prevBtn.addEventListener("click", () => {
  frame.style.transform = `rotate(${deg * ++num}deg)`;
  articleArr[activeIdx].classList.remove("on");
  if (activeIdx === 0) {
    activeIdx = len - 1;
  } else {
    activeIdx--;
  }
  articleArr[activeIdx].classList.add("on");
});

nextBtn.addEventListener("click", () => {
  frame.style.transform = `rotate(${deg * --num}deg)`;
  articleArr[activeIdx].classList.remove("on");
  if (activeIdx === len - 1) {
    activeIdx = 0;
  } else {
    activeIdx++;
  }
  articleArr[activeIdx].classList.add("on");
});

let before = 0; // 이전 패널 위치 기억 변수

// 앨범 커버 회전 & 음악 재생
for (let el of articleArr) {
  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");

  play.addEventListener("click", (e) => {
    if (before === 0) {
      before = e.target;
    } else if (before !== e.target) {
      const article = before.closest("article");
      article.querySelector(".pic").classList.remove("on");
      article.querySelector(".play").classList.remove("hide");
      article.querySelector(".pause").classList.add("hide");
      article.querySelector("audio").pause();
      before = e.target;
    }
    el.querySelector(".pic").classList.add("on");
    play.classList.add("hide");
    pause.classList.remove("hide");
    el.querySelector("audio").play();
  });

  pause.addEventListener("click", () => {
    el.querySelector(".pic").classList.remove("on");
    play.classList.remove("hide");
    pause.classList.add("hide");
    el.querySelector("audio").pause();
  });
}
