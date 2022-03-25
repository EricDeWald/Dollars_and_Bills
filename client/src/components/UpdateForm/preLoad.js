import React from "react";
import { useQuery } from "@apollo/client";

const GetExpenseData = () => {

    const { loading, data } = useQuery(QUERY_EXPENSE, {
        variables: { expenseId: expenseId }
    })
    const expenseData = data?.name || {};
    console.log(expenseData, "expense name")
    if (loading) { return 'Loading data . . .' }

}
// if (loading) { return 'Loading data . . .' }
// const GetExpenseData = async(expenseId) => {
//     try {
//         const { data } = await queryExpenseData({
//             variables: { expenseId },
//         });
//         console.log(data, "expense data")
//         if (error) { console.log(error) }
//         console.log(data, "from GetExpenseData");
        // const preLoadFormData = {
        //     name: data.expenseName,
        //     amount: data.expenseAmount,
        //     description: data.expenseDescription
//         // }
//     } catch (err) {
//         console.error(err)
//     }
// }
export default GetExpenseData