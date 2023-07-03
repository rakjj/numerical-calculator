let result = document.getElementById("result");
let iterationTable = document.getElementById("iteration-table").getElementsByTagName("tbody")[0];

document.getElementById("bisection").addEventListener("click", function(){
    const eq = document.getElementById("equation").value;
    const xl = parseFloat(document.getElementById("xl").value);
    const xr = parseFloat(document.getElementById("xr").value);
    const tolerance = parseFloat(document.getElementById("precision").value);

    if (validateInputs(eq, xl, xr, tolerance)) {
        clear();
        result.value = bisectionMethod(xl, xr, tolerance);
    }
});

document.getElementById("falsi").addEventListener("click", function(){
    const eq = document.getElementById("equation").value;
    const xl = parseFloat(document.getElementById("xl").value);
    const xr = parseFloat(document.getElementById("xr").value);
    const tolerance = parseFloat(document.getElementById("precision").value);

    if (validateInputs(eq, xl, xr, tolerance)) {
        clear();
        result.value = falsePositionMethod(xl, xr, tolerance);
    }
});

function clear() {
    iterationTable.innerHTML = "";
    result.value = ""

}

function validateInputs(eq, xl, xr, tolerance) {
    let errorMessage = "";

    if (!eq || eq.trim() === "") {
        errorMessage += "Please enter an equation.\n";
    }

    if (isNaN(xl) || isNaN(xr) || isNaN(tolerance)) {
        errorMessage += "Please enter valid numbers for initial values and precision.\n";
    }

    if (xl >= xr) {
        errorMessage += "The initial value for Xₗ must be less than Xᵣ.\n";
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

// Bisection method function
function bisectionMethod(a, b, tolerance) {
    let logMessage = "";

    // Check if the initial values are valid
    if (equation(a) * equation(b) >= 0) {
        logMessage += "The equation has the same sign at the endpoints. Please choose different values.\n";
        return logMessage;
    }

    let iteration = 1;

    // Iterate until the interval is within the tolerance
    while ((b - a) >= tolerance) {
        // Calculate the midpoint
        let mid = (a + b) / 2;

        // Append iteration details to the table
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${iteration}</td>
            <td>${a.toFixed(4)}</td>
            <td>${b.toFixed(4)}</td>
            <td>${mid.toFixed(4)}</td>
            <td>${equation(a).toFixed(4)}</td>
            <td>${equation(b).toFixed(4)}</td>
            <td>${equation(mid).toFixed(4)}</td>
        `;
        iterationTable.appendChild(row);

        // Check if the midpoint is the root
        if (equation(mid) === 0) {
            logMessage += "Root found at x = " + mid + "\n";
            return logMessage;
        }

        // Update the interval based on the sign of the midpoint
        if (equation(mid) * equation(a) < 0) {
            b = mid;
        } else {
            a = mid;
        }

        iteration++;
    }

    // Append the approximate root to logMessage
    const root = "Approximate root found at x = "+ (a + b) / 2;

    return root;
}

function falsePositionMethod(a, b, tolerance) {
    let logMessage = "";

    // Check if the initial values are valid
    if (equation(a) * equation(b) >= 0) {
        logMessage += "The equation has the same sign at the endpoints. Please choose different values.\n";
        return logMessage;
    }

    let iteration = 1;

    // Iterate until the interval is within the tolerance or f(xm) reaches the precision
    while ((b - a) >= tolerance) {
        // Calculate the midpoint
        let mid = a + (b - a) * (equation(a) / (equation(a) - equation(b)));

        // Append iteration details to the table
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${iteration}</td>
        <td>${a.toFixed(4)}</td>
        <td>${b.toFixed(4)}</td>
        <td>${mid.toFixed(4)}</td>
        <td>${equation(a).toFixed(4)}</td>
        <td>${equation(b).toFixed(4)}</td>
        <td>${equation(mid).toFixed(4)}</td>
        `;
        iterationTable.appendChild(row);

        // Check if f(xm) reaches the precision
        if (Math.abs(equation(mid)) <= tolerance) {
        logMessage += "Root found at x = " + mid + "\n";
        return logMessage;
        }

        // Update the interval based on the sign of the midpoint
        if (equation(mid) * equation(a) < 0) {
        b = mid;
        } else {
        a = mid;
        }

        iteration++;
    }

    // Append the approximate root to logMessage
    const root = "Approximate root found at x = " + (a + b) / 2;

    return root;
    }