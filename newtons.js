document.addEventListener("DOMContentLoaded", function () {
    let result = document.getElementById("result");
    let iterationTable = document.getElementById("iteration-table");

    document.getElementById("newton").addEventListener("click", function () {
        const eq = document.getElementById("equation").value;
        const x0 = parseFloat(document.getElementById("x0").value);
        const tolerance = parseFloat(document.getElementById("precision").value);

        if (validateInputs(eq, x0, tolerance)) {
            clear();
            result.value = newtonMethod(x0, tolerance);
        }
    });

    function clear() {
        iterationTable.innerHTML = "";
        result.value = "";
    }

    function validateInputs(eq, x0, tolerance) {
        let errorMessage = "";

        if (!eq || eq.trim() === "") {
            errorMessage += "Please enter an equation.\n";
        }

        if (isNaN(x0) || isNaN(tolerance)) {
            errorMessage += "Please enter valid numbers for the initial value and precision.\n";
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
        const variable = "x";
        const expression = eq.replace(new RegExp(variable, "g"), x);
        return eval(expression);
    }

    function derivative(x) {
        const eq = document.getElementById("equation").value;
        const variable = "x";
        const expression = eq.replace(new RegExp(variable, "g"), x);
        const h = 0.000001; // small value for numerical differentiation
        const fpx = (equation(x + h) - equation(x - h)) / (2 * h);
        return fpx;
    }

    function appendIterationRow(iteration, x, fx, fpx, xNext) {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${iteration}</td>
        <td>${x.toFixed(4)}</td>
        <td>${fx.toFixed(4)}</td>
        <td>${fpx.toFixed(4)}</td>
        <td>${xNext ? xNext.toFixed(4) : ""}</td>
      `;
        iterationTable.appendChild(row);
    }

    function newtonMethod(x0, tolerance) {
        let logMessage = "";

        let x = x0;
        let fx, fpx;
        let iteration = 1;

        appendIterationRow(0, x, equation(x), derivative(x), "");

        while (Math.abs(equation(x)) >= tolerance) {
            fx = equation(x);
            fpx = derivative(x);

            let xNext = x - fx / fpx;

            appendIterationRow(iteration, x, fx, fpx, xNext);

            x = xNext;
            iteration++;
        }

        const root = "Approximate root found at x = " + x;
        logMessage += root + "\n";

        return logMessage;
    }
});
