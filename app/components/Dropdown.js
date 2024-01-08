import { Pressable, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import styled from "@emotion/native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { postStatusState } from "../recoil/recoil";

const DropdownItem = ({ label, isActive, disabled, onClick }) => {
  const getTextColor = () => {
    if (disabled) {
      return "#313131";
    } else if (isActive) {
      return "#131313";
    } else {
      return "#000000";
    }
  };

  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      disabled={disabled}
      onPress={() => {
        if (onClick) {
          onClick(label);
        }
      }}
    >
      <Text style={[{ color: getTextColor() }]}>{label}</Text>
    </Pressable>
  );
};

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

  return (
    <EditDeleteBtn>
      <TouchableOpacity
        onPress={() => {
          setCheck(true);
        }}
      >
        <Entypo name="dots-three-horizontal" size={17} color="#AAAAAA" />
        {check === true ? (
          <DropDownView>
            <DropDownItem>
              <DropDownText
                onPress={() => {
                  setPostStatus("new");
                  setCheck(false);
                }}
              >
                최신순
              </DropDownText>
            </DropDownItem>
            <DropDownItem>
              <DropDownText
                onPress={() => {
                  setPostStatus("price");
                  setCheck(false);
                }}
              >
                가격 높은 순
              </DropDownText>
            </DropDownItem>
            <DropDownItem>
              <DropDownText
                onPress={() => {
                  setPostStatus("due");
                  setCheck(false);
                }}
              >
                마감 임박 순
              </DropDownText>
            </DropDownItem>
          </DropDownView>
        ) : null}
      </TouchableOpacity>
    </EditDeleteBtn>
  );
};

const EditDeleteBtn = styled.View`
  position: absolute;
  right: 15px;
  top: 10px;
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

const DropDownItem = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 10px;
  border-bottom-width: 0.3px;
  border-color: white;
`;

const DropDownText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: black;
`;

export default Dropdown;
