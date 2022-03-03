import React from "react";
import { Stack, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container className='my-4'>
            <Link to="/login">← Go to Login</Link>
            <Stack direction='horizontal' gap='3' className='mb-4'>
                <h1 className="me-auto">Budgets</h1>
                <Button variant='primary'>Add Budget</Button>
                <Button variant='outline-primary'>Add Expense</Button>
            </Stack>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                <BudgetCard name='Food' gray amount={100} max={300}></BudgetCard>
            </div>
        </Container>


    )
}

export default Home
