import React from "react";
import "../styles/IntroPage.css";

const IntroPage = ({ onStart }) => (
  <section className="intro-hero">
    <div className="intro-card">
      <h1>Test de Bienestar Emocional y Riesgo de Burnout</h1>
      <p>
        Realiza gratuitamente y en solo unos minutos la autoevaluación basada en
        el cuestionario GHQ-12 (General Health Questionnaire de Goldberg),
        reconocido internacionalmente para detectar de forma temprana indicios
        de malestar psicológico y riesgo de burnout. Tus respuestas se analizan
        al instante mediante nuestro Sistema Experto para Evaluar Bienestar
        Emocional y Riesgo de Burnout en Trabajadores, que combina las reglas de
        inferencia clínicas con los puntos de corte validados del GHQ-12 para
        ofrecerte un resultado claro y personalizado; recuerda, sin embargo, que
        esta información es puramente orientativa y no sustituye la valoración
        de un profesional de la salud mental.
      </p>
      <div className="buttons">
        <button onClick={onStart} className="btn btn-primary">
          HAZ EL TEST
        </button>
        <a
          href="https://drive.google.com/file/d/1xxzLe-6Ov1ZFQKL4MX94U9eufDbqF05Q/view?usp=sharing"
          target="_blank"
          rel="noopener"
          className="btn btn-secondary"
        >
          Ver PDF informativo
        </a>
      </div>
    </div>
  </section>
);

export default IntroPage;
