document.addEventListener("DOMContentLoaded", function() {
    const covidDataElement = document.getElementById('covid-data');

    fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            const globalStats = data.Global;
            covidDataElement.innerHTML = `
                <p><strong>New Confirmed:</strong> ${globalStats.NewConfirmed}</p>
                <p><strong>Total Confirmed:</strong> ${globalStats.TotalConfirmed}</p>
                <p><strong>New Deaths:</strong> ${globalStats.NewDeaths}</p>
                <p><strong>Total Deaths:</strong> ${globalStats.TotalDeaths}</p>
                <p><strong>New Recovered:</strong> ${globalStats.NewRecovered}</p>
                <p><strong>Total Recovered:</strong> ${globalStats.TotalRecovered}</p>
            `;

            // Create a chart
            const ctx = document.getElementById('covidChart').getContext('2d');
            const covidChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['New Confirmed', 'Total Confirmed', 'New Deaths', 'Total Deaths', 'New Recovered', 'Total Recovered'],
                    datasets: [{
                        label: 'Global COVID-19 Statistics',
                        data: [
                            globalStats.NewConfirmed,
                            globalStats.TotalConfirmed,
                            globalStats.NewDeaths,
                            globalStats.TotalDeaths,
                            globalStats.NewRecovered,
                            globalStats.TotalRecovered
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            covidDataElement.innerHTML = `<p>Error fetching data</p>`;
            console.error('Error:', error);
        });
});
