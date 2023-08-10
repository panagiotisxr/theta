let depthData = [];
let strengthData = [];

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
            tension: 0.1,
            pointRadius: 5,
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
                reverse: true,
                title: {
                    display: true,
                    text: 'Depth'
                }
            }
        }
    }
});

function calculateAverage(array) {
    if (array.length === 0) {
        return 0;
    }
    const sum = array.reduce((total, currentValue) => total + currentValue, 0);
    return sum / array.length;
}

function updateAverageStrength() {
    const averageStrength = calculateAverage(strengthData);
    const averageStrengthElement = document.getElementById('averageStrength');
    averageStrengthElement.textContent = averageStrength.toFixed(2);
}

function updateDataTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

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

    updateAverageStrength(); // Calculate and update average strength
}

function addData() {
    const depthInput = document.getElementById('depthInput');
    const strengthInput = document.getElementById('strengthInput');

    let depth = parseFloat(depthInput.value || 0.1);
    let strength = parseFloat(strengthInput.value || 10);

    depthData.push(depth);
    strengthData.push(strength);

    depthInput.value = (depth + 0.1).toFixed(1);
    strengthInput.value = strength + 10;

    updateDataTable();
    soilStrengthChart.update();
}

function undoData() {
    depthData.pop();
    strengthData.pop();

    updateDataTable();
    soilStrengthChart.update();
}

function updateTableMaxHeight() {
    const chartContainer = document.querySelector('.chart-container');
    const tableContainer = document.querySelector('.table-container');
    tableContainer.style.maxHeight = chartContainer.clientHeight + 'px';
}

window.addEventListener('resize', updateTableMaxHeight);

// ... (remaining code) ...
