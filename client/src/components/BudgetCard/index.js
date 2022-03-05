import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';


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


    return (
        <>
            <div>
                {budgets &&
                    budgets.map((budget) => (
                        <Card key={budget._id} className={classNames.join(' ')}>
                            <Card.Body>
                                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                                    <div className='me-2'>{budget.name}</div>
                                    <div className='d-flex align-items-baseline'>${25}
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
                                    now={25}
                                />
                                <Stack direction='horizontal' gap='2' className='mt-4'>
                                    <Button variant='outline-primary' className='ms-auto'>Add Expense</Button>
                                    <Button variant='outline-secondary'>View Expenses</Button>
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