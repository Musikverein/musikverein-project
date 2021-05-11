function getYearMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;
  return yearMonth;
}

module.exports = {
  getYearMonth: getYearMonth,
};
