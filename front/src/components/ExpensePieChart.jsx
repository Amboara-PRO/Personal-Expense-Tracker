import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ data }) => {
    // Affiche un message si aucune donnée n'est disponible
    if (!data || Object.keys(data).length === 0) {
        return <div className="text-center text-gray-500">Aucune dépense à afficher.</div>;
    }

    // Prépare les données pour le graphique Chart.js
    const chartData = {
        labels: Object.keys(data).map(key => data[key].name),
        datasets: [
            {
                data: Object.keys(data).map(key => data[key].total),
                backgroundColor: [
                    '#4F46E5', 
                    '#10B981', 
                    '#F59E0B', 
                    '#EF4444', 
                    '#8B5CF6', 
                    '#EC4899', 
                    '#3B82F6', 
                    '#F97316', 
                ],
                hoverOffset: 4,
            },
        ],
    };

    // Options du graphique
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="relative h-96">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default ExpensePieChart;
