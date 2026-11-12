import { $ } from '../utils/dom.js';
import { TOP_QUESTIONS, CONFUSING_TERMS } from '../data/dashboard.js';

const BAR_SCALE = 2.4; // converte % em largura da barra

export function renderCourtDashboard() {
  $('#bars').innerHTML = TOP_QUESTIONS
    .map(([question, pct]) => `<div class="bar"><div>${question}<i style="width:${pct * BAR_SCALE}%"></i></div><b>${pct}%</b></div>`)
    .join('');

  $('#terms').innerHTML = CONFUSING_TERMS
    .map(([term, tip]) => `<li class="terms__item"><b>${term}</b><br>${tip}</li>`)
    .join('');
}
