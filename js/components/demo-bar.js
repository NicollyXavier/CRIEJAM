import { $, $$ } from '../utils/dom.js';
import { STATES } from '../data/states.js';
import { state } from '../state.js';
import { renderCitizenView } from './citizen-view.js';

/** Botões de situação do processo (modo demonstração). */
function initStateButtons() {
  const bar = $('#stateBar');

  STATES.forEach((s, index) => {
    const button = document.createElement('button');
    button.textContent = s.label;
    button.setAttribute('aria-pressed', String(index === 0));

    button.addEventListener('click', () => {
      state.current = index;
      state.tab = s.hasCommunication ? 1 : 0;
      $$('button', bar).forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
      renderCitizenView();
    });

    bar.append(button);
  });
}

/** Alterna entre as três telas (cidadão, tribunal, governança). */
function initViewSwitcher() {
  const buttons = $$('[data-v]');

  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      $$('.view').forEach((view) => (view.hidden = view.id !== button.dataset.v));
    }),
  );
}

/** Botão A+ (aumenta o texto). */
function initZoom() {
  $('#zoom').addEventListener('click', (e) => {
    const on = document.body.classList.toggle('big');
    e.currentTarget.setAttribute('aria-pressed', String(on));
  });
}

export function initDemoBar() {
  initStateButtons();
  initViewSwitcher();
  initZoom();
}
