import React from 'react'
import { Stack, Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { QUERY_BUDGET, QUERY_EXPENSES} from '../utils/queries';
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom'
import Auth1 from '../utils/auth';
import BudgetForm from '../components/BudgetForm'
import ExpenseForm from "../components/ExpenseForm";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { ExpensesGraph } from "./graph";

const expenseLabels = []
const expenseAmounts = []    
export const ChartData = () => {
    const { budgetId } = useParams();
    const { loading, data } = useQuery(QUERY_BUDGET, {
        variables: { budgetId: budgetId },
    });
    const budget = data?.budget || {};
    // console.log(budget.expenses[0].name)
    if (budget.expenses) {
        for (let i=0;i<budget.expenses.length;i++){
            
            expenseLabels.push(budget.expenses[i].name)
            expenseAmounts.push(budget.expenses[i].amount)
        }
        console.log(expenseLabels,expenseAmounts)
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
            {expenseLabels, expenseAmounts}  
        // <div>
        //     {budget.name}
        // </div>
    )
}
