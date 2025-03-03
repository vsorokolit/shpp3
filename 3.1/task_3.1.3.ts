interface AObject {
  [key: string]: undefined | { cvalue: undefined | number | string | AObject };
}

function summ(a: AObject): number {
  const x = Object.keys(a).map((k) => {
    const elem = a[k];
    const elemCvalue = elem?.cvalue;
    if (typeof elemCvalue === "undefined") return 2022;
    if (typeof elemCvalue === "number") return elemCvalue;
    if (typeof elemCvalue === "string") return +elemCvalue || 2022;
    if (typeof elemCvalue === "object") return summ(elemCvalue);
    return 2022;
  });
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i];
  }
  return sum;
}

let a: AObject = { hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: "2" } } }, test: undefined };
let sum = summ(a);
console.log(sum);