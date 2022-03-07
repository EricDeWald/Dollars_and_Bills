import React from 'react'
import { Stack, Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { QUERY_BUDGET } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom'
import Auth1 from '../utils/auth';
import BudgetForm from '../components/BudgetForm'
import ExpenseForm from "../components/ExpenseForm";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

const Budget = () => {
    // Use `useParams()` to retrieve value of the route parameter `:budgetId`
    const { budgetId } = useParams();

    const { loading, data } = useQuery(QUERY_BUDGET, {
        // Pass the `budgetId` URL parameter into query to retrieve this budget's data
        variables: { budgetId: budgetId },

    });
    console.log("data", data)
    const budget = data?.budget || {};
    console.log("single budget", budget)
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {
                Auth.loggedIn() ? (
                    <Container className='my-4'>
                        <Stack direction='horizontal' gap='3' className='mb-4'>
                            <h1 className="me-auto">{budget.name}</h1>
                        </Stack>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                            {budget &&
                                budget.expenses.map((expense) => (
                                    <Card key={expense._id}>
                                        <Card.Body>
                                            <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                                                <div className='me-2'>{expense.name}</div>
                                            </Card.Title>
                                        </Card.Body>

                                    </Card>
                                ))} </div>
                    </Container>
                ) : (
                    <p>
                        You need to be logged in see your budgets. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                )
            }
        </>
    )
}

export default Budget
