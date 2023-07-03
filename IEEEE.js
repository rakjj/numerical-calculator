let num1 = document.getElementById("num1");
let result = document.getElementById("result");

document.getElementById("32bit").addEventListener("click", function() {
    let decimalNumber = parseFloat(num1.value);
    if (isNaN(decimalNumber)) {
        result.value = "Invalid input";
    } else {
        result.value = decimalto32bit(decimalNumber);
    }
});

document.getElementById("64bit").addEventListener("click", function() {
    let decimalNumber = parseFloat(num1.value);
    if (isNaN(decimalNumber)) {
        result.value = "Invalid input";
    } else {
        result.value = decimalto64bit(decimalNumber);
    }
});

function decimalto32bit(decimalNumber) {
    let sign = decimalNumber < 0 ? 1 : 0;
    let binaryString = Math.abs(decimalNumber).toString(2);
    let [integerPart, fractionalPart] = binaryString.split('.');
    let exponent = integerPart.length - 1;
    let mantissa = integerPart.substr(1) + (fractionalPart || '');

    while (mantissa.length < 23) {
        mantissa += '0';
    }
    mantissa = mantissa.substr(0, 23);

    let biasedExponent = exponent + 127;

    let exponentBinary = biasedExponent.toString(2);

    while (exponentBinary.length < 8) {
        exponentBinary = '0' + exponentBinary;
    }

    let binaryRepresentation = sign.toString() + exponentBinary + mantissa;

    return binaryRepresentation;
}

function decimalto64bit(decimalNumber) {
    let sign = decimalNumber < 0 ? 1 : 0;
    let binaryString = Math.abs(decimalNumber).toString(2);
    let [integerPart, fractionalPart] = binaryString.split('.');
    let exponent = integerPart.length - 1;
    let mantissa = integerPart.substr(1) + (fractionalPart || '');

    while (mantissa.length < 52) {
        mantissa += '0';
    }
    mantissa = mantissa.substr(0, 52);

    let biasedExponent = exponent + 1023;

    let exponentBinary = biasedExponent.toString(2);

    while (exponentBinary.length < 11) {
        exponentBinary = '0' + exponentBinary;
    }

    let binaryRepresentation = sign.toString() + exponentBinary + mantissa;

    return binaryRepresentation;
}