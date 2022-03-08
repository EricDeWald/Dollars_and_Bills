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
import Auth from '../utils/auth'
import { ExpensesGraph } from "./graph";



const Budget = () => {
    const { budgetId } = useParams();
    const { loading, data } = useQuery(QUERY_BUDGET, {
        variables: { budgetId: budgetId },
    });

    const budget = data?.budget || {};
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
                            <div className='d-flex justify-content-end'>
                                <Button
                                    id="log-button"
                                    variant='outline-danger'
                                    type='submit'
                                    onClick={() => handleRemoveBudget(budget._id)}>Delete budget</Button>
                            </div>
                        </Stack>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))', gap: '2rem', alignItems: 'flex-start', justifyContent: "space-around" }}>
                            {budget &&
                                budget.expenses.map((expense) => (
                                    <Card className='me-2' key={expense._id}>
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
                        You need to be logged in to see your budgets. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                )
            }
        </>
    )
}

export default Budget
