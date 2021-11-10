import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Card = ({ text, image }) => {
  return (
    <View style={styles.card}>
      <Text>{text}</Text>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    marginBottom: 15,
    width:"100%",
  },
  image: {
    width: 310,
    height: 250,
    marginTop: 10,
  },
});
