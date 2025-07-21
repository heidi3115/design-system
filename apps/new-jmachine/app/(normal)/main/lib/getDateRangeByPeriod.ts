export function getDateRangeByPeriod(periodDays: number) {
  const today = new Date();
  const toDttDt = `${today.toISOString().split('T')[0]} 23:59:59`;

  const fromDate = new Date(today);

  fromDate.setDate(fromDate.getDate() - (periodDays - 1));

  const fromDttDt = `${fromDate.toISOString().split('T')[0]} 00:00:00`;

  return { fromDttDt, toDttDt };
}
