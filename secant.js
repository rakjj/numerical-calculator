let result = document.getElementById("result");
let iterationTable = document.getElementById("iteration-table").getElementsByTagName("tbody")[0];

document.getElementById("secant").addEventListener("click", function () {
    const eq = document.getElementById("equation").value;
    const x0 = parseFloat(document.getElementById("x0").value);
    const x1 = parseFloat(document.getElementById("x1").value);
    const tolerance = parseFloat(document.getElementById("precision").value);

    if (validateInputs(eq, x0, x1, tolerance)) {
        clear();
        result.value = secantMethod(x0, x1, tolerance);
    }
});

function clear() {
    iterationTable.innerHTML = "";
    result.value = "";
}

function validateInputs(eq, x0, x1, tolerance) {
    let errorMessage = "";

    if (!eq || eq.trim() === "") {
        errorMessage += "Please enter an equation.\n";
    }

    if (isNaN(x0) || isNaN(x1) || isNaN(tolerance)) {
        errorMessage += "Please enter valid numbers for initial values and precision.\n";
    }

    if (tolerance <= 0) {
        errorMessage += "The precision must be a positive number.\n";
    }

    if (errorMessage !== "") {
        alert(errorMessage);
        return false;
    }

    return true;
}

function equation(x) {
    const eq = document.getElementById("equation").value;
    const variable = 'x';
    const expression = eq.replace(new RegExp(variable, 'g'), x);
    return eval(expression);
}

function secantMethod(x0, x1, tolerance) {
    let logMessage = "";

    let x2, fx0, fx1, fx2;
    let iteration = 1;

    // Append initial values to the table
    appendIterationRow(0, x0, x1, "", equation(x0), equation(x1), "");

    // Iterate until the difference between x1 and x0 is within the tolerance
    while (Math.abs(x1 - x0) >= tolerance) {
        fx0 = equation(x0);
        fx1 = equation(x1);

        // Calculate x2 using the Secant method formula
        x2 = x1 - (fx1 * (x1 - x0)) / (fx1 - fx0);
        fx2 = equation(x2);

        // Append iteration details to the table
        appendIterationRow(iteration, x0, x1, x2, fx0, fx1, fx2);

        // Update values for the next iteration
        x0 = x1;
        x1 = x2;
        iteration++;
    }

    // Append the approximate root to logMessage
    const root = "Approximate root found at x = " + x1;
    logMessage += root + "\n";

    return logMessage;
}

function appendIterationRow(iteration, x0, x1, x2, fx0, fx1, fx2) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${iteration}</td>
        <td>${x0.toFixed(4)}</td>
        <td>${x1.toFixed(4)}</td>
        <td>${x2 ? x2.toFixed(4) : ""}</td>
        <td>${fx0.toFixed(4)}</td>
        <td>${fx1.toFixed(4)}</td>
        <td>${fx2 ? fx2.toFixed(4) : ""}</td>
    `;
    iterationTable.appendChild(row);
}
