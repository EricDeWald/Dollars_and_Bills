import { Card, ProgressBar, Stack, Button, Accordion } from 'react-bootstrap';
import ExpenseForm from '../ExpenseForm'
import { REMOVE_EXPENSE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function BudgetCard({ budgets }, now) {
    console.log("budgets", budgets)
    console.log("spread", { ...budgets })
    // let spread = { ...budgets };
    const classNames = []
    ///currently budgets.amount will not work, needs to be looped over the spread of budgets
    if (now > budgets.amount) {
        classNames.push('bg-danger', 'bg-opacity-10')
    } else if (budgets.gray) {
        classNames.push('bg-light')
    }

    const [removeExpense, { error }] = useMutation(REMOVE_EXPENSE)

    const handleRemoveExpense = async (expenseId) => {
        console.log(expenseId);
        try {
            const { data } = await removeExpense({
                variables: { expenseId },
            });
        } catch (err) {
            console.error(err);
        }
        window.location.reload()
    }

    // const [removeSkill, { error }] = useMutation(REMOVE_SKILL, {
    //     update(cache, { data: { removeSkill } }) {
    //         try {
    //             cache.writeQuery({
    //                 query: QUERY_ME,
    //                 data: { me: removeSkill },
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     },
    // });

    // const handleRemoveSkill = async (skill) => {
    //     try {
    //         const { data } = await removeSkill({
    //             variables: { skill },
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <>
            <div>
                {budgets &&
                    budgets.map((budget) => (
                        <Card key={budget._id} className={classNames.join(' ')}>
                            <Card.Body>
                                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                                    <div className='me-2'>{budget.name}</div>
                                    <div className='d-flex align-items-baseline'>${budget.expenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)}
                                        <span className='text-muted fs-6 ms-1'>
                                            / ${budget.amount}
                                        </span>
                                    </div>
                                </Card.Title>
                                <ProgressBar
                                    className='rounded-pill'
                                    variant={progressBarColor(budget.amount, budget.max)}
                                    min={0}
                                    max={budget.amount}
                                    now={budget.expenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)}
                                />
                                <Stack direction='vertical' gap='2' className='mt-4'>
                                    <div className='d-flex'>

                                        <Button variant='outline-primary' href={`/budget/${budget._id}`} className='ms-auto'>See Budget</Button>
                                        {/* <Button variant='outline-primary' className='ms-auto'>Add Expense</Button> */}
                                        <ExpenseForm budgetId={budget._id}></ExpenseForm>
                                    </div>
                                    {/* <Button variant='outline-secondary'>View Expenses</Button> */}
                                    <br />
                                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                                        {budget.expenses.map((expense) =>
                                            <Accordion.Item key={expense._id} eventKey={expense._id}>
                                                <Accordion.Header>{expense.name}</Accordion.Header>
                                                <Accordion.Body>
                                                    ${expense.amount} - {expense.description}
                                                    <div className='d-flex justify-content-end'>
                                                        <Button
                                                            variant='outline-danger'
                                                            type='submit'
                                                            onClick={() => handleRemoveExpense(expense._id)}>Delete</Button>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                        }
                                    </Accordion>
                                </Stack>
                            </Card.Body>

                        </Card>
                    ))} </div>

        </>
    )
}

function progressBarColor(amount, max) {
    const budgetProgress = amount / max;
    if (budgetProgress < 0.4) {
        return 'primary'
    } else if (budgetProgress < 0.8) {
        return 'warning'
    } else {
        return 'danger'
    }
}