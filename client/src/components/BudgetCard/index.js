import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';

export default function BudgetCard({ name, amount, max, gray }) {
    const classNames = []
    if (amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10')
    } else if (gray) {
        classNames.push('bg-light')
    }

    return (
        <Card className={classNames.join(' ')}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>${amount}
                        <span className='text-muted fs-6 ms-1'>
                            / ${max}
                        </span>
                    </div>
                </Card.Title>
                <ProgressBar 
                    className='rounded-pill' 
                    variant={progressBarColor(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <Button variant='outline-primary' className='ms-auto'>Add Expense</Button>
                    <Button variant='outline-secondary'>View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}

function progressBarColor(amount, max) {
    const budgetProgress = amount / max;
    if (budgetProgress < 0.4) {
        return 'primary'
    } else if (budgetProgress <0.8) {
        return 'warning'
    } else {
        return 'danger'
    }
}