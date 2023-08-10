// Initialize arrays to store depth and strength data
let depthData = [];
let strengthData = [];

// Get canvas element and create a chart context
const ctx = document.getElementById('chartCanvas').getContext('2d');
const soilStrengthChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: strengthData,
        datasets: [{
            label: 'Soil Strength',
            data: depthData,
            borderColor: 'red',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: false,
            tension: 0.1,  // Add tension for smooth line
            pointRadius: 5,  // Add markers
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Strength'
                }
            },
            y: {
                reverse: true,  // Reverse the y-axis
                title: {
                    display: true,
                    text: 'Depth'
                }
            }
        }
    }
});

// Function to update the data table
function updateDataTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear previous table content

    for (let i = 0; i < depthData.length; i++) {
        const row = document.createElement('tr');
        const depthCell = document.createElement('td');
        const strengthCell = document.createElement('td');

        depthCell.textContent = depthData[i].toFixed(1);
        strengthCell.textContent = strengthData[i];

        row.appendChild(depthCell);
        row.appendChild(strengthCell);

        tableBody.appendChild(row);
    }
}
// Function to update the data table
function updateDataTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear previous table content

    for (let i = 0; i < depthData.length; i++) {
        const row = document.createElement('tr');
        const depthCell = document.createElement('td');
        const strengthCell = document.createElement('td');

        depthCell.textContent = depthData[i].toFixed(1);
        strengthCell.textContent = strengthData[i];

        depthCell.setAttribute('contenteditable', 'true'); // Enable content editing
        strengthCell.setAttribute('contenteditable', 'true'); // Enable content editing

        depthCell.addEventListener('input', function () {
            depthData[i] = parseFloat(depthCell.textContent) || 0;
            soilStrengthChart.update(); // Update the chart
        });

        strengthCell.addEventListener('input', function () {
            strengthData[i] = parseFloat(strengthCell.textContent) || 0;
            soilStrengthChart.update(); // Update the chart
        });

        row.appendChild(depthCell);
        row.appendChild(strengthCell);

        tableBody.appendChild(row);
    }
}
// Function to add data to the chart
function addData() {
    const depthInput = document.getElementById('depthInput');
    const strengthInput = document.getElementById('strengthInput');

    // Use preselected values for initial depth and strength
    let depth = parseFloat(depthInput.value || 0.1);
    let strength = parseFloat(strengthInput.value || 10);

    // Increment depth by 0.1 and strength by 10 for each data point
    depthData.push(depth);
    strengthData.push(strength);

    // Update input fields with new values
    depthInput.value = (depth + 0.1).toFixed(1);
    strengthInput.value = strength + 10;

    updateDataTable(); // Update the data table
    soilStrengthChart.update(); // Update the chart
}

// Function to undo the last data point
function undoData() {
    depthData.pop();
    strengthData.pop();

    updateDataTable(); // Update the data table
    soilStrengthChart.update(); // Update the chart
}

// Function to update the table container's max-height based on chart container's height
function updateTableMaxHeight() {
    const chartContainer = document.querySelector('.chart-container');
    const tableContainer = document.querySelector('.table-container');
    tableContainer.style.maxHeight = chartContainer.clientHeight + 'px';
}
// Update the table when the initial data is loaded
updateDataTable();
window.addEventListener('resize', updateTableMaxHeight);

// Function to calculate the average of an array of numbers
function calculateAverage(array) {
    if (array.length === 0) {
        return 0;
    }
    const sum = array.reduce((total, currentValue) => total + currentValue, 0);
    return sum / array.length;
}

// Function to update the average strength on the page
function updateAverageStrength() {
    const averageStrength = calculateAverage(strengthData);
    const averageStrengthElement = document.getElementById('averageStrength');
    averageStrengthElement.textContent = averageStrength.toFixed(2);
}
// // Update the table when the initial data is loaded
// updateDataTable();
// updateAverageStrength();
