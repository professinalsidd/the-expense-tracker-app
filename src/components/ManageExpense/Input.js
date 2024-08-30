import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

const Input = ({ invalid, label, textConfig, style }) => {
  const inputStyle = [styles.input];

  if (textConfig && textConfig.multiline) {
    inputStyle.push(styles.inputMultiLine);
  }

  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputCtn, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyle} {...textConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputCtn: {
    marginHorizontal: 4,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 2,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    textAlignVertical: "top",
    minHeight: 100,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
