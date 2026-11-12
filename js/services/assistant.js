import { STATES } from '../data/states.js';
import { MOVEMENTS } from '../data/glossary.js';

const NO_DATA = 'Não encontrei isso nos dados do processo. Fale com seu advogado ou com a Defensoria.';
const NO_PREDICTION = 'Não é possível prever a decisão do juiz. Para avaliar suas chances, converse com seu advogado ou com a Defensoria Pública.';

/**
 * Assistente de dúvidas: responde apenas com base nos dados do processo,
 * sem aconselhamento jurídico e sem prever decisões.
 */
export function answer(question, stateIndex) {
  const s = STATES[stateIndex];
  const q = question.toLowerCase();
  const source = MOVEMENTS[s.movements - 1][0];

  let text;
  let cite = true;

  if (/ganh|vence|chance|perd/.test(q)) {
    text = NO_PREDICTION;
    cite = false;
  } else if (/prazo|data|quando|demor/.test(q)) {
    text = `${s.deadline}.${s.note ? ` ${s.note}` : ''}`;
  } else if (/fazer|preciso|devo/.test(q)) {
    text = `${s.action}. ${s.description}`;
  } else if (/o que|significa|andamento|acontec|etapa/.test(q)) {
    text = s.summary;
  } else {
    text = NO_DATA;
    cite = false;
  }

  return cite ? `${text} (Fonte: movimentação “${source}”)` : text;
}
