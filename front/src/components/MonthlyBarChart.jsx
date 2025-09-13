// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { useAuth } from '../context/authContext';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const MonthlyBarChart = () => {
//     const { token } = useAuth();
//     const [chartData, setChartData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchChartData = async () => {
//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const endDate = new Date();
//                 const startDate = new Date();
//                 startDate.setMonth(startDate.getMonth() - 5); // Récupère les données des 6 derniers mois

//                 const response = await fetch(`/api/summary?start=${startDate.toISOString().slice(0, 10)}&end=${endDate.toISOString().slice(0, 10)}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 if (!response.ok) throw new Error('Failed to fetch monthly summary data');
//                 const data = await response.json();

//                 const labels = Object.keys(data.incomesByMonth);
//                 const incomes = Object.values(data.incomesByMonth);
//                 const expenses = Object.values(data.expensesByMonth);

//                 setChartData({
//                     labels: labels,
//                     datasets: [
//                         {
//                             label: 'Revenus',
//                             data: incomes,
//                             backgroundColor: '#10B981', // Émeraude
//                         },
//                         {
//                             label: 'Dépenses',
//                             data: expenses,
//                             backgroundColor: '#EF4444', // Rouge
//                         }
//                     ]
//                 });

//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchChartData();
//     }, [token]);

//     if (loading) return <div>Chargement du graphique...</div>;
//     if (error) return <div>Erreur: {error}</div>;
//     if (!chartData) return <div>Aucune donnée pour les derniers mois.</div>;

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: false,
//             },
//         },
//     };

//     return <Bar data={chartData} options={options} />;
// };

// export default MonthlyBarChart;
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../context/authContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyBarChart = () => {
    const { user } = useAuth();
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 5);

                const response = await fetch(
                    `/api/summary?start=${startDate.toISOString().slice(0,10)}&end=${endDate.toISOString().slice(0,10)}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!response.ok) throw new Error('Failed to fetch monthly summary data');
                const data = await response.json();

                const labels = Object.keys(data.incomesByMonth || {});
                const incomes = Object.values(data.incomesByMonth || {});
                const expenses = Object.values(data.expensesByMonth || {});

                setChartData({
                    labels,
                    datasets: [
                        { label: 'Revenus', data: incomes, backgroundColor: '#10B981' },
                        { label: 'Dépenses', data: expenses, backgroundColor: '#EF4444' }
                    ]
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [user]);

    if (loading) return <div>Chargement du graphique...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!chartData) return <div>Aucune donnée pour les derniers mois.</div>;

    const options = { responsive: true, plugins: { legend: { position: 'top' }, title: { display: false } } };

    return <Bar data={chartData} options={options} />;
};

export default MonthlyBarChart;
