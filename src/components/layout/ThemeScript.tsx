// Roda antes da primeira pintura para aplicar o tema salvo sem "piscar".
// Padrão: escuro. A escolha do visitante fica em localStorage.
const script = `(function(){var t="dark";try{var s=localStorage.getItem("theme");if(s==="light"||s==="dark")t=s}catch(e){}document.documentElement.dataset.theme=t})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
