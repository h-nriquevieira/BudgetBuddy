import { supabase } from "../config/supabase";
import { ExpenseCreateRequest } from "../types/ExpensesTypes";

export async function getExpenses() {
  const res = await supabase.from("Expense").select();

  return res;

  // mock
  // const expenses = [
  //   {
  //     amount: 250.5,
  //     category_id: 4,
  //     date: "2023-08-15T00:00",
  //     description: null,
  //     id: 1,
  //     name: "Expense 1",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  //   {
  //     amount: 120.75,
  //     category_id: 7,
  //     date: "2023-07-02T00:00",
  //     description: null,
  //     id: 2,
  //     name: "Expense 2",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  //   {
  //     amount: 65.2,
  //     category_id: 10,
  //     date: "2023-09-05T00:00",
  //     description: null,
  //     id: 3,
  //     name: "Expense 3",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  //   {
  //     amount: 310.0,
  //     category_id: 3,
  //     date: "2023-07-25T00:00",
  //     description: null,
  //     id: 4,
  //     name: "Expense 4",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  //   {
  //     amount: 40.8,
  //     category_id: 9,
  //     date: "2023-06-18T00:00",
  //     description: null,
  //     id: 5,
  //     name: "Expense 5",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  //   {
  //     amount: 175.3,
  //     category_id: 5,
  //     date: "2023-08-03T00:00",
  //     description: null,
  //     id: 6,
  //     name: "Expense 6",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  //   {
  //     amount: 90.0,
  //     category_id: 2,
  //     date: "2023-06-30T00:00",
  //     description: null,
  //     id: 7,
  //     name: "Expense 7",
  //     user_id: "cd79b93d-f5b4-46e2-8236-e6c9042e7e91",
  //   },
  // ];
  // return Promise.resolve({ data: expenses });
}

export async function postExpense(expense: ExpenseCreateRequest) {
  return await supabase.from("Expense").insert(expense);
}
