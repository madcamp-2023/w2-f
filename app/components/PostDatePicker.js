import { useState } from "react";
import { Button, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function PostDatePicker({ handleDate, handleTime }) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(null);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShow(false); // 먼저 Picker를 닫음

    console.log(selectedDate);

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
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button onPress={() => showMode("date")} title="날짜 선택" />
        <Button onPress={() => showMode("time")} title="시간 선택" />
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
