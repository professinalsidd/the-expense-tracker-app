import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

const ExpensesSummary = ({ expenses, expensesPeriodName }) => {
  const expensesSum = expenses?.reduce((sum, expenses) => {
    return sum + expenses.amount;
  }, 0);
  return (
    <View style={styles.ctn}>
      <Text style={styles.heading}>{expensesPeriodName}</Text>
      <Text style={styles.subHeading}>${expensesSum?.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: "500",
    color: GlobalStyles.colors.primary500,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: GlobalStyles.colors.primary800,
  },
});
