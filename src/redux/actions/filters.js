const setSortBy = (name) => ({//получает значение,создает объект с типом сетСортБай и значением popular, price, alphabet
  type: 'SET_SORT_BY',
  payload: name,
});


const setCategory = (catIndex) => ({
  type: 'SET_CATEGORY',
  payload: catIndex,
});

//тут действия связанные только с фильтрацией