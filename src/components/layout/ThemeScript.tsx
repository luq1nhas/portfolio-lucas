// Roda antes da primeira pintura para aplicar o tema salvo sem "piscar".
// Padrão: escuro. A escolha do visitante fica em localStorage.
// A classe "js" habilita as animações de entrada (sem JS, o conteúdo fica visível).
const script = `(function(){var t="dark";try{var s=localStorage.getItem("theme");if(s==="light"||s==="dark")t=s}catch(e){}var d=document.documentElement;d.dataset.theme=t;d.classList.add("js")})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
