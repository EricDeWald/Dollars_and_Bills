import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Modal, Button, Form } from 'react-bootstrap';


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
            if ((typeof value) === "number") {

                value = parseInt(value)
                setBudgetAmount(value);
            }

            console.log(typeof value);

        }
        if (name === 'name') {
            setBudgetName(value);

        }



    };

    return (
        <div>
            <Button variant="outline-primary" onClick={() => setOnShow(!onShow)}>
                Add Budget
            </Button>

            {Auth.loggedIn() ? (
                <>
                    <Modal show={onShow} onHide={() => setOnShow(false)} role="dialog">
                        <Form onSubmit={handleFormSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Budget</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <textarea
                                    name="name"
                                    placeholder="Name of budget"
                                    value={budgetName}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
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
                                    <Button variant='primary' type='submit'>Add</Button>
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