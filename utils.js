export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

// 0~a 중에서 중복 없이 4개 뽑기

export function cFunction(a, exceptionData) {
  let array = [];

  while (1) {
    let temp = getRandomInt(0, a);
    if (!array.includes(temp) & !exceptionData.includes(temp)) {
      // 배열에 뽑은 값이 포함되어 있지 않고, 뽑은 값이 제외해야 하는 것에 포함되어 있지 않으면
      array.push(temp);
    }

    if (array.length >= 4 - exceptionData.length) {
      break;
    }
  }
  return array;
}
