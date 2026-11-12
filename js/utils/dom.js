/** Atalhos para consultar o DOM. */
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const SPRITE_URL = 'assets/icons/sprite.svg';

/** Retorna o HTML de um ícone do sprite SVG. */
export const icon = (name) =>
  `<svg aria-hidden="true"><use href="${SPRITE_URL}#${name}"/></svg>`;
