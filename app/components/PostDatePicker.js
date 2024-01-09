import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function PostDatePicker({ handleDate, handleTime }) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(null);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShow(false); // 먼저 Picker를 닫음
    if (selectedDate) {
      setDate(selectedDate); // 선택된 날짜/시간을 설정
      if (mode === "date") {
        handleDate(selectedDate);
      } else if (mode === "time") {
        handleTime(selectedDate);
      }
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
          marginBottom: 20,
          marginRight: 20,
        }}
      >
        <Pressable onPress={() => showMode("date")}>
          <Text
            style={{
              backgroundColor: "#5892FF",
              borderRadius: 10,
              padding: 5,
              marginRight: 20,
              color: "white",
            }}
          >
            날짜 선택
          </Text>
        </Pressable>
        <Pressable onPress={() => showMode("time")}>
          <Text
            style={{
              backgroundColor: "#5892FF",
              borderRadius: 10,
              padding: 5,
              color: "white",
            }}
          >
            시간 선택
          </Text>
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
