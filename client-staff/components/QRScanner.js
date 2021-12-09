import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Modal, Pressable } from "react-native";
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

  useEffect(() => {},[]);

  const isFocused = useIsFocused();

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    setModalVisible(true);
    setScanned(true);
    setScannedData(data);
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
    setScanned(false);
  };

  const handleProceedScan = () => {
    setScanned(false);
    setUserData(JSON.parse(scannedData))
    if (
      userData.status === "ArrivalProcedure" ||
      userData.status === "Interviewed" ||
      userData.status === "Exit Terminal" ||
      userData.status === "Quarantine" ||
      userData.status === "SwabPertama"
    ) {
      navigation.navigate("OfficerForm", { userData });
    } else if (userData.status === "Interview") {
      navigation.navigate("InterviewForm", { userData });
    } else if (userData.status === "On Route") {
      navigation.navigate("Briefing", { userData });
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              is this Data true? {scannedData}
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
    backgroundColor: "#E6E6E6",
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
