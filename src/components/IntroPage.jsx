import React from "react";
import "../styles/IntroPage.css";

const IntroPage = ({ onStart }) => (
  <section className="intro-hero">
    <div className="intro-card">
      <h1>Test de Bienestar Emocional y Riesgo de Burnout</h1>
      <p className="lead">
  Descubre en pocos minutos tu nivel de bienestar emocional y el riesgo de burnout.
</p>

<p className="lead">
  Responde 12 preguntas del <strong>GHQ-12 de Goldberg</strong> y nuestro <strong>Sistema Experto</strong> analizará tus respuestas al instante para ofrecerte:
</p>

<ul>
  <li><strong>Diagnóstico orientativo</strong> del estado emocional, la fatiga y el riesgo de burnout.</li>
  <li><strong>Recomendaciones</strong> para mejorar tu bienestar laboral.</li>
  <li><strong>Informe inmediato</strong> y 100 % confidencial — no guardamos tus datos.</li>
</ul>

<blockquote>
  <strong>Nota:</strong> La información resultante es de carácter orientativo y no sustituye la valoración de un profesional de la salud mental.
</blockquote>
<break />
      <div className="buttons">
        <button onClick={onStart} className="btn btn-primary">
          HACER EL TEST
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
