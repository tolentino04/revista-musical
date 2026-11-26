const paginas = [...document.querySelectorAll(".pagina")];
const botaoAnterior = document.getElementById("anterior");
const botaoProxima = document.getElementById("proxima");
const contador = document.getElementById("contador");
const barraProgresso = document.getElementById("barra-progresso");
const seletorPagina = document.getElementById("seletor-pagina");
let paginaAtual = 0;

paginas.forEach((_, i) => {
  const opcao = document.createElement("option");
  opcao.value = i;
  opcao.textContent = String(i + 1).padStart(2, "0");
  seletorPagina.appendChild(opcao);
});

function mostrarPagina(indice) {
  indice = Math.max(0, Math.min(indice, paginas.length - 1));
  paginas.forEach((pagina, i) => {
    pagina.classList.toggle("ativa", i === indice);
    if (i === indice) pagina.scrollTop = 0;
  });
  paginaAtual = indice;
  contador.textContent = `Página ${indice + 1} de ${paginas.length}`;
  barraProgresso.style.width = `${((indice + 1) / paginas.length) * 100}%`;
  botaoAnterior.disabled = indice === 0;
  botaoProxima.disabled = indice === paginas.length - 1;
  seletorPagina.value = String(indice);
}

botaoProxima.addEventListener("click", () => mostrarPagina(paginaAtual + 1));
botaoAnterior.addEventListener("click", () => mostrarPagina(paginaAtual - 1));
seletorPagina.addEventListener("change", evento => mostrarPagina(Number(evento.target.value)));

document.addEventListener("keydown", evento => {
  if (evento.key === "ArrowRight" && !document.getElementById("quiz-modal").classList.contains("aberto")) mostrarPagina(paginaAtual + 1);
  if (evento.key === "ArrowLeft" && !document.getElementById("quiz-modal").classList.contains("aberto")) mostrarPagina(paginaAtual - 1);
  if (evento.key === "Escape") fecharQuiz();
});

function irParaPagina(numero) { mostrarPagina(numero - 1); }
window.irParaPagina = irParaPagina;

const modal = document.getElementById("quiz-modal");
document.getElementById("abrir-quiz").addEventListener("click", () => {
  modal.classList.add("aberto");
  modal.setAttribute("aria-hidden", "false");
});
document.getElementById("fechar-quiz").addEventListener("click", fecharQuiz);
modal.addEventListener("click", evento => { if (evento.target === modal) fecharQuiz(); });
function fecharQuiz() {
  modal.classList.remove("aberto");
  modal.setAttribute("aria-hidden", "true");
}

const opcoes = [...document.querySelectorAll(".quiz-card .opcoes button")];
const resultado = document.getElementById("resultado");
opcoes.forEach(botao => {
  botao.addEventListener("click", () => {
    opcoes.forEach(item => { item.disabled = true; });
    const correta = botao.dataset.correct === "true";
    botao.classList.add(correta ? "correta" : "errada");
    resultado.textContent = correta
      ? "ACERTOU! O refrão é uma parte recorrente da canção. ★"
      : "QUASE! A resposta correta é B) Refrão. Tente novamente!";
  });
});
document.getElementById("reiniciar-quiz").addEventListener("click", () => {
  opcoes.forEach(item => { item.disabled = false; item.classList.remove("correta", "errada"); });
  resultado.textContent = "ESCOLHA UMA RESPOSTA!";
});

document.getElementById("tela-cheia").addEventListener("click", async () => {
  const alvo = document.querySelector(".revista");
  try {
    if (!document.fullscreenElement) await alvo.requestFullscreen();
    else await document.exitFullscreen();
  } catch (erro) {
    alert("A tela cheia não está disponível neste navegador.");
  }
});

mostrarPagina(0);
