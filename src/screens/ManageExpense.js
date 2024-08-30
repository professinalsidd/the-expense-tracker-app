import { StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesForm from "../components/ManageExpense/ExpensesForm";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const expensesId = route?.params?.expenseId;
  const isEditing = !!expensesId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const selectedExpense = expensesCtx.expenses.find(
    (exp) => exp.id === expensesId
  );

  const deleteHandler = () => {
    expensesCtx.deleteExpenses(expensesId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expensesData) => {
    if (isEditing) {
      expensesCtx.updateExpenses(expensesId, expensesData);
    } else {
      expensesCtx.addExpenses(expensesData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.rootCtn}>
      <ExpensesForm
        submitHandlerLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.subCtn}>
          <IconButton
            iconName="trash"
            size={24}
            color={GlobalStyles.colors.error50}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  rootCtn: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  subCtn: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
