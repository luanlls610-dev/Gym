const formatoISO = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function paraDataISO(data) {
  return formatoISO.format(data);
}

/** Retorna as datas de segunda a domingo da semana que contém a data informada. */
export function obterSemana(dataBase = new Date()) {
  const segunda = new Date(dataBase);
  segunda.setHours(0, 0, 0, 0);
  segunda.setDate(segunda.getDate() - ((segunda.getDay() + 6) % 7));

  return Array.from({ length: 7 }, (_, indice) => {
    const data = new Date(segunda);
    data.setDate(segunda.getDate() + indice);
    return paraDataISO(data);
  });
}

export function converterDataISO(valor) {
  const [ano, mes, dia] = valor.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

export function formatarDiaSemana(valor) {
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
    .format(converterDataISO(valor))
    .replace('.', '')
    .toUpperCase();
}

export function formatarDiaMes(valor) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' })
    .format(converterDataISO(valor))
    .replace('.', '');
}

export function formatarDataLonga(data = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(data);
}

export function formatarDuracao(minutos) {
  if (!Number.isFinite(minutos) || minutos < 0) return '—';
  const horas = Math.floor(minutos / 60);
  const restante = minutos % 60;
  return horas ? `${horas}h ${String(restante).padStart(2, '0')}min` : `${restante} min`;
}

export function obterSaudacao(data = new Date()) {
  const hora = data.getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}
