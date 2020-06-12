module.exports = (init, final) => {
  const [yearInit, monthInit, dayInit] = init.split('-');
  const [yearFinal, monthFinal, dayFinal] = final.split('-');

  return {
    date: {
      $gte: new Date(yearInit, monthInit - 1, dayInit),
      $lte: new Date(yearFinal, monthFinal - 1, dayFinal),
    },
  };
};
