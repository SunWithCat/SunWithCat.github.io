/* ===================================================
   Summer Pockets 梦幻海蓝色泡泡点击特效
   =================================================== */
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const colors = ['rgba(30, 167, 225, 0.4)', 'rgba(0, 210, 255, 0.35)', 'rgba(224, 242, 254, 0.5)'];

  class Bubble {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 8 + 4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = -Math.random() * 2 - 1.5; // 泡泡向上浮动
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.01;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      // 泡泡的高光亮圈效果
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  }

  window.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
      particles.push(new Bubble(e.clientX, e.clientY));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();