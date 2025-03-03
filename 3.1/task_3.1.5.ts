// Maybe one day I'll go deeper into this
// 1
function completeObject<T>(partialData: Partial<T>, completer: (data: Partial<T>) => T): T {
  return completer(partialData);
}

// 2
function completeObjectWithId<T extends { id: string }>(
  partialData: Omit<T, "id"> & Partial<Pick<T, "id">>,
  completer: (data: Omit<T, "id"> & Partial<Pick<T, "id">>) => T
): T {
  return completer(partialData);
}

// 3
function наштампувати<T>(SOMECLASS: new () => T, count: number): T[] {
  return Array.from({ length: count }, () => new SOMECLASS());
}

class Rectangle {
  w!: number;
  h!: number;
}
class Circle {
  radius!: number;
}

let aa: Rectangle[] = наштампувати(Rectangle, 10);
let b: Circle[] = наштампувати(Circle, 20);
