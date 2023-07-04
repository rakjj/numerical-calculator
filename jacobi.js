document.getElementById("jacobi").addEventListener("click", function () {
    const matrixA = parseMatrix(document.getElementById("matrixA").value);
    const vectorB = parseVector(document.getElementById("vectorB").value);
    const initialApproximations = parseVector(document.getElementById("initialApproximations").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    if (validateInputs(matrixA, vectorB, initialApproximations, tolerance)) {
        clear();
        result.value = jacobiMethod(matrixA, vectorB, initialApproximations, tolerance);
    }
});

function clear() {
    const iterationTable = document.getElementById("iteration-table");
    iterationTable.innerHTML = "";
    result.value = "";
}

function validateInputs(matrixA, vectorB, initialApproximations, tolerance) {
    let errorMessage = "";

    if (matrixA.length === 0) {
        errorMessage += "Please enter matrix A.\n";
    }

    if (vectorB.length === 0) {
        errorMessage += "Please enter vector b.\n";
    }

    if (initialApproximations.length === 0) {
        errorMessage += "Please enter initial approximations.\n";
    }

    if (isNaN(tolerance) || tolerance <= 0) {
        errorMessage += "Please enter a valid tolerance (a positive number).\n";
    }

    if (errorMessage !== "") {
        alert(errorMessage);
        return false;
    }

    return true;
}

function parseMatrix(input) {
    const rows = input.trim().split("\n");
    const matrix = [];
    for (let row of rows) {
        const values = row.trim().split(" ").map(parseFloat);
        matrix.push(values);
    }
    return matrix;
}

function parseVector(input) {
    return input.trim().split(" ").map(parseFloat);
}

function jacobiMethod(matrixA, vectorB, initialApproximations, tolerance) {
    const n = matrixA.length;
    const iterationTable = document.getElementById("iteration-table");
    let logMessage = "";

    let x = initialApproximations.slice();
    let xPrev = initialApproximations.slice();
    let iteration = 0;

    // Append initial values (0) to the table for the first iteration
    appendIterationRow(iteration, 0, 0, 0);

    while (true) {
        let rowResults = [];
        let maxDiff = 0;

        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    sum += matrixA[i][j] * xPrev[j];
                }
            }

            let xi = (vectorB[i] - sum) / matrixA[i][i];
            rowResults.push(xi);

            let diff = Math.abs(xi - xPrev[i]);
            if (diff > maxDiff) {
                maxDiff = diff;
            }
        }

        x = rowResults.slice();

        // Append iteration details to the table
        appendIterationRow(iteration + 1, x[0], x[1], x[2]);

        if (maxDiff <= tolerance) {
            break;
        }

        xPrev = x.slice();
        iteration++;
    }

    logMessage += "Approximate solution:\n";
    logMessage += x.map((value, index) => `x${index + 1} = ${value.toFixed(4)}`).join("\n");
    return logMessage;
}


function appendIterationRow(iteration, x, y, z) {
    const iterationTable = document.getElementById("iteration-table");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${iteration}</td>
        <td>${x.toFixed(4)}</td>
        <td>${y.toFixed(4)}</td>
        <td>${z.toFixed(4)}</td>
    `;
    iterationTable.appendChild(row);
}
