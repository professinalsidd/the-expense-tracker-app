import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesItem from "./ExpensesItem";

const ExpensesList = ({ expenses }) => {
  const renderItem = (itemData) => {
    return <ExpensesItem {...itemData.item} />;
  };

  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
