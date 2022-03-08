import { Card, ProgressBar, Stack, Button, Accordion } from 'react-bootstrap';
import ExpenseForm from '../ExpenseForm'
import { REMOVE_EXPENSE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function BudgetCard({ budgets }, now) {
    const classNames = []
    if (now > budgets.amount) {
        classNames.push('bg-danger', 'bg-opacity-10')
    } else if (budgets.gray) {
        classNames.push('bg-light')
    }

    const [removeExpense, { error }] = useMutation(REMOVE_EXPENSE)

    const handleRemoveExpense = async (expenseId) => {
        try {
            const { data } = await removeExpense({
                variables: { expenseId },
            });
        } catch (err) {
            console.error(err);
        }
        window.location.reload()
    }

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

                                        <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}} href={`/budget/${budget._id}`} className='ms-auto'>
                                        <div className='budget-btn'>See Budget</div>
                                            
                                        </Button>
                                        <ExpenseForm budgetId={budget._id}></ExpenseForm>
                                    </div>
                                    <br />
                                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                                        {budget.expenses.map((expense) =>
                                            <Accordion.Item id="expense-items" key={expense._id} eventKey={expense._id}>
                                                <Accordion.Header id="expense-Bg">{expense.name}</Accordion.Header>
                                                <Accordion.Body >
                                                    ${expense.amount} - {expense.description}
                                                    <div className='d-flex justify-content-end'>
                                                        <Button
                                                            style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}}
                                                            type='submit'
                                                            onClick={() => handleRemoveExpense(expense._id)}><div className='budget-btn'>Delete</div></Button>
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