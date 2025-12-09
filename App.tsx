import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [data, setData] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing(current => (current === "back" ? "front" : "back"))
  }

  function handleBarcodeScanned({ data }: { data: string}) {
    setData(data);
  }

  return (
    <View style={styles.container}>
      <CameraView 
      style={styles.camera} 
      facing={facing}
      barcodeScannerSettings={{
        barcodeTypes: ['ean13', 'qr']
      }}
      onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.text}>Scanned Data: {data}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  dataContainer: {
    position: 'absolute',
    top: 64,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  }
});
