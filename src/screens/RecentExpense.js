import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/formatedDate";

const RecentExpenseScreen = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpense = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7Days = getDateMinusDays(today, 7);
    return expense.date >= date7Days && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriodName="Last 7 Days"
      fallBackText="No registered expenses are available last 7 days."
    />
  );
};

export default RecentExpenseScreen;

const styles = StyleSheet.create({});
