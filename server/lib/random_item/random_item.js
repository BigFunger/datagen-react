import { random } from 'lodash';

export function randomItem(arr, createUndefined) {
  const maxIndex = arr.length - 1;
  const minIndex = createUndefined ? -1 : 0;
  const index = random(minIndex, maxIndex, false);
  return arr[index];
}