export function makeReadble(id: number) {
  let stringNum = id.toString();
  if (stringNum.length === 1) {
    stringNum = '#000' + stringNum;
  }
  if (stringNum.length === 2) {
    stringNum = '#00' + stringNum;
  }
  if (stringNum.length === 3) {
    stringNum = '#0' + stringNum;
  }
  if (stringNum.length === 4) {
    stringNum = '#' + stringNum;
  }
  return stringNum;
}
