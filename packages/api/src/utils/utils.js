function getYearMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;
  return yearMonth;
}

function responseTransfromTrend(array) {
  return array.map((el) => el.populate[0]);
}

module.exports = {
  getYearMonth: getYearMonth,
  responseTransfromTrend: responseTransfromTrend,
};
