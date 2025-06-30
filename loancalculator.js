let chart; // store chart instance globally

function computeLoan() {
    const amount = parseFloat(document.querySelector('#amount').value);
    const interest_rate = parseFloat(document.querySelector('#interest_rate').value);
    const months = parseInt(document.querySelector('#months').value);

    if (!amount || !interest_rate || !months) {
        document.querySelector('#payment').innerHTML = "Please fill all fields.";
        return;
    }

    const monthlyRate = interest_rate / 100 / 12;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;

    const formattedEMI = emi.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedInterest = totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.querySelector('#payment').innerHTML = `Monthly Payment = ₹${formattedEMI}`;
    document.querySelector('#totalInterest').innerHTML = `Total Interest = ₹${formattedInterest}`;

    drawChart(amount, totalInterest);
}

function drawChart(principal, interest) {
    const ctx = document.getElementById('emiChart').getContext('2d');
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#4CAF50', '#f44336'],
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}