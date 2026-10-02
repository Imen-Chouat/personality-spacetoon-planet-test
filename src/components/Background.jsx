import React, { useEffect, useRef } from 'react';

export default function Background({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ==========================================================
    // 1. ADVANCED STAR SYSTEM (180 REALISTIC FLICKERING STARS)
    // ==========================================================
    const starCount = 180;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.3 + 0.3, // Tiny pinprick real star looks
      alpha: Math.random(),
      fadeState: Math.random() > 0.5 ? 'in' : 'out',
      fadeSpeed: Math.random() * 0.012 + 0.004,
    }));

    // ==========================================================
    // 2. METEORS / SHOOTING STARS ENGINE
    // ==========================================================
    const meteors = [];
    const spawnMeteor = () => {
      // Meteors travel from top-left/center down toward bottom-right
      meteors.push({
        x: Math.random() * (window.innerWidth * 0.8),
        y: -20,
        length: Math.random() * 80 + 40, // Length of the tail
        speed: Math.random() * 6 + 4,     // High-speed cruise velocity
        dx: Math.random() * 2 + 3,       // Angle components
        dy: Math.random() * 2 + 3,
        alpha: Math.random() * 0.5 + 0.5,
      });
    };

    // ==========================================================
    // 3. PLANETS INITIALIZATION MAP
    // ==========================================================
    const planetNames = [
      'action', 'sport', 'adventure', 'comedy', 'science',
      'zumorroda', 'bonbon', 'abjad', 'history', 'movies'
    ];

    const planetObjects = planetNames.map((name) => {
      const img = new Image();
      img.src = `/${name}.png`; 

      return {
        img,
        name,
        x: Math.random() * (window.innerWidth - 180) + 90,
        y: Math.random() * (window.innerHeight - 180) + 90,
        radius: Math.random() * 12 + 28, // Scaled size parameters
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.006,
      };
    });

    let animationId;

    // ==========================================================
    // 4. CORE RE-RENDERING ENGINE LOOP
    // ==========================================================
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // A. Draw & Relocate Realistic Vanishing Stars
      stars.forEach((star) => {
        if (star.fadeState === 'in') {
          star.alpha += star.fadeSpeed;
          if (star.alpha >= 1) star.fadeState = 'out';
        } else {
          star.alpha -= star.fadeSpeed;
          if (star.alpha <= 0) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.fadeState = 'in';
          }
        }

        ctx.beginPath();
        const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3.5);
        starGlow.addColorStop(0, `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`);
        starGlow.addColorStop(0.2, `rgba(147, 197, 253, ${Math.max(0, star.alpha * 0.4)})`); // Soft cyan astronomy flare glow
        starGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = starGlow;
        ctx.arc(star.x, star.y, star.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // B. Update & Render Meteors / Shooting Stars
      if (Math.random() < 0.015 && meteors.length < 4) {
        spawnMeteor(); // Random spawn parameters
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.speed * 0.7;
        m.y += m.speed * 0.7;

        // Clean up shooting stars when they travel off screen bounds
        if (m.x > canvas.width + 100 || m.y > canvas.height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        // Draw shooting star trailing gradient tail lines
        ctx.save();
        const tailGrad = ctx.createLinearGradient(m.x, m.y, m.x - m.length, m.y - m.length);
        tailGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        tailGrad.addColorStop(0.3, `rgba(165, 243, 252, ${m.alpha * 0.6})`); // Shifting into bright space cyan
        tailGrad.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Perfect fade tail
        
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y - m.length);
        ctx.stroke();
        ctx.restore();
      }

      // C. Process Physics Collisions & Render All 10 Planets
      planetObjects.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const margin = p.radius * 2;
        if (p.x < -margin) p.x = canvas.width + margin;
        if (p.x > canvas.width + margin) p.x = -margin;
        if (p.y < -margin) p.y = canvas.height + margin;
        if (p.y > canvas.height + margin) p.y = -margin;

        // Bounce calculations
        planetObjects.forEach((other) => {
          if (p === other) return;
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const distance = Math.hypot(dx, dy);
          const minDistance = p.radius + other.radius;

          if (distance < minDistance) {
            const nx = dx / distance;
            const ny = dy / distance;
            const kx = p.vx - other.vx;
            const ky = p.vy - other.vy;
            const impulse = 2 * (nx * kx + ny * ky) / 2;

            p.vx -= impulse * nx;
            p.vy -= impulse * ny;
            other.vx += impulse * nx;
            other.vy += impulse * ny;

            const overlap = minDistance - distance;
            p.x -= nx * (overlap / 2);
            p.y -= ny * (overlap / 2);
            other.x += nx * (overlap / 2);
            other.y += ny * (overlap / 2);
          }
        });

        // Safe rendering verify check
        if (p.img.complete && p.img.naturalWidth !== 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(p.img, -p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans select-none relative overflow-hidden">
      
      {/* 1. Dynamic Master Canvas Core */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />

      {/* 2. Spacetoon Northern Lights / Aurora Sky Glow Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/25 rounded-full blur-[130px] pointer-events-none mix-blend-screen animate-aurora-glow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-aurora-glow [animation-delay:5s]"></div>
      <div className="absolute top-[25%] left-[15%] w-[45vw] h-[45vw] bg-fuchsia-800/12 rounded-full blur-[110px] pointer-events-none mix-blend-screen animate-aurora-glow [animation-delay:9s]"></div>

      {/* 3. Render Injected Website Sections */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen w-full">
        {children}
      </div>
    </div>
  );
}
