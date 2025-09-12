import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import SummaryCard from '../components/SummaryCard';
import ExpensePieChart from '../components/ExpensePieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import BudgetAlert from '../components/BudgetAlert';
import { useAuth } from '../context/authContext';

const Dashboard = () => {
    const { token } = useAuth();
    const [summary, setSummary] = useState(null);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Fetch monthly summary
                const summaryResponse = await fetch('/api/summary/monthly', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!summaryResponse.ok) throw new Error('Failed to fetch summary data');
                const summaryData = await summaryResponse.json();
                setSummary(summaryData);

                // Fetch budget alert
                const alertResponse = await fetch('/api/summary/alerts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!alertResponse.ok) throw new Error('Failed to fetch budget alert');
                const alertData = await alertResponse.json();
                setAlert(alertData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <Layout><div className="flex justify-center items-center h-full">Chargement du tableau de bord...</div></Layout>;
    }

    if (error) {
        return <Layout><div className="text-center text-red-500 mt-10">Erreur: {error}</div></Layout>;
    }

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Tableau de Bord</h1>
                
                {alert && alert.alert && (
                    <BudgetAlert message={alert.message} />
                )}

                {summary && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <SummaryCard
                            title="Revenus du mois"
                            amount={summary.totalIncome}
                            type="income"
                        />
                        <SummaryCard
                            title="Dépenses du mois"
                            amount={summary.totalExpenses}
                            type="expenses"
                        />
                        <SummaryCard
                            title="Solde restant"
                            amount={summary.remainingBalance}
                            type="balance"
                        />
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Dépenses par Catégorie</h2>
                        {summary && <ExpensePieChart data={summary.expensesByCategory} />}
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Historique Mensuel</h2>
                        <MonthlyBarChart />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
