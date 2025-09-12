import React from 'react';

const BudgetAlert = ({ alert }) => {
    if (!alert.alert) {
        return null; // N'affiche rien si l'alerte n'est pas active
    }

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Alerte Budget !</strong>
            <span className="block sm:inline ml-2">{alert.message}</span>
        </div>
    );
};

export default BudgetAlert;
