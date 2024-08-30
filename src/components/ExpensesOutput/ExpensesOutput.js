import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/style";

const ExpensesOutput = ({ expenses, expensesPeriodName, fallBackText }) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.ctn}>
      <ExpensesSummary
        expenses={expenses}
        expensesPeriodName={expensesPeriodName}
      />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 20,
  },
  infoText: {
    color: GlobalStyles.colors.white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
});
