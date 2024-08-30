import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constants/style";
import Button from "../UI/Button";
import { formattedDate } from "../../utils/formatedDate";

const ExpensesForm = ({
  onCancel,
  submitHandlerLabel,
  onSubmit,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? formattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  const inputHandler = (key, value) => {
    setInputs((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expensesData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountValid = !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateValid = expensesData.date.toString() !== "Invalid Date";
    const descriptionValid = expensesData.description.trim().length > 0;

    if (!amountValid || !dateValid || !descriptionValid) {
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountValid },
          date: { value: prev.date.value, isValid: dateValid },
          description: {
            value: prev.description.value,
            isValid: descriptionValid,
          },
        };
      });
      return;
    }

    onSubmit(expensesData);
  };

  const formIsValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textConfig={{
          multiline: true,
          onChangeText: inputHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid inputs - please check your entered data!
        </Text>
      )}
      <View style={styles.btnCtn}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitHandlerLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpensesForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: GlobalStyles.colors.white,
    textAlign: "center",
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
  },
  btnCtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
