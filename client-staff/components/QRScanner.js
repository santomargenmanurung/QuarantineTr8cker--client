import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Box, Center, Factory } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

export default function QRScanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('')

    const handleBarCodeScanned = ({ type, data }) => {
      console.log(data);
      setScanned(true);
      setScannedData(data)
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);
    

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
      <Camera
          ratio={"16:9"}
        style={styles.cameraStyle}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
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
  });