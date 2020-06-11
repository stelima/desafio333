import React, { useEffect, useState } from 'react';

import './global.css'
import './App.css'
import Timer from './components/Timer'
import text from './text'
import { ReactComponent as HeaderImage } from './utils/header.svg'
import { ReactComponent as SectionImage } from './utils/section.svg'
import { ReactComponent as SectionImage2 } from './utils/section.svg'

function App() {
  const { ms, start, pause, stop, running, result} = Timer();
  const [words, setWords] = useState(0);
  const [ppm, setPPM] = useState(0)
  
  useEffect(() => {
    countWords()
    calcResultPPM()
  }, [running])

  const countWords = () => {
    let s = document.getElementsByClassName('text')[0].innerHTML
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    setWords(s.split(' ').length)
  }

 const calcResultPPM = () => {
   if(result !== 0) {
    const minutes = result/60
    setPPM(words/minutes)
   }
 }

  return (
    <div className='App'>
      <div className='menu'>Leitura Orgânica</div>
      <header>
      <h1>Você já parou para calcular a sua velocidade de leitura?</h1>
      <HeaderImage className='header-image' />
      </header>
      <div className='main'>
        <section>
        <SectionImage className='section-image' />
          <div class='description'>
          <h2>O que é?</h2>
            <p>Num mundo tão subjetivo quanto o da leitura, a velocidade de leitura é uma métrica objetiva que te permite saber como está a sua leitura nesse momento e te permite acompanhar a sua evolução!</p>
          </div>
        </section>

        <section>
          <div class='description'>
            <h2>Como funciona?</h2>
            <p>A medida mais utilizada para calcular a velocidade de leitura é Palavras por Minuto (PPM). Uma leitura em páginas por hora, por exemplo, não pode ser aplicada em qualquer livro (pois tem tamanhos diferentes de páginas), muito menos em artigos ou notícias.
            Que tal descobrir agora a sua velocidade de leitura?</p>
          </div>
          <SectionImage2 className='section-image' />
        </section>
        
        <div className='timer'>
        <p>Para realizar o teste clique em Iniciar e leia o texto abaixo, quando terminar clique em Finalizar</p>
          <button onClick={start}>Iniciar Teste</button>
          <h1>{Math.floor(ms / 1000)}s</h1>
        </div>
        <p className='text'>
          {text.text[0]}
        </p>
        <div className='timer'>
            <button onClick={pause}>Finalizar</button>
            {result > 0 ? <button onClick={stop}>Refazer Teste</button> : ''}
            {result > 0 ? <h1>Seu PPM é {ppm.toFixed(0)}</h1> : ''}
        </div>
      </div>
      <footer>
        <h4>Desenvolvido por <a href='https://github.com/stelima'>@stelima</a></h4>
      </footer>
    </div>
  );
}


export default App;
