import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import { formattedDate } from "../../utils/formatedDate";
import { useNavigation } from "@react-navigation/native";

const ExpensesItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.ctn}>
        <View style={styles.descriptionCtn}>
          <Text style={styles.textBase}>{description}</Text>
          <Text style={styles.textBase}>{formattedDate(date)}</Text>
        </View>
        <View style={styles.subCtn}>
          <Text
            style={{
              ...styles.textBase,
              color: GlobalStyles.colors.primary800,
              textAlign: "center",
            }}
          >
            ${amount?.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpensesItem;

const styles = StyleSheet.create({
  ctn: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 8,
    elevation: 3,
    shadowColor: GlobalStyles.colors.primary500,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 10,
    paddingBottom: 10,
  },
  textBase: {
    fontSize: 16,
    fontWeight: "500",
    color: GlobalStyles.colors.primary50,
  },
  subCtn: {
    backgroundColor: GlobalStyles.colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 8,
    width: 80,
    height: 40,
  },
  descriptionCtn: {
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});
