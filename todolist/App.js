// ---------- 모바일 프로그래밍 ----------
// To-Do-List 과제
// 컴퓨터공학과 2018243027 홍보석

// -------------- 기능구현 --------------
// 1. 할 일 추가하기 ✔️
// 2. 할 일 체크하기 ✔️
// 3. 할 일 삭제하기 ✔️
// 4. 할 일 수정하기 ✔️
// 5. 날짜 출력하기 ✔️
// 6. 다크모드 기능 ✔️

import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// 데이터 공간
const DATA = [
  { timestamp: 1, text: "1. 할 일 추가하기" },
  { timestamp: 2, text: "2. 할 일 체크하기" },
  { timestamp: 3, text: "3. 할 일 삭제하기" },
  { timestamp: 4, text: "4. 할 일 수정하기" },
  { timestamp: 5, text: "5. 다크 모드 기능" },
];

export default function App() {
  const [text, setText] = React.useState("");
  const [reText, setReText] = React.useState("");
  const [data, setData] = React.useState(DATA);
  const [darkMode, setDarkMode] = React.useState(false);

  // 다크모드 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 체크 함수
  const handleCheck = (timestamp) => {
    const updatedData = data.map((item) => {
      if (item.timestamp === timestamp) {
        if (item.backgroundColor) {
          // 체크가 되어 있는 경우, 배경색과 체크 버튼의 아이콘을 변경
          return {
            ...item,
            backgroundColor: undefined,
            textDecorationLine: undefined,
            checkName: "checksquareo",
          };
        } else {
          // 체크가 되어 있지 않은 경우, 배경색과 체크 버튼의 아이콘을 변경
          return {
            ...item,
            backgroundColor: darkMode ? "#eeeeee" : "#707070",
            textDecorationLine: "line-through",
            checkName: "checksquare",
          };
        }
      }
      return item;
    });
    setData(updatedData);
  };

  // 삭제 함수
  const handleDelete = (timestamp) => {
    const res = data.filter((item) => item.timestamp !== timestamp);
    setData([...res]);
  };

  // 추가 함수
  const handleAdd = () => {
    const currentTime = new Date(); // 현재 시간을 가져옴.
    const res = { timestamp: currentTime.getTime(), text: text }; // 현재 시간을 timestamp로 설정
    setData([...data, res]);
    setText(""); // 입력 필드 초기화
  };

  // 투두리스트 렌더링 함수
  const renderItem = ({ item, index }) => {
    const timestamp = new Date(item.timestamp); // timestamp를 Date 객체로 변환
    const dateOptions = { month: "2-digit", day: "2-digit" }; // 날짜 출력값 설정

    return (
      <View
        style={
          darkMode
            ? {
                width: wp(90),
                height: wp(90) / 5,
                backgroundColor:
                  item.backgroundColor !== undefined
                    ? item.backgroundColor
                    : "#FFF",
                marginHorizontal: wp(5),
                borderRadius: 10,
                marginBottom: hp(2),
                marginTop: hp(2),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowOpacity: 0.4,
                shadowRadius: 8,
                shadowOffset: { height: 2, width: 2 },
                elevation: 3,
              }
            : {
                width: wp(90),
                height: wp(90) / 4,
                backgroundColor:
                  item.backgroundColor !== undefined
                    ? item.backgroundColor
                    : "#242424",
                marginHorizontal: wp(5),
                borderRadius: 10,
                marginBottom: hp(2),
                marginTop: hp(2),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "gray",
                shadowOpacity: 0.4,
                shadowRadius: 8,
                shadowOffset: { height: 2, width: 2 },
                elevation: 3,
              }
        }
      >
        <View />
        <MaterialIcons name="circle" size={20} color="#4C62B8" />
        <TextInput
          value={item.text}
          onChangeText={(newText) => {
            const updatedData = data.map((dataItem) => {
              if (dataItem.timestamp === item.timestamp) {
                return { ...dataItem, text: newText };
              }
              return dataItem;
            });
            setData(updatedData);
          }}
          style={
            darkMode
              ? {
                  ...styles.itemText,
                  width: wp(40),
                  textDecorationLine:
                    item.textDecorationLine !== undefined
                      ? item.textDecorationLine
                      : "none",
                }
              : {
                  ...styles.itemText,
                  color: "white",
                  width: wp(40),
                  textDecorationLine:
                    item.textDecorationLine !== undefined
                      ? item.textDecorationLine
                      : "none",
                }
          }
          editable={true}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={darkMode ? { color: "black" } : { color: "white" }}>
            {timestamp.toLocaleDateString(dateOptions).replace(".", "")}
          </Text>
        </View>
      </View>
    );
  };

  // 투두리스트 기능 버튼 렌더링 함수
  const renderHiddenItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <View style={styles.hiddenItemLeft}>
          {/* 체크 */}
          <TouchableOpacity onPress={() => handleCheck(item.timestamp)}>
            <AntDesign
              name={item.checkName || "checksquareo"}
              size={24}
              color="#4C62B8"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.hiddenItemRight}>
          {/* 삭제 */}
          <TouchableOpacity onPress={() => handleDelete(item.timestamp)}>
            <Feather name="delete" size={24} color="#4C62B8" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={
        darkMode
          ? styles.container
          : {
              ...styles.container,
              borderColor: "#fff",
              backgroundColor: "#332F2E",
            }
      }
    >
      <KeyboardAwareScrollView bounces={true}>
        {/*헤더 영역*/}
        <View
          style={
            darkMode
              ? {
                  ...styles.header,
                  width: wp(90),
                  height: hp(5),
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  shadowOffset: { height: 2, width: 2 },
                  elevation: 3,
                }
              : {
                  ...styles.header,
                  width: wp(90),
                  height: hp(5),
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  shadowOffset: { height: 2, width: 2 },
                  elevation: 3,
                  shadowColor: "gray",
                }
          }
        >
          <Text style={styles.headerText}>Check-LIst</Text>
        </View>
        <View style={styles.darkView}>
          {/*다크 모드 버튼*/}
          <TouchableOpacity onPress={toggleDarkMode}>
            <Ionicons
              name={darkMode ? "ios-sunny" : "ios-moon"}
              size={24}
              color={darkMode ? "#000" : "yellow"}
            />
          </TouchableOpacity>
        </View>
        {/*바디 영역*/}
        <View style={{ width: wp(100), height: hp(70) }}>
          <SwipeListView
            data={data}
            renderItem={renderItem}
            leftOpenValue={wp(10)}
            rightOpenValue={-wp(10)}
            renderHiddenItem={renderHiddenItem}
          />
        </View>
        {/*푸터 영역*/}
        <View style={{ width: wp(100), height: hp(10), flexDirection: "row" }}>
          {/* 투두 입력란 */}
          <TextInput
            placeholder="Input the text"
            value={text}
            onChangeText={(newText) => setText(newText)}
            placeholderTextColor="#e5e5e5"
            style={
              darkMode
                ? {
                    color: "white",
                    width: wp(60),
                    marginLeft: wp(10),
                    backgroundColor: "#4C62B8",
                    height: hp(5),
                    paddingLeft: wp(3),
                    borderRadius: 10,
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    shadowOffset: { height: 2, width: 2 },
                    elevation: 3,
                  }
                : {
                    color: "white",
                    width: wp(60),
                    marginLeft: wp(10),
                    backgroundColor: "#4C62B8",
                    height: hp(5),
                    paddingLeft: wp(3),
                    borderRadius: 10,
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    shadowOffset: { height: 2, width: 2 },
                    elevation: 3,
                    shadowColor: "gray",
                  }
            }
          />

          {/*투두 추가 버튼 */}
          <TouchableOpacity
            style={{
              width: hp(5),
              height: hp(5),
              marginLeft: wp(10),
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
            onPress={handleAdd}
          >
            <MaterialCommunityIcons
              name="note-edit-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { height: 2, width: 2 },
    elevation: 3,
  },

  header: {
    margin: 16,
    marginTop: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C62B8",
  },

  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  itemText: {
    marginLeft: 16,
  },

  hiddenItemRight: {
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: 28,
  },

  hiddenItemLeft: {
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 28,
  },

  darkView: {
    alignSelf: "flex-end",
    margin: 8,
  },
});
