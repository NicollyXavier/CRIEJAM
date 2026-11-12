/**
 * Situações possíveis do processo (usadas na demonstração).
 *
 * label            → texto do botão na barra de demo
 * variant          → classe de cor do banner ('' = verde, a = âmbar, b = azul, p = roxo)
 * icon             → nome do ícone no sprite
 * title/description/note → conteúdo do banner principal
 * stage            → etapa atual
 * action           → "Preciso fazer algo agora?"
 * deadline         → texto do prazo
 * movements        → quantas movimentações já aconteceram
 * next             → [título, explicação] da próxima etapa (ou null)
 * summary          → resumo em linguagem simples
 */
export const STATES = [
  {
    label: 'Aguardando o juiz',
    variant: '',
    icon: 'gavel',
    title: 'Seu pedido está sendo analisado',
    description: 'Agora o juiz está avaliando o seu caso. Neste momento, você não precisa fazer nada.',
    note: 'Não há prazo definido para a decisão. Avisaremos quando houver novidade.',
    stage: 'Análise do juiz',
    action: 'Não, por enquanto',
    deadline: 'Nenhum prazo correndo',
    movements: 3,
    next: ['O juiz vai decidir', 'O juiz vai avaliar o caso e decidir se o pedido será aceito.'],
    summary: 'Você pediu um benefício ao INSS. O INSS respondeu. Agora o juiz analisa o caso para decidir se o pedido será aceito.',
  },
  {
    label: 'Prazo correndo',
    variant: 'a',
    icon: 'clock',
    title: 'Você precisa enviar um documento',
    description: 'O juiz pediu um comprovante de residência. Responda até 02/12/2026.',
    stage: 'Aguardando você',
    action: 'Sim, enviar um documento',
    deadline: 'Prazo final: 02/12/2026',
    deadlineDate: '2026-12-02',
    hasCommunication: true,
    movements: 4,
    next: ['Você envia o documento', 'Depois do envio, o juiz volta a analisar o caso.'],
    summary: 'O juiz precisa de um comprovante para continuar a análise. Abra a comunicação com calma e, se preferir, fale antes com seu advogado.',
  },
  {
    label: 'Audiência marcada',
    variant: 'b',
    icon: 'cal',
    title: 'Sua audiência está marcada',
    description: 'Dia 20/01/2027, às 10h. Chegue 30 minutos antes, com documento com foto.',
    stage: 'Audiência',
    action: 'Sim, comparecer à audiência',
    deadline: 'Audiência em 20/01/2027',
    hasPrumo: true,
    movements: 5,
    next: ['Você participa da audiência', 'As partes conversam para tentar um acordo, com ajuda de um conciliador.'],
    summary: 'Foi marcada uma audiência de conciliação. Nela, as partes tentam chegar a um acordo para encerrar o processo.',
  },
  {
    label: 'Decisão publicada',
    variant: 'p',
    icon: 'book',
    title: 'O juiz decidiu',
    description: 'A decisão foi publicada. Converse com seu advogado ou com a Defensoria para entender o que fazer.',
    stage: 'Decisão',
    action: 'Falar com seu advogado',
    deadline: 'Pode haver prazo para recorrer',
    movements: 6,
    next: null,
    summary: 'O juiz publicou a decisão do seu caso. Para entender o resultado e os próximos passos, procure seu advogado ou a Defensoria Pública.',
  },
];
