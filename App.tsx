import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Card from "./Card";

export default function App() {
  const [text, setText] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const [cardsItems, setCardsItems] = useState([
    {
      text: "Hello World",
      image: "https://coffee.alexflipnote.dev/xCup2pLyRow_coffee.png",
    },
  ]);

  useEffect(() => {
    const getImage = async () => {
    try {
      let response = await fetch("https://coffee.alexflipnote.dev/random.json");
      let json = await response.json();
      return setRandomImage(json.file);
    } catch (error) {
      console.error(error);
    }}
    getImage();
  }, [cardsItems]);

  const onPressButton = () => {
    setCardsItems([
      ...cardsItems,
      {
        text: text,
        image: randomImage,
      },
    ]);
    setText(null);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              onChangeText={(newText: string) => setText(newText)}
              value={text}
              placeholder="Quoi de neuf ?"
            />
          </KeyboardAvoidingView>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPressButton}>
              <Text style={styles.text}>Publier</Text>
            </Pressable>
          </View>
          <View style={styles.cardsContainer}>
            {cardsItems.map((card, index) => {
              return <Card text={card.text} image={card.image} key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    width: "80%",
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    color: "black",
    alignSelf: "center",
  },
  buttonContainer: {
    width:"80%",
  },
  button: {
    width:150,
    height: 35,
    alignSelf: "flex-end",
    alignItems:"center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#F7E302",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width:"80%"
  },
});
