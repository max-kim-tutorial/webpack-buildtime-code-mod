import { add, sub, mul, div, otherFn } from './module/a';

(() => {
  console.log('IIFE 실행\n');
  console.log(`1 + 2 = ${add(1, 2)}\n`);
  console.log(`2 - 1 = ${sub(2, 1)}\n`);
  console.log(`5 * 2 = ${mul(5, 2)}\n`);
  console.log(`4 / 2 = ${div(4, 2)}\n`);
  console.log(`Other = ${otherFn(4, 2)}\n`);
})();
