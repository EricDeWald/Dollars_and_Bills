import React from "react";
import { Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from '../components/BudgetCard';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from "@apollo/client";
import Auth1 from '../utils/auth';
import BudgetForm from '../components/BudgetForm'
import ExpenseForm from "../components/ExpenseForm";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

const Home = () => {
    const userName = Auth1.getUsername();
    console.log("localstorage", userName)
    const { loading, data } = useQuery(QUERY_USER, { variables: { username: userName } });
    let user;
    console.log("fetched user's budgets populated with expenses", data)

    if (data) {
        user = data.user;
        console.log(user)
    }

    const budgets = user?.budgets || [];
    return (
        <>
            {
                Auth.loggedIn() ? (
                    <Container className='my-4'>
                        <Stack direction='horizontal' gap='3' className='mb-4'>
                            <h1 className="me-auto budget-header">Budgets</h1>
                            <BudgetForm></BudgetForm>
                            {/* <ExpenseForm></ExpenseForm> */}
                        </Stack>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <BudgetCard budgets={budgets} now={0} />
                            )}
                        </div>
                    </Container>
                ) : (
                    <>
                    <p className="budget-text">
                        You need to be logged in to see your budgets. Please{' '}
                        <Link to="/login" style={{ color: "#DF20BA", }}> login </Link> or <Link to="/signup" style={{ color: "#DF20BA", }}> signup. </Link>
                    </p>
                    <p id="bigLogo">
                        <img  src="assets/dollars_and_bills_DT.png"></img>
                    </p>
                    </>
                )
            }
        </>
    )
}
export default Home
