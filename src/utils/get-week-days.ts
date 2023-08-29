interface GetWeekDaysParams {
  isShort?: boolean;
}

export function getWeekDays(
  {
    isShort
  }:
    GetWeekDaysParams = {
      isShort: false,
    }) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: isShort ? 'short' : 'long',
  });

  return Array.from(Array(7).keys())
    .map(
      day => formatter.format(new Date(Date.UTC(2021, 5, day)))
    )
    .map(
      day => day.charAt(0).toUpperCase() + day.slice(1)
    );
}