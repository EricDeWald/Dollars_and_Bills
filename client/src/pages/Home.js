import React from "react";
import { Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from "@apollo/client";
import Auth1 from '../utils/auth';
import BudgetForm from '../components/BudgetForm'

const Home = () => {
    const userName = Auth1.getUsername();
    console.log("localstorage", userName)
    const { loading, data } = useQuery(QUERY_USER, { variables: { username: userName } });
    let user;
    console.log("query", data)

    if (data) {
        user = data.user;
        console.log(user)
    }

    const budgets = user?.budgets || [];
    return (
        <Container className='my-4'>
            <Stack direction='horizontal' gap='3' className='mb-4'>
                <h1 className="me-auto">Budgets</h1>
                <BudgetForm></BudgetForm>
            </Stack>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <BudgetCard budgets={budgets} now={25} />
                )}
            </div>
        </Container>
    )
}

export default Home
