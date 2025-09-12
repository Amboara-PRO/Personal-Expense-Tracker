const prisma = require('../prismaClient');

exports.getMonthlySummary = async (req, res) => {
    try {
        const userId = req.user.id; // L'ID utilisateur est ajouté à la requête par le middleware d'authentification
        //recuperer les revenus du mois en cours    
        const incomes = await prisma.incomes.findMany({
            where: { 
                userId,
                date: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), //debut du mois
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) //debut du mois suivant
                }
            },
        
        });

        //recuperer les depenses du mois en cours (incluants les reccurentes)
        const oneTimeExpenses = await prisma.oneTimeExpenses.findMany({
            where: { 
                userId,
                type: 'one time',
                date: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), //debut du mois
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) //debut du mois suivant
                }
            },
        });

        const recurringExpenses = await prisma.recurringExpenses.findMany({
            where: { 
                userId,
                type: 'recurring',
                startDate: {
                    lte: new date(), //la depense a commence au plus tard ce mois ci
                },
                OR: [
                    { endDate: null }, //depense en cours
                    { endDate: { gte: new Date() } } //la depense se termine au plus tard ce mois ci
                ]
            },
        });

        //calculs
        const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = oneTimeExpenses.reduce((sum, item) => sum + item.amount, 0) +
                                recurringExpenses.reduce((sum, item) => sum + item.amount, 0);
        const remainingBalance = totalIncome - totalExpenses;

        //repartition par categorie pour le Pie Chart
        const expenseByCategory = {};
        [...oneTimeExpenses, ...recurringExpenses].forEach(expense => {
            if (!expenseByCategory[expense.categoryId]) {
                expenseByCategory[expense.categoryId] = { total: 0, name: '' };
            } else {
                expenseByCategory[expense.categoryId].total += expense.amount;
            }
        });

        res.json({
            totalIncome,
            totalExpenses,
            remainingBalance,
            expenseByCategory, //format a envoyer au frontend
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur de le recuperation du resume mensuel" });
    }
}

exports.getSummaryBetweenDates = async (req, res) => {
    
}

exports.getBudgetAlert = async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Récupérer les revenus et les dépenses pour le mois en cours
        const incomes = await prisma.income.findMany({
            where: { userId, date: { gte: startOfMonth, lte: endOfMonth } }
        });
        const oneTimeExpenses = await prisma.expense.findMany({
            where: { userId, type: 'one-time', date: { gte: startOfMonth, lte: endOfMonth } }
        });
        const recurringExpenses = await prisma.expense.findMany({
            where: {
                userId,
                type: 'recurring',
                startDate: { lte: endOfMonth },
                OR: [{ endDate: null }, { endDate: { gte: startOfMonth } }]
            }
        });

        const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = oneTimeExpenses.reduce((sum, item) => sum + item.amount, 0) + recurringExpenses.reduce((sum, item) => sum + item.amount, 0);

        const alert = totalExpenses > totalIncome;
        const exceededAmount = totalExpenses - totalIncome;

        res.json({
            alert,
            message: alert ? `You've exceeded your monthly budget by $${exceededAmount.toFixed(2)}` : "All good!"
        });

    } catch (error) {
        console.error("Error fetching budget alert:", error);
        res.status(500).json({ message: "An error occurred while checking the budget." });
    }
};

