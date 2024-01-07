import { useState } from "react";
import { Button, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function PostDatePicker() {
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(null);
  const [body, setBody] = useState(null);
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
