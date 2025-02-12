import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Modal, Pressable, Alert } from "react-native";
import { Box, Center, Factory } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

export default function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});

  // useEffect(() => {},[]);

  const isFocused = useIsFocused();

  const handleBarCodeScanned = ({ type, data }) => {
    try {
      setModalVisible(true);
      setScanned(true);
      setScannedData(data);
      setUserData(JSON.parse(scannedData))
    } catch (error) {
      Alert.alert("Error", "QR Code tidak valid");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
    setScanned(false);
  };

  const handleProceedScan = () => {
    try {
      setScanned(false);
      console.log(scannedData)
      setUserData(JSON.parse(scannedData))
      if (
        userData.status === "ArrivalProcedure" ||
        userData.status === "Interviewed" ||
        userData.status === "Exit Terminal" ||
        userData.status === "On route" ||
        userData.status === "Quarantine" ||
        userData.status === "1st Swab" ||
        userData.status === "2nd Swab"
      ) {
        navigation.navigate("OfficerForm", { userData });
      } else if (userData.status === "Interview") {
        navigation.navigate("InterviewForm", { userData });
      } else if (userData.status === "Briefing") {
        navigation.navigate("BriefingForm", { userData });
      } else {
        Alert.alert("Error", "Status tidak diketahui");
      }
    } catch (error) {
      Alert.alert("Error", "QR Code tidak valid");
      console.log(error)
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log(scanned);
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Scan berhasil, lanjut ke tahap berikutnya?
            </Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => handleProceedScan()}
            >
              <Text style={styles.textStyle}>Benar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleCloseModal()}
            >
              <Text style={styles.textStyle}>Scan Ulang</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {isFocused && (
        <Camera
          ratio={"16:9"}
          style={styles.cameraStyle}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Scanner: {
    flex: 1,
    width: "100%",
  },
  cameraStyle: {
    flex: 1,
    height: "80%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: "#14279B",
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: "#360759",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
