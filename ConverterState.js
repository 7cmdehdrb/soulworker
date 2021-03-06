export var defaultState = {
  // 1. 무기 코드, 2. 컨버터 수, 3. n번째 옵션/수치, 4. 고정 여부
  itemCode: "undefined",
  converterCnt: 0,
  converterPoint: 0,
  options: {
    opt1: {
      option: 0,
      value: 0,
      lock: false,
    },
    opt2: {
      option: 1,
      value: 0,
      lock: false,
    },
    opt3: {
      option: 2,
      value: 0,
      lock: false,
    },
    opt4: {
      option: 3,
      value: 0,
      lock: false,
    },
  },
  beforeOptions: {
    opt1: {
      option: 0,
      value: 0,
    },
    opt2: {
      option: 1,
      value: 0,
    },
    opt3: {
      option: 2,
      value: 0,
    },
    opt4: {
      option: 3,
      value: 0,
    },
  },
};

export function resetState() {
  defaultState.itemCode = "undefined";
  defaultState.converterCnt = 0;
  defaultState.converterPoint = 0;
  defaultState.options = {
    opt1: {
      option: 0,
      value: 0,
      lock: false,
    },
    opt2: {
      option: 1,
      value: 0,
      lock: false,
    },
    opt3: {
      option: 2,
      value: 0,
      lock: false,
    },
    opt4: {
      option: 3,
      value: 0,
      lock: false,
    },
  };
  defaultState.beforeOptions = {
    opt1: {
      option: 0,
      value: 0,
    },
    opt2: {
      option: 1,
      value: 0,
    },
    opt3: {
      option: 2,
      value: 0,
    },
    opt4: {
      option: 3,
      value: 0,
    },
  };
}
