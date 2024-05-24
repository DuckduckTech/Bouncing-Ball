document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const colors = ["#61dafb", "#ff5733", "#33c4ff", "#ff33a6", "#33ff57"];
  const balls = [];
  const clickCounts = [];
  let ballCount = 1;
  const maxBalls = 10;

  function createBall(id) {
    const ball = document.createElement("div");
    ball.id = `ball${id}`;
    ball.classList.add("ball");
    ball.style.left = Math.random() * (window.innerWidth - 50) + "px";
    ball.style.top = Math.random() * (window.innerHeight - 50) + "px";
    ball.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(ball);

    let posX = parseFloat(ball.style.left);
    let posY = parseFloat(ball.style.top);
    let speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    let speedY = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const ballSize = 50;

    function animate() {
      posX += speedX;
      posY += speedY;

      if (posX >= window.innerWidth - ballSize || posX <= 0) {
        speedX *= -1;
        posX = Math.max(0, Math.min(posX, window.innerWidth - ballSize));
      }
      if (posY >= window.innerHeight - ballSize || posY <= 0) {
        speedY *= -1;
        posY = Math.max(0, Math.min(posY, window.innerHeight - ballSize));
      }

      ball.style.left = posX + "px";
      ball.style.top = posY + "px";

      requestAnimationFrame(animate);
    }

    ball.addEventListener("click", () => {
      clickCounts[id]++;
      ball.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
      speedY = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);

      if (
        (id === 0 && clickCounts[id] % 10 === 0 && ballCount < maxBalls) ||
        (id !== 0 && clickCounts[id] % 5 === 0 && ballCount < maxBalls)
      ) {
        createBall(ballCount);
        clickCounts.push(0);
        ballCount++;
      }

      if (ballCount >= maxBalls) {
        if (
          confirm(
            "What do you have against Balls? Why do you keep poking them so much? 😱"
          )
        ) {
          resetBalls();
        }
      }
    });

    balls.push(ball);
    clickCounts.push(0);
    animate();
  }

  function resetBalls() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    balls.length = 0;
    clickCounts.length = 0;
    ballCount = 1;
    createBall(0);
  }

  createBall(0);

  window.addEventListener("resize", () => {
    balls.forEach((ball, id) => {
      const posX = Math.min(
        parseFloat(ball.style.left),
        window.innerWidth - 50
      );
      const posY = Math.min(
        parseFloat(ball.style.top),
        window.innerHeight - 50
      );
      ball.style.left = posX + "px";
      ball.style.top = posY + "px";
    });
  });
});
