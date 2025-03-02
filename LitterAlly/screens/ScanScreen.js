import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsScanning(true);
        const photo = await cameraRef.current.takePictureAsync();
        
        // Simulating item recognition with timeout
        setTimeout(() => {
          setIsScanning(false);
          
          // Mock identification result
          const mockResult = {
            item: 'Plastic Bottle',
            category: 'Recyclable',
            binColor: 'Blue',
            points: 10,
            tips: [
              'Remove cap and label if required in your area',
              'Rinse before recycling',
              'Flatten to save space'
            ],
            imageUri: photo.uri
          };
          
          navigation.navigate('ItemResult', { result: mockResult });
        }, 2000);
      } catch (error) {
        console.error(error);
        setIsScanning(false);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera. Please enable camera permissions.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Camera 
        style={styles.camera} 
        type={type}
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
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="camera-reverse-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {}
          <View style={styles.scanFrameContainer}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanInstructions}>
              Position the item in the center of the frame
            </Text>
          </View>
          
          {}
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
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
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
});
