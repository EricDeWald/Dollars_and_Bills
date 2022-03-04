import React from "react";
import { Stack, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { Link } from "react-router-dom";
import BudgetForm from "../components/BudgetForm";
import { QUERY_BUDGETS, QUERY_USER } from '../utils/queries';
import { useQuery } from "@apollo/client";
import Auth1 from '../utils/auth';

const Home = () => {
    const userName = Auth1.getUsername();
    console.log(userName)
    const { loading, data } = useQuery(QUERY_USER);
    console.log(data)
    const budgets = data?.budgets || [];
    return (
        <Container className='my-4'>
            {/* <Link to="/login">← Go to Login</Link> */}
            <Stack direction='horizontal' gap='3' className='mb-4'>
                <h1 className="me-auto">Budgets</h1>
                <Button variant='primary'>Add Budget</Button>
                <Button variant='outline-primary'>Add Expense</Button>
            </Stack>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <BudgetCard budgets={budgets} />
                )}
            </div>

            <BudgetForm />
        </Container>
    )
}

export default Home
