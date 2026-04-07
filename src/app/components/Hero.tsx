"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as PIXI from "pixi.js";
import { RGBSplitFilter, GlitchFilter } from "pixi-filters";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgLink = "https://res.cloudinary.com/dqky6oqrd/image/upload/v1774646685/eitwnqy6zyvvvgfyqeid.webp";

  useEffect(() => {
    let app: PIXI.Application;
    let rgbFilter: RGBSplitFilter;
    let glitchFilter: GlitchFilter;
    let sprite: PIXI.Sprite;
    let tl: gsap.core.Timeline;

    const initPixi = async () => {
      app = new PIXI.Application();
      
      // Inicializar Pixi v8
      await app.init({
        canvas: canvasRef.current!,
        width: 450,
        height: 562.5,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      const texture = await PIXI.Assets.load(imgLink);
      sprite = new PIXI.Sprite(texture);
      
      // Ajustar imagen para llenar el contenedor manteniendo aspecto
      const containerAspect = 450 / 562.5;
      const textureAspect = texture.width / texture.height;
      if (textureAspect > containerAspect) {
        sprite.height = 562.5;
        sprite.width = 562.5 * textureAspect;
      } else {
        sprite.width = 450;
        sprite.height = 450 / textureAspect;
      }

      sprite.anchor.set(0.5);
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;
      
      app.stage.addChild(sprite);

      // Filtros
      const bwFilter = new PIXI.ColorMatrixFilter();
      bwFilter.blackAndWhite(true);

      rgbFilter = new RGBSplitFilter({
        red: { x: 0, y: 0 },
        green: { x: 0, y: 0 },
        blue: { x: 0, y: 0 }
      });
      glitchFilter = new GlitchFilter({
        slices: 0,
        offset: 20
      });

      sprite.filters = [bwFilter, rgbFilter, glitchFilter];

      // Lógica de animación del ejemplo del usuario
      const randomInt = (min: number, max: number) => Math.random() * (max - min) + min;

      const runAnim = () => {
        tl = gsap.timeline({
          delay: randomInt(0, 3),
          onComplete: runAnim
        });

        tl.to(rgbFilter.red, {
          duration: 0.2,
          x: randomInt(-15, 15),
          y: randomInt(-15, 15)
        });

        tl.to(rgbFilter.red, {
          duration: 0.01,
          x: 0,
          y: 0
        });

        tl.to(rgbFilter.blue, {
          duration: 0.2,
          x: randomInt(-15, 15),
          y: 0,
          onComplete() {
            glitchFilter.slices = 20;
            glitchFilter.direction = randomInt(-75, 75);
          }
        }, "-=0.2");

        tl.to(rgbFilter.blue, {
          duration: 0.1,
          x: randomInt(-15, 15),
          y: randomInt(-5, 5),
          onComplete() {
            glitchFilter.slices = 12;
            glitchFilter.direction = randomInt(-75, 75);
          }
        });

        tl.to(rgbFilter.blue, {
          duration: 0.01,
          x: 0,
          y: 0,
          onComplete() {
            glitchFilter.slices = 0;
            glitchFilter.direction = 0;
          }
        });

        tl.to(rgbFilter.green, {
          duration: 0.2,
          x: randomInt(-15, 15),
          y: 0
        }, "-=0.2");

        tl.to(rgbFilter.green, {
          duration: 0.1,
          x: randomInt(-20, 20),
          y: randomInt(-15, 15)
        });

        tl.to(rgbFilter.green, {
          duration: 0.01,
          x: 0,
          y: 0
        });

        tl.timeScale(1.2);
      };

      runAnim();
    };

    initPixi();

    // Animaciones de entrada de la sección
    const scrollCtx = gsap.context(() => {
      gsap.from(".hero-headline", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 80%",
        }
      });

      gsap.from(".hero-bio", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 70%",
        }
      });

      gsap.from(".hero-image-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 60%",
        }
      });
    }, heroRef);

    return () => {
      if (app) app.destroy();
      if (tl) tl.kill();
      scrollCtx.revert();
    };
  }, [imgLink]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-inner">
        <div className="hero-content-grid">
          <div className="hero-text-side" ref={textRef}>
            <h1 className="hero-headline">
              Sergio <br />
              Muñoz.
            </h1>
            <div className="hero-bio">
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="hero-trajectory">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-main">Proyectos</a>
              <a href="#contact" className="btn btn-outline">Contacto</a>
            </div>
          </div>
          
          <div className="hero-image-side">
            <div className="hero-image-container">
              <canvas ref={canvasRef} className="pixi-canvas" />
            </div>
          </div>
        </div>
        
        <div className="hero-grid-decoration">
          <div className="grid-line line-v"></div>
          <div className="grid-line line-h"></div>
        </div>
      </div>
    </section>
  );
}
