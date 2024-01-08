import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

import styled from "@emotion/native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { postStatusState } from "../recoil/recoil";

const Dropdown = () => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCheck(false);
      };
    }, [])
  );

  const [check, setCheck] = useState(false);
  const [postStatus, setPostStatus] = useRecoilState(postStatusState);
  const [status, setStatus] = useState("최신순");

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setCheck((prev) => !prev);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ECECEC",
            padding: 10,
            borderRadius: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ marginRight: 10 }}>{status}</Text>
          {check === false ? (
            <AntDesign name="caretdown" size={20} />
          ) : (
            <AntDesign name="caretup" size={20} />
          )}
        </View>
        {check === true ? (
          <View>
            <DropDownView>
              <DropDownItem>
                <DropDownText
                  onPress={() => {
                    setPostStatus("new");
                    setCheck(false);
                    setStatus("최신순");
                  }}
                >
                  최신 순
                </DropDownText>
                <DropDownText
                  onPress={() => {
                    setPostStatus("price");
                    setCheck(false);
                    setStatus("가격높은순");
                  }}
                >
                  가격 높은 순
                </DropDownText>
                <DropDownText
                  onPress={() => {
                    setPostStatus("due");
                    setCheck(false);
                    setStatus("마감순");
                  }}
                >
                  마감 순
                </DropDownText>
              </DropDownItem>
            </DropDownView>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const DropDownView = styled.View`
  position: absolute;
  width: 100px;
  height: 110px;
  top: 1px;
  right: 1px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
`;

const EditDeleteBtn = styled.View`
  position: absolute;
  right: 15px;
  top: 10px;
`;

const DropDownItem = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 10px;
  border-bottom-width: 0.3px;
  border-color: white;
`;

const DropDownText = styled.Text`
  margin-bottom: 10px;
`;

export default Dropdown;
