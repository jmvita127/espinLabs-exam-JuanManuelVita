function esCapicua(palabra) {
    //convertir la palabra en un array
    let array = palabra.split("");
    //reverse para girar el array y comparar
    let palabraReverse = array.reverse();
    //el array invertido lo juntamos para obtenerlo como string
    return palabra === palabraReverse.join("") ? "es Capicua" : "no es Capicua"
}
//ejecutar en consola => node capicua.js
console.log(esCapicua('reconocer'));