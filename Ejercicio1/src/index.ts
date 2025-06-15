import promptSync from 'prompt-sync';
const { Alumno } = require('./models/alumno');

// 1. Crear un algoritmo que muestre los números impares entre el 0 y el 100. 
/*
function generarNumeros(min = 0, max = 100): number[]{
    let numeros: number[] = [];
    for (let i = min; i <= max; i++){
        numeros.push(i);
    }
    return numeros;
}

function esImpar(numero: number): boolean{
    return (numero % 2 != 0)
}

function numerosImparesEntre(min: number, max: number): number[]{
    let numeros = generarNumeros(min, max);
    return numeros.filter(esImpar);
}

const serieNumeros = numerosImparesEntre(0, 100);
console.log('Números impares:')
console.log(serieNumeros);

//2. Realizar un programa que ingrese los sueldos de 5 operarios en un vector. 
// Realizar la creación y carga del vector en el constructor. Crear un método para imprimir el vector.

const prompt = promptSync();

function cargaSueldosOperarios(cantidad: number): number[]{
    let sueldos: number[] = [];
    if (cantidad > 0){
        for (let i = 1; i <= cantidad; i++){
            let sueldoIngresado = prompt(`Sueldo del operario N°${i}: `)
            let sueldo = Number(sueldoIngresado);
            if (isNaN(sueldo)){
                console.log(`El sueldo ingresado para el operario ${i} no es válido, se le asigna un sueldo de 0.`)
                sueldo = 0
            }
            sueldos.push(sueldo);
        }
    }
    return sueldos
}

function mostrarSueldos(sueldos: number[]): string{
    if (sueldos.length === 0)
        return 'No se han ingresado sueldos.';
    
    let res: string = '\n';
    for (let i = 0; i < sueldos.length; i++){
        res += `Sueldo del operario ${i+1}: ${sueldos[i]}\n`;
    }
    return res;
}

const sueldosOperarios = cargaSueldosOperarios(5)
const resumenSueldos = mostrarSueldos(sueldosOperarios); 
console.log(resumenSueldos);

// 3. Plantear una clase llamada Alumno y definir como atributos su nombre y su edad. 
// En el constructor realizar el ingreso de datos. Definir otros dos métodos para imprimir 
// los datos ingresados y un mensaje si es mayor o no de edad (edad >= 18)
*/
const alumno1 = new Alumno();

console.log(alumno1.getData());
console.log(alumno1.getEsMayor());

// 4. JavaScript ES6: Dados los siguientes array, imprimir por consola los elementos del array “y” 
// que no se encuentran en el array “x” utilizando para tal fin una única línea de código. 
// const x = ["n", "bro", "c", "|"]; const y = ["d", "n", "l", "bro", "g"];

const x = ["n", "bro", "c", "|"];
const y = ["d", "n", "l", "bro", "g"];
console.log('Elementos del array y que no se encuentran en x: ');
console.log(y.filter(e => !x.includes(e)));