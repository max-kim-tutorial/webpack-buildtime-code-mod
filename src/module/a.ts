export const add = (a: number, b: number) => {
  console.log('I am module A add function');
  return a + b;
};

export const sub = (a: number, b: number) => {
  console.log('I am module A sub function');
  return a - b;
};

export const mul = (a: number, b: number) => {
  console.log('I am module A mul function');
  return a * b;
};

export const div = (a: number, b: number) => {
  console.log('I am module A div function');
  return Math.floor(a / b);
};
