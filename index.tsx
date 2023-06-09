//import : react components
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
const { width, height } = Dimensions.get("screen");
interface PickerProps {
  visible: boolean;
  setVisibility: any;
  value?: any;
  setValue: any;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  Title?: string;
  cancelButtonText?: string;
  cancelButtonStyle?: any;
  cancelButtonTextStyle?: any;
  confirmButtonText?: string;
  confirmButtonStyle?: any;
  confirmButtonTextStyle?: any;
  position?: "bottom" | "center";
  bgBlur?:
    | "00"
    | "11"
    | "22"
    | "33"
    | "44"
    | "55"
    | "66"
    | "77"
    | "88"
    | "99"
    | "AA"
    | "BB"
    | "CC"
    | "DD"
    | "EE"
    | "FF";
}
const ValuePicker: React.FC<PickerProps> = ({
  visible,
  setVisibility,
  value,
  setValue,
  minValue = 100,
  maxValue = 200,
  unit = "",
  Title = "Select Height",
  cancelButtonText = "Cancel",
  cancelButtonStyle,
  cancelButtonTextStyle,
  confirmButtonText = "Confirm",
  confirmButtonStyle,
  confirmButtonTextStyle,
  position = "center",
  bgBlur = "66",
}) => {
  //variables : ref
  const flatlistRef = useRef();
  const itemHeight = 50;
  //hook : states
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  //function : modal Function
  const closeModal = () => {
    setVisibility(false);
  };
  //function : imp function
  const fetchData = () => {
    const tempData = [""];
    for (let i = minValue; i <= maxValue; i++) {
      if (unit.trim().length > 0) {
        tempData.push(`${i} ${unit}`);
      } else {
        tempData.push(`${i}`);
      }
    }
    tempData.push("");
    setData(tempData);
  };
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const visibleIndex = Math.floor(offsetY / itemHeight) + 1; // Calculate the index of the middle item
    if (visibleIndex >= 0 && visibleIndex < data.length) {
      const middleItem = data[visibleIndex];
      setSelectedIndex(visibleIndex);
    }
  };
  const confirmPress = () => {
    const value = data[selectedIndex];
    setValue(value);
    closeModal();
  };
  //variables : styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000" + bgBlur,
    },
    cenContainer: {
      flex: 1,
      backgroundColor: "#000000" + bgBlur,
      justifyContent: "center",
      alignItems: "center",
    },
    blurView: {
      flex: 1,
    },
    cenBlurView: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    mainView: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    cenMainView: {
      height: height / 3,
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 5,
    },
  });
  //function : render function
  const renderItem = ({ item, index }) => {
    const isMiddleItem = index === selectedIndex;
    return (
      <View
        style={{
          height: itemHeight,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: isMiddleItem ? 18 : 14,
            fontWeight: isMiddleItem ? "bold" : "200",
            color: "#000000",
          }}
        >
          {item}
        </Text>
      </View>
    );
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      onShow={fetchData}
      transparent
      animationType="fade"
    >
      <View
        style={position == "bottom" ? styles.container : styles.cenContainer}
      >
        <TouchableOpacity
          style={position == "bottom" ? styles.blurView : styles.cenBlurView}
          onPress={closeModal}
        />
        <View
          style={position == "bottom" ? styles.mainView : styles.cenMainView}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            {Title}
          </Text>
          <FlatList
            ref={flatlistRef}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            style={{
              height: 150,
              marginVertical: 20,
            }}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            onScroll={handleScroll}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "20%" }} />
            <TouchableOpacity
              style={{
                backgroundColor: "#e3e3e3",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
                height: 50,
                ...cancelButtonStyle,
              }}
              onPress={closeModal}
            >
              <Text
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                  ...cancelButtonTextStyle,
                }}
              >
                {cancelButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmPress}
              style={{
                backgroundColor: "#FFCC00",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                height: 50,
                borderRadius: 10,
                ...confirmButtonStyle,
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                  ...confirmButtonTextStyle,
                }}
              >
                {confirmButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ValuePicker;
