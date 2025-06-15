import promptSync from 'prompt-sync';
const prompt = promptSync();

export class Alumno {
  nombre: string;
  edad: number;

  constructor() {
    this.nombre = prompt('Ingrese el nombre del alumno: ');
    this.edad = Number(prompt('Ingrese la edad del alumno: '));
  }

  public getData(): string {
    return `Alumno ${this.nombre} tiene ${this.edad} años.`;
  }

  public esMayor(): boolean {
    return this.edad >= 18;
  }

  public getEsMayor(): string {
    return `Alumno ${this.nombre} ${this.esMayor() ? 'es' : 'no es'} mayor.`;
  }
}