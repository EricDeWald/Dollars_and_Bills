
//this is the form working exactly as it was for reference

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BUDGET } from '../../utils/mutations';


import Auth from '../../utils/auth';
import AddBudget from '../AddBudget';

const BudgetForm = () => {
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState();

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
            setBudgetAmount('')
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name === 'amount') {
            value = parseInt(value)

            console.log(typeof value);
            setBudgetAmount(value);

        }
        if (name === 'name') {
            setBudgetName(value);

        }

    };

    return (
        <div>
            {/* <AddBudget show="true"></AddBudget> */}
            <h3>Budgets</h3>

            {Auth.loggedIn() ? (
                <>

                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-lg-9">
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
                        </div>

                        <div className="col-12 col-lg-3">
                            <button className="btn btn-primary btn-block py-3" type="submit">
                                Add Budget
                            </button>
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

// export default BudgetForm;