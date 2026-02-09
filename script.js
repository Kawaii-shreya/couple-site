const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const box = document.querySelector(".buttons");

const DODGE_DISTANCE = 60;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function moveYesButton() {
  const maxX = box.clientWidth - yesBtn.offsetWidth;
  const maxY = box.clientHeight - yesBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  yesBtn.style.transform = "none";
  yesBtn.style.left = `${x}px`;
  yesBtn.style.top = `${y}px`;
}


yesBtn.addEventListener("mouseenter", moveYesButton);

yesBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  moveYesButton();
});

yesBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveYesButton();
}, { passive: false });


box.addEventListener("mousemove", (e) => {
  const boxRect = box.getBoundingClientRect();
  const btnRect = yesBtn.getBoundingClientRect();

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const dx = mouseX - btnCenterX;
  const dy = mouseY - btnCenterY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < DODGE_DISTANCE) {
    const maxX = box.clientWidth - yesBtn.offsetWidth;
    const maxY = box.clientHeight - yesBtn.offsetHeight;

    const pushX = (-dx / (dist || 1)) * 90;
    const pushY = (-dy / (dist || 1)) * 60;

    const currentLeft = yesBtn.offsetLeft;
    const currentTop = yesBtn.offsetTop;

    const newLeft = clamp(currentLeft + pushX, 0, maxX);
    const newTop = clamp(currentTop + pushY, 0, maxY);

    yesBtn.style.transform = "none";
    yesBtn.style.left = `${newLeft}px`;
    yesBtn.style.top = `${newTop}px`;
  }
});

noBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background:linear-gradient(135deg,#ff9a9e,#fad0c4);
      text-align:center;
      padding:20px;
      font-family:sans-serif;
    ">
      <div>
        <h1>Nice try 😌💖</h1>
        <p style="font-size:18px;margin-top:10px;">You still can’t escape my love.</p>
      </div>
    </div>
  `;
});

