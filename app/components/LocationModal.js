import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function LocationModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const createNumberPad = () => {
    let pad = [];
    for (let i = 1; i <= 9; i++) {
      pad.push(
        <Pressable
          key={i}
          style={styles.numberPad}
          onPress={() => console.log(i)}
        >
          <Text style={styles.numberPadText}>{i}</Text>
        </Pressable>
      );
    }
    return pad;
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.numberPadContainer}>{createNumberPad()}</View>
        </View>
      </Modal>

      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Open Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  numberPadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  numberPad: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
  },
  numberPadText: {
    fontSize: 20,
    color: "black",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
