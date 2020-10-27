import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enterednumber, setEnteredNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberChangeHandler = (inputText) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredNumber("");
    setConfirm(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(enterednumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number ",
        "Number has to be a number between 1 to 99.",
        [{ text: "ok", style: "destructive", onPress: resetHandler }]
      );
      return;
    }
    setConfirm(true);
    setSelectedNumber(chosenNumber);
    setEnteredNumber("");
    Keyboard.dismiss();
  };

  const renderOutput = () => {
    if (confirm) {
      return (
        <Card style={styles.summaryContainer}>
          <BodyText>You Selected</BodyText>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <MainButton onPress={() => props.onStartGame(selectedNumber)}>
            Start Game
          </MainButton>
        </Card>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberChangeHandler}
            value={enterednumber}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="reset"
                color={colors.accent}
                onPress={resetHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="confirm"
                color={colors.primary}
                onPress={confirmHandler}
              />
            </View>
          </View>
        </Card>
        {renderOutput()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    // width: 80,
    width: Dimensions.get("window").width / 4,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
