"use client";

import { useState } from "react";

const photos = [
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600"
];

export const AboutMe = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="am-section">
      <div className="about-container">
        <div className="about-content">
          <p className="about-text">
            Full-stack developer focused on creating clean, efficient web applications.
            Passionate about modern technologies and user experience.
          </p>

          <div className="skills-list">
            <span>React</span>
            <span>TypeScript</span>
            <span>Next.js</span>
            <span>Node.js</span>
          </div>
        </div>

        <div className="photo-carousel">
          <div className="carousel-container">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt=""
                className={`carousel-slide ${index === currentPhoto ? 'active' : ''}`}
              />
            ))}
          </div>

          <button className="carousel-btn prev" onClick={prevPhoto}>
            ←
          </button>
          <button className="carousel-btn next" onClick={nextPhoto}>
            →
          </button>
        </div>
      </div>
    </section>
  );
};