import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Modal, Button, Form } from 'react-bootstrap';
import './budgetForm.css'
import { ADD_BUDGET } from '../../utils/mutations';
import Auth from '../../utils/auth';

const BudgetForm = () => {
    const [hoverAddBudget, setHoverAddBudget] = React.useState(false)
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState();
    // const [namePlaceholder, setNamePlaceholder] = useState('Name of Budget');
    // const [amountPlaceholder, setAmountPlaceholder] = useState('Amount of Budget');
    const [nameError, setNameError] = useState('');
    const [amountError, setAmountError] = useState('');
    // const [formErrors, setFormErrors] = useState({budgetName, budgetAmount});
    // const [isSubmit, setIsSubbmit] = useState(false);
    const [onShow, setOnShow] = useState(false);
    const [addBudget, { error }] = useMutation(ADD_BUDGET);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addBudget({
                variables: {
                    name: budgetName,
                    amount: parseInt(budgetAmount)
                },
            });
            // setIsSubbmit(true);
            // setFormErrors(validate({budgetName, budgetAmount}))
            setBudgetName('');
            setBudgetAmount('');
            setNameError('');
            setOnShow(false)
            window.location.reload();
        } catch (err) {
            setNameError('');
            setAmountError('');
            if (!budgetName) {
                setNameError("Budget name is required!")
            }
            if (!budgetAmount) {
                setAmountError("Budget amount is required!")
            } else if (typeof budgetAmount.value !== 'number') {
                setAmountError("Budget amount must be a number!")
            }
            console.error(err);
        }
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name === 'amount') {
            setBudgetAmount(value);
        }
        if (name === 'name') {
            setBudgetName(value);
        }
    };

    // useEffect(() => {
    //     console.log(formErrors);
    //     if(Object.keys(formErrors).length === 0 && isSubmit) {
    //         console.log(budgetName);
    //         console.log(budgetAmount);
    //     }
    // }, [formErrors])
    // const validate = (values) => {
    //     const errors = {}
    //     if (!values.budgetName) {
    //         setNamePlaceholder('Budget name is required!');
    //     }
    //     if (!values.budgetAmount) {
    //         errors.budgetAmount = 'Budget amount is required!'
    //     }
    //     return errors;
    // }

    return (
        <div>
            <Button onMouseEnter={() => setHoverAddBudget(true)} onMouseLeave={() => setHoverAddBudget(false)} style={hoverAddBudget ? { border: "solid #DF20BA 2px", backgroundColor: "#DF20BA", color: "black" } : { border: "solid #DF20BA 2px", backgroundColor: "black", color: "#DFA420" }} onClick={() => setOnShow(!onShow)}>
                <div className='budget-btn'>Add Budget</div>
            </Button>

            {Auth.loggedIn() ? (
                <>
                    <Modal show={onShow} onHide={() => setOnShow(false)} role="dialog">
                        <Form onSubmit={handleFormSubmit}>
                            <Modal.Header style={{ backgroundColor: "#DFA420", border: "solid 2px #DF20BA" }} closeButton>
                                <Modal.Title style={{ color: "#DF20BA" }}>New Budget</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: "black", border: "solid 2px #DF20BA", borderRadius: "5px" }}>
                                <textarea
                                    name="name"
                                    placeholder='Name of Budget'
                                    value={budgetName}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                    onChange={handleChange}
                                ></textarea>
                                <p style={{ color: "#DFA420" }}>{nameError}</p>

                                <textarea
                                    name="amount"
                                    placeholder='Amount of Budget'
                                    value={budgetAmount}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                    onChange={handleChange}
                                ></textarea>
                                <p style={{ color: "#DFA420" }}>{amountError}</p>

                                <div className='d-flex justify-content-end'>
                                    <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black" }} type='submit'>
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