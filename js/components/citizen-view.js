import { $, $$, icon } from '../utils/dom.js';
import { daysUntil, formatRemaining } from '../utils/dates.js';
import { GLOSSARY, MOVEMENTS } from '../data/glossary.js';
import { STATES } from '../data/states.js';
import { state } from '../state.js';
import { answer } from '../services/assistant.js';

const QUICK_QUESTIONS = [
  'O que está acontecendo?',
  'Preciso fazer algo?',
  'Qual é o prazo?',
  'Vou ganhar?',
];

/* ---------- Templates ---------- */

function timelineTemplate(s) {
  const done = MOVEMENTS.slice(0, s.movements)
    .map(([term, date]) => {
      const [title, text] = GLOSSARY[term];
      return `<li class="step done"><div class="mark">${icon('check')}</div><div><b>${title}</b><span>${text}</span><small>${date} · termo oficial: ${term}</small></div></li>`;
    })
    .join('');

  const next = s.next
    ? `<li class="step"><div class="mark"></div><div><b>${s.next[0]}</b><span>${s.next[1]}</span></div></li>`
    : '';

  return done + next;
}

function communicationTemplate(s) {
  if (s.hasCommunication) {
    const remaining = formatRemaining(daysUntil(s.deadlineDate));
    return `<div class="comm"><span class="tag">Comunicação oficial</span><h4>Intimação para enviar um documento</h4><p><b>Em palavras simples:</b> o juiz pediu um comprovante de residência para continuar a análise.</p><div class="dl"><div><small>Prazo final</small><strong>02/12/2026</strong></div><div><small>Faltam</small><strong>${remaining}</strong></div></div><div class="warn"><b>Atenção:</b> ao abrir a comunicação oficial, você dá ciência e o prazo começa a contar.</div><div class="row"><button class="btn" id="open">Abrir comunicação oficial</button><button class="btn gh" id="law">Enviar dúvida ao meu advogado</button></div><div class="off" id="off" hidden><b>Texto oficial (exemplo)</b><br>Fica a parte autora intimada para, no prazo de 15 dias úteis, apresentar comprovante de residência atualizado.<br><small>Ciência registrada em <span id="cd"></span>.</small></div></div>`;
  }

  if (s.hasPrumo) {
    return `<div class="comm comm--info"><span class="tag">Entender as saídas</span><h4>Quer se preparar para a conversa de acordo?</h4><p>Pratique, sem compromisso, como funciona uma conciliação no simulador Prumo. É só treino e não vale como atendimento do tribunal.</p><div class="row"><button class="btn pu" id="prumo">Treinar no Prumo</button></div><div class="off" id="pm" hidden>Aqui o simulador Prumo seria aberto. (Ligação a ser feita com o repositório do Prumo.)</div></div>`;
  }

  return `<div class="plain">Nenhuma comunicação oficial nova. Se o tribunal enviar algo, aparecerá aqui, com um resumo simples e o prazo.</div>`;
}

function assistantTemplate(s) {
  const chips = QUICK_QUESTIONS.map((q) => `<button>${q}</button>`).join('');
  return `<div class="box ai"><h4>${icon('spark')}Tire sua dúvida <span class="tag">IA</span></h4><p>Respondo só com base nos dados do seu processo. Não dou aconselhamento jurídico nem prevejo decisões.</p>
    <div class="qs">${chips}</div>
    <form class="ask" id="af"><input id="aq" aria-label="Sua pergunta" placeholder="Escreva sua dúvida"><button class="btn pu">Enviar</button></form>
    <div class="ans" id="ans" aria-live="polite" hidden></div></div>`;
}

function template(s) {
  const timelineHidden = state.tab ? 'hidden' : '';
  const commHidden = state.tab ? '' : 'hidden';

  return `<section class="card">
    <div class="head"><div class="folder">${icon('folder')}</div><div><h2>Benefício do INSS</h2><div class="meta">Processo nº 5001234-56.2024.4.03.6100</div><div class="meta">Justiça Federal – TRF3 · Autor: Maria Silva · Réu: INSS</div></div><button class="fav" id="fav" aria-pressed="false">${icon('star')}Favoritar</button></div>
    <div class="st ${s.variant}" role="status"><div class="ico">${icon(s.icon)}</div><div><h3>${s.title}</h3><p>${s.description}</p>${s.note ? `<p class="note">${s.note}</p>` : ''}</div></div>
    <div class="pair"><div class="mini"><div class="ico">${icon('layers')}</div><div><small>Etapa atual</small><strong>${s.stage}</strong></div></div><div class="mini"><div class="ico">${icon('help')}</div><div><small>Preciso fazer algo agora?</small><strong>${s.action}</strong><small>${s.deadline}</small></div></div></div>
    <div class="tabs" role="tablist"><button class="tab" role="tab" data-t="0" aria-selected="${state.tab === 0}">${icon('clock')}Linha do tempo</button><button class="tab" role="tab" data-t="1" aria-selected="${state.tab === 1}">${icon('bell')}Comunicações ${s.hasCommunication ? '<span class="n">1</span>' : ''}</button></div>
    <div class="panel" ${timelineHidden} role="tabpanel"><ol class="steps">${timelineTemplate(s)}</ol>
      <div class="aside"><div class="box"><h4>${icon('book')}Resumo do seu processo</h4><p>${s.summary}</p></div>${assistantTemplate(s)}</div></div>
    <div class="panel panel--single" ${commHidden} role="tabpanel">${communicationTemplate(s)}</div>
  </section>`;
}

/* ---------- Eventos ---------- */

function bindEvents() {
  // Favoritar
  $('#fav').addEventListener('click', (e) => {
    const button = e.currentTarget;
    const wasOn = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!wasOn));
    button.lastChild.nodeValue = wasOn ? 'Favoritar' : 'Favoritado';
  });

  // Abas
  $$('.tab').forEach((tab) =>
    tab.addEventListener('click', () => {
      state.tab = Number(tab.dataset.t);
      renderCitizenView();
    }),
  );

  // Assistente de IA
  const showAnswer = (question) => {
    const box = $('#ans');
    box.textContent = answer(question, state.current);
    box.hidden = false;
  };

  $$('.qs button').forEach((b) => b.addEventListener('click', () => showAnswer(b.textContent)));

  $('#af').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = $('#aq').value.trim();
    if (value) showAnswer(value);
  });

  // Comunicação oficial
  const openButton = $('#open');
  if (openButton) {
    openButton.addEventListener('click', () => $('#dlg').showModal());
    $('#law').addEventListener('click', (e) => {
      e.target.textContent = 'Dúvida enviada';
      e.target.disabled = true;
    });
  }

  // Simulador Prumo
  const prumoButton = $('#prumo');
  if (prumoButton) prumoButton.addEventListener('click', () => ($('#pm').hidden = false));
}

/* ---------- API pública ---------- */

export function renderCitizenView() {
  $('#cit').innerHTML = template(STATES[state.current]);
  bindEvents();
}

/** Liga o diálogo de ciência (existe uma única vez na página) e faz a primeira renderização. */
export function initCitizenView() {
  $('#ok').addEventListener('click', () => {
    $('#dlg').close();
    $('#off').hidden = false;
    $('#cd').textContent = new Date().toLocaleDateString('pt-BR');
  });
  $('#no').addEventListener('click', () => $('#dlg').close());

  renderCitizenView();
}
