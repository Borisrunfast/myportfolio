/* Tailwind build (bundled by Vite) */
import "./styles.css";

/* Runtime libraries */
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
  Events
} from "matter-js";

/* ─── DOM refs ─── */
const heroSection   = document.getElementById("hero");
const enterBtn      = document.getElementById("enter-game-btn");
const gameContainer = document.getElementById("game-container");
document.getElementById("year").textContent = new Date().getFullYear();

/* ─── Game constants ─── */
const PLAYER_SIZE = 48;      // px
const WALK_SPEED  = 10;       // px per physics tick (≈360 px/s @ 60 fps)
const JUMP_FORCE  = 0.12;    // upward impulse
const DAMPING     = 0.95;     // multiply vx by 0.8 each tick when no key held

/* ════════════════════════════════════════════════════════════════════════ */
/* ENTRY POINT: click “Enter” on hero section                               */
/* ════════════════════════════════════════════════════════════════════════ */
enterBtn.addEventListener("click", () => {
  heroSection.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  startMatterWorld();
});

/* ════════════════════════════════════════════════════════════════════════ */
/* MATTER-JS WORLD                                                           */
/* ════════════════════════════════════════════════════════════════════════ */
function startMatterWorld() {
  /* Create & size the <canvas> */
  const canvas = document.createElement("canvas");
  canvas.id = "game-canvas";
  canvas.className = "absolute inset-0";
  gameContainer.appendChild(canvas);

  /* Engine + Renderer */
  const engine = Engine.create();
  const render = Render.create({
    canvas,
    engine,
    options: {
      width      : window.innerWidth,
      height     : window.innerHeight,
      background : "transparent",
      wireframes : false
    }
  });
  Render.run(render);
  Runner.run(Runner.create(), engine);

  /* ─── BODIES ─── */
  const ground = Bodies.rectangle(
    window.innerWidth / 2, window.innerHeight - 25,
    window.innerWidth, 50,
    {
      isStatic : true,
      friction : 1,               // high friction so it doesn’t slide forever
      render   : { fillStyle: "#444" }
    }
  );

  const player = Bodies.rectangle(
    window.innerWidth / 2, window.innerHeight / 2,
    PLAYER_SIZE, PLAYER_SIZE,
    {
      frictionAir : 0.001,         // mild drag for a more natural mid-air feel
      render      : { fillStyle: "#fff" }
    }
  );
  Body.setInertia(player, Infinity); // lock rotation (cube stays upright)

  Composite.add(engine.world, [ground, player]);

  /* ─── CONTROLS (native key listeners) ─── */
  let canJump = false;
  const keys  = { left: false, right: false };

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
      case "a":
        keys.left  = true;
        keys.right = false;
        break;
      case "ArrowRight":
      case "d":
        keys.right = true;
        keys.left  = false;
        break;
      case "ArrowUp":
      case "w":
      case " ":
        if (canJump) {
          Body.applyForce(player, player.position, { x: 0, y: -JUMP_FORCE });
          canJump = false;
        }
        break;
      default:
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
      case "a":
        keys.left = false;
        break;
      case "ArrowRight":
      case "d":
        keys.right = false;
        break;
      default:
        break;
    }
  });

  /* Each tick: set velocity if key held, else apply damping */
  Events.on(engine, "beforeUpdate", () => {
    if (keys.left && !keys.right) {
      Body.setVelocity(player, { x: -WALK_SPEED, y: player.velocity.y });
    } else if (keys.right && !keys.left) {
      Body.setVelocity(player, { x:  WALK_SPEED, y: player.velocity.y });
    } else {
      // Neither key is held → slide by damping
      Body.setVelocity(player, {
        x: player.velocity.x * DAMPING,
        y: player.velocity.y
      });
    }
  });

  /* Reset jump entitlement when cube hits ground ------------------------ */
  Events.on(engine, "collisionStart", ({ pairs }) => {
    pairs.forEach(({ bodyA, bodyB }) => {
      if ((bodyA === player && bodyB === ground) ||
          (bodyB === player && bodyA === ground)) {
        canJump = true;
      }
    });
  });

  /* ─── RESPONSIVE RESIZE ─── */
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    render.options.width  = canvas.width  = w;
    render.options.height = canvas.height = h;

    Body.setPosition(ground, { x: w / 2, y: h - 25 });
    Body.setVertices(ground, [
      { x: 0,     y: h - 50 },
      { x: w,     y: h - 50 },
      { x: w,     y: h      },
      { x: 0,     y: h      }
    ]);
  }
  window.addEventListener("resize", resize);
}
