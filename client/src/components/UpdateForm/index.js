import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Modal, Button, Form } from 'react-bootstrap';
import { UPDATE_EXPENSE } from '../../utils/mutations';
import Auth from '../../utils/auth';

const UpdateForm = ({ expenseId }) => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState();
    const [expenseDescription, setExpenseDescription] = useState('');
    const [onUpShow, setOnUpShow] = useState(false);
    const [updateExpense, { error }] = useMutation(UPDATE_EXPENSE);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateExpense({
                variables: {
                    name: expenseName,
                    amount: expenseAmount,
                    description: expenseDescription,
                    expenseId: expenseId
                },
            });
            setExpenseName('');
            setExpenseAmount('');
            setExpenseDescription('');
            setOnUpShow(false)
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name === 'amount') {
            value = parseInt(value)
            setExpenseAmount(value);
        }
        if (name === 'name') {
            setExpenseName(value);
        }
        if (name === 'description') {
            setExpenseDescription(value);
        }
    };

    return (
        <div>
            <Button variant="outline-primary" onClick={() => setOnUpShow(!onUpShow)}>
                Update Expense
            </Button>
            {Auth.loggedIn() ? (
                <>
                    <Modal show={onUpShow} onHide={() => setOnUpShow(false)} role="dialog">
                        <Form onSubmit={handleFormSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Expense</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <textarea
                                    name="name"
                                    placeholder="Name of expense"
                                    value={expenseName}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                    onChange={handleChange}
                                ></textarea>

                                <textarea
                                    name="amount"
                                    placeholder="amount of expense"
                                    value={expenseAmount}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                    onChange={handleChange}
                                ></textarea>

                                <textarea
                                    name="description"
                                    placeholder="description of expense"
                                    value={expenseDescription}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                    onChange={handleChange}
                                ></textarea>

                                <div className='d-flex justify-content-end'>
                                    <Button variant='primary' type='submit' >Update</Button>
                                </div>
                            </Modal.Body>
                        </Form>
                    </Modal>
                </>
            ) : (
                <p>
                    You need to be logged in to see your expenses. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default UpdateForm;