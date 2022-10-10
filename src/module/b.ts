export const add = (a: number, b: number) => {
  console.log('I am module B add function');
  return a + b;
};

export const sub = (a: number, b: number) => {
  console.log('I am module B sub function');
  return a - b;
};

export const mul = (a: number, b: number) => {
  console.log('I am module B mul function');
  return a * b;
};

export const div = (a: number, b: number) => {
  console.log('I am module B div function');
  return Math.floor(a / b);
};
