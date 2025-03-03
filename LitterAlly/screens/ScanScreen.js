import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image 
} from 'react-native';

import {
  CameraView,
  useCameraPermissions
} from "expo-camera";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back'); // Use string values 'back' or 'front'
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();

  // State for captured image and trash type
  const [capturedImage, setCapturedImage] = useState(null);
  const [trashType, setTrashType] = useState(null);
  const trashTypes = ['Recyclable', 'Compostable', 'Landfill', 'Hazardous Waste'];
  let trashTypeIndex = useRef(0);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsScanning(true);
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo); // Set the captured image
        setIsScanning(false);
      } catch (error) {
        console.error(error);
        setIsScanning(false);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  // Function to cycle through trash types
  const classifyTrash = () => {
    setTrashType(trashTypes[trashTypeIndex.current]);
    trashTypeIndex.current = (trashTypeIndex.current + 1) % trashTypes.length;
  };

  // Toggle between front and back camera
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera. Please enable camera permissions.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Conditionally render Camera or captured image */}
      {capturedImage ? ( 
        <View style={styles.camera}>
          <Image source={{ uri: capturedImage.uri }} style={styles.capturedImage} />
          {trashType && (
            <Text style={styles.trashTypeText}>This is {trashType}</Text>
          )}
          <TouchableOpacity style={styles.classifyButton} onPress={classifyTrash}>
            <Text style={styles.classifyButtonText}>Classify Trash</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView 
          style={styles.camera} 
          facing={facing}
          ref={cameraRef}
        >
          <View style={[styles.controlsContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Scan Item</Text>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <Ionicons name="camera-reverse-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.scanFrameContainer}>
              <View style={styles.scanFrame} />
              <Text style={styles.scanInstructions}>
                Position the item in the center of the frame
              </Text>
            </View>

            <View style={styles.captureContainer}>
              {isScanning ? (
                <View style={styles.loadingButton}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleTakePicture}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  flipButton: {
    padding: 8,
  },
  scanFrameContainer: {
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  scanInstructions: {
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  captureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  loadingButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(34, 197, 94, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Styles for the captured image and trash type text
  capturedImage: {
    flex: 1,
    resizeMode: 'contain', 
  },
  trashTypeText: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  classifyButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 8,
  },
  classifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  permissionButton: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});