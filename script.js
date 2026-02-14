// ===== Music =====
const playBtn = document.getElementById("playBtn");
const bgm = document.getElementById("bgm");
let playing = false;

playBtn.addEventListener("click", async () => {
  try{
    if(!playing){
      await bgm.play(); // needs click
      playing = true;
      playBtn.textContent = "⏸ Pause Music";
      burstHearts(18);
    }else{
      bgm.pause();
      playing = false;
      playBtn.textContent = "▶ Play Music";
    }
  }catch{
    alert("Make sure song.mp3 is uploaded in the same folder.");
  }
});

// ===== Slideshow (2 images) =====
const slideImg = document.getElementById("slideImg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots");

const slides = ["maria1.jpg","maria2.jpg"];
let idx = 0;
let timer = null;

function renderDots(){
  dots.innerHTML = "";
  slides.forEach((_,i)=>{
    const d = document.createElement("span");
    d.className = "dot" + (i===idx ? " active":"");
    d.addEventListener("click", ()=>goTo(i));
    dots.appendChild(d);
  });
}

function goTo(i){
  idx = (i + slides.length) % slides.length;
  slideImg.classList.add("fade");
  setTimeout(()=>{
    slideImg.src = slides[idx];
    slideImg.classList.remove("fade");
    renderDots();
  },180);
}

prevBtn.addEventListener("click", ()=>{ goTo(idx-1); burstHearts(10); });
nextBtn.addEventListener("click", ()=>{ goTo(idx+1); burstHearts(10); });

function startAuto(){
  stopAuto();
  timer = setInterval(()=>goTo(idx+1), 3000);
}
function stopAuto(){
  if(timer) clearInterval(timer);
  timer = null;
}

slideImg.addEventListener("mouseenter", stopAuto);
slideImg.addEventListener("mouseleave", startAuto);

renderDots();
startAuto();

// ===== Letter + Typewriter =====
const letterBtn = document.getElementById("letterBtn");
const letterBox = document.getElementById("letterBox");
const typeText = document.getElementById("typeText");

const letterLines = [
  "Maria,",
  "You make everything feel warmer and brighter.",
  "When I think about you, my heart becomes calm.",
  "Your smile is my favorite place, and your name is my favorite notification.",
  "",
  "So I made this love page—because you deserve something special.",
  "Always 💖"
];

let typed = false;

letterBtn.addEventListener("click", ()=>{
  letterBox.classList.toggle("hidden");
  if(!letterBox.classList.contains("hidden")){
    burstHearts(22);
    if(!typed){
      typed = true;
      typewriter(letterLines.join("\n"), typeText, 18);
    }
  }
});

function typewriter(text, el, speed){
  el.textContent = "";
  let i = 0;
  const tick = ()=>{
    el.textContent = text.slice(0,i);
    i++;
    if(i <= text.length) setTimeout(tick, speed);
  };
  tick();
}

// ===== Yes / No Buttons =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answer = document.getElementById("answer");

yesBtn.addEventListener("click", ()=>{
  answer.textContent = "YAY! 💖 Maria said YES! 🌹✨";
  burstHearts(40);
});

function moveNo(){
  const container = noBtn.parentElement; // .yn
  const rect = container.getBoundingClientRect();

  const maxX = rect.width - noBtn.offsetWidth;
  const maxY = rect.height - noBtn.offsetHeight;

  const x = Math.random() * Math.max(0, maxX);
  const y = Math.random() * Math.max(0, maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const teasing = [
    "No? 😳 try again...",
    "Not allowed 🙈",
    "Mariaaa 😭",
    "You can’t catch it 😄",
    "Okay okay… press Yes 💖"
  ];
  answer.textContent = teasing[Math.floor(Math.random()*teasing.length)];
  burstHearts(8);
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", (e)=>{ e.preventDefault(); moveNo(); }, {passive:false});

// ===== Floating Hearts =====
function spawnHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";

  const size = 10 + Math.random()*22;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${Math.random()*100}vw`;

  const colors = ["#ff1744","#ff2d55","#ff4d6d","#ff7aa2","#ff0033"];
  heart.style.background = colors[Math.floor(Math.random()*colors.length)];

  const dur = 4 + Math.random()*6;
  heart.style.animationDuration = `${dur}s`;

  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(), dur*1000);
}

function burstHearts(n){
  for(let i=0;i<n;i++) spawnHeart();
}

setInterval(spawnHeart, 520);
