export function getCamposModificados<T extends object>(original: T, actualizado: T): Partial<T> {
  const cambios: Partial<T> = {};

  for (const key in actualizado) {
    if (
      Object.prototype.hasOwnProperty.call(actualizado, key) &&
      actualizado[key] !== original[key]
    ) {
      cambios[key] = actualizado[key];
    }
  }

  return cambios;
}