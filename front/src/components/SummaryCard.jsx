import React from 'react';

const SummaryCard = ({ title, amount, color }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-medium text-gray-500">{title}</h3>
            <p className={`mt-1 text-3xl font-bold text-${color}`}>${amount.toFixed(2)}</p>
        </div>
    );
};

export default SummaryCard;
