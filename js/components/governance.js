import { $ } from '../utils/dom.js';
import { GLOSSARY } from '../data/glossary.js';

export function renderGlossaryTable() {
  $('#gloss').innerHTML = Object.entries(GLOSSARY)
    .map(([term, [title, text]]) => `<tr><td>${term}</td><td>${title}</td><td>${text}</td><td>Exemplo, pendente de revisão</td></tr>`)
    .join('');
}
