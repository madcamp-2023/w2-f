import { Pressable, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import styled from "@emotion/native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";


const DropdownLocation = () => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCheck(false);
      };
    }, [])
  );

  const [check, setCheck] = useState(false);

  return (
    <EditDeleteBtn>
      <TouchableOpacity
        onPress={() => {
          setCheck(!check);
        }}
      >
        {/* //TODO:  */}
        <DropDownText>글 수정</DropDownText>
        {check === true ? (
          <DropDownView>
            <DropDownEdit>
              <DropDownText>글 수정</DropDownText>
            </DropDownEdit>
            <DropDownDelete>
              <DropDownText>글 삭제</DropDownText>
            </DropDownDelete>
          </DropDownView>
        ) : null}
      </TouchableOpacity>
    </EditDeleteBtn>
  );
};

const EditDeleteBtn = styled.View`
  position: absolute;
  top: -10px;
`;

const DropDownView = styled.View`
  position: absolute;
  margin-top: 31px;
  right: -15px;
  width: 100px;
  height: 110px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
`;

const DropDownEdit = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 10px;
  border-bottom-width: 0.3px;
  border-color: white;
`;

const DropDownDelete = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-width: 0.3px;
  border-color: white;
`;

const DropDownText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: black;
`;

export default DropdownLocation;
