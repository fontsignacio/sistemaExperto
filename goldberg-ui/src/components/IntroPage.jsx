import React from 'react';
import '../styles/IntroPage.css';

const IntroPage = ({ onStart }) => (
  <section className="intro-hero">
    <div className="intro-card">
      <h1>Test de burnout</h1>
      <p>
        Haz el test de burnout de forma gratuita y con un resultado inmediato. 
        El test para evaluar el síndrome de burnout que puedes realizar aquí 
        es el CBI (Copenhagen Burnout Inventory test), un instrumento de cribado 
        reconocido por la comunidad científica internacional. La versión del test 
        que te proponemos está en español y se utiliza para el síndrome de burnout, 
        síndrome de desgaste profesional o, coloquialmente, síndrome del trabajador quemado.
      </p>
      <div className="buttons">
        <button onClick={onStart} className="btn btn-primary">
          HAZ EL TEST
        </button>
        <a
          href="https://frtutneduar-my.sharepoint.com/:w:/g/personal/mariano_mercado_alu_frt_utn_edu_ar/EadoQGI-dMNOkcBmjbm2pN0BqPuLU2d9eZ1vCKH_YPLyNw?e=8WIXEq"
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
