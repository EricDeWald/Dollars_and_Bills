import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Modal, Button, Form } from 'react-bootstrap';
import './budgetForm.css'
import { ADD_BUDGET } from '../../utils/mutations';
import Auth from '../../utils/auth';

const BudgetForm = () => {
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState();
    const [onShow, setOnShow] = useState(false);
    const [addBudget, { error }] = useMutation(ADD_BUDGET);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addBudget({
                variables: {
                    name: budgetName,
                    amount: budgetAmount
                },
            });
            setBudgetName('');
            setBudgetAmount('');
            setOnShow(false)
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name === 'amount') {
                value = parseInt(value)
                setBudgetAmount(value);
        }
        if (name === 'name') {
            setBudgetName(value);
        }
    };

    return (
        <div>
            <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}} onClick={() => setOnShow(!onShow)}>
                <div className='budget-btn'>Add Budget</div>
            </Button>

            {Auth.loggedIn() ? (
                <>
                    <Modal  show={onShow} onHide={() => setOnShow(false)} role="dialog">
                        <Form onSubmit={handleFormSubmit}>
                            <Modal.Header style={{backgroundColor: "#DFA420", border: "solid 2px #DF20BA"}} closeButton>
                                <Modal.Title style={{color: "#DF20BA"}}>New Budget</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{backgroundColor: "black", border: "solid 2px #DF20BA", borderRadius:"5px"}}>
                                <textarea
                                    name="name"
                                    placeholder="Name of budget"
                                    value={budgetName}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical'}}
                                    onChange={handleChange}
                                ></textarea>

                                <textarea
                                    name="amount"
                                    placeholder="amount of budget"
                                    value={budgetAmount}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                    onChange={handleChange}
                                ></textarea>
                                <div className='d-flex justify-content-end'>
                                    <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}} type='submit'>
                                        <div className='budget-btn'>Add</div>
                                    </Button>
                                </div>
                            </Modal.Body>
                        </Form>
                    </Modal>
                </>
            ) : (
                <p>
                    You need to be logged in see your budgets. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )
            }
        </div>
    );
};

export default BudgetForm;