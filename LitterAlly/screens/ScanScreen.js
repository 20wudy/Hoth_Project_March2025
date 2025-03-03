import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Animated 
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
  const [facing, setFacing] = useState('back');
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();

  // Points animation value
  const pointsAnimation = useRef(new Animated.Value(0)).current;
  
  // State for captured image, trash type, and quote
  const [capturedImage, setCapturedImage] = useState(null);
  const [trashType, setTrashType] = useState(null);
  const [points, setPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [trashQuote, setTrashQuote] = useState('');
  
  // Trash types with their point values and quotes
  const trashTypes = [
    { 
      name: 'Recyclable', 
      points: 20, 
      quotes: [
        "Oh wow, single-handedly keeping the recycling industry alive? Mother Earth says thanks… I guess.",
        "Your recyclable collection is looking real impressive—planning to build a raft and sail away from your responsibilities?",
        "Damn, with all that cardboard, you might as well open your own Amazon warehouse.",
        "This recyclable has potential to become something useful in the future! Unlike you.",
        "I’m sure the fish will enjoy those microplastics."
      ]
    },
    { 
      name: 'Compostable', 
      points: 20, 
      quotes: [
        "You really bought that fresh produce just to let it die a slow, tragic death in your fridge?",
        "At this point, your fridge is less of an appliance and more of a food graveyard.",
        "Do you even finish your meals, or do you just contribute to the circle of life like a discount Lion King?",
        "At least this trash will actually break down faster than your willpower to quit single-use plastics.",
        "Congrats! Your garbage is officially more biodegradable than your last situationship.",
      ]
    },
    { 
      name: 'Landfill', 
      points: 5, 
      quotes: [
        "You know your trash is basically a time capsule for future archaeologists, right?",
        "With all that landfill trash, I’m starting to think you personally hate the planet.",
        "You generate so much waste, I wouldn’t be surprised if raccoons started paying rent at your place.",
        "A polar bear just shed a single tear."
      ]
    },
    { 
      name: 'Hazardous Waste', 
      points: 5, 
      quotes: [
        "Oh, you’ve got hazardous waste? Planning a science experiment or just slowly poisoning yourself?",
        "Damn, I didn’t know I was hanging out with a walking Superfund site.",
        "Bro, why do you have enough dead batteries to power a small apocalypse?",
        "That trash is almost as toxic as you!"
      ]
    }
  ];
  
  let trashTypeIndex = useRef(0);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsScanning(true);
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo);
        setIsScanning(false);
      } catch (error) {
        console.error(error);
        setIsScanning(false);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  // Function to cycle through trash types, assign points, and display a quote
  const classifyTrash = () => {
    const currentTrashType = trashTypes[trashTypeIndex.current];
    setTrashType(currentTrashType.name);
    
    // Set points and show the points animation
    setPoints(currentTrashType.points);
    setTrashQuote(currentTrashType.quotes[Math.floor(Math.random() * currentTrashType.quotes.length)]);
    setShowPoints(true);
    
    // Start the animation
    pointsAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(pointsAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.delay(5000),
      Animated.timing(pointsAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      setShowPoints(false);
    });
    
    trashTypeIndex.current = (trashTypeIndex.current + 1) % trashTypes.length;
  };

  // Toggle between front and back camera
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Function to go back to camera from image view
  const goBackToCamera = () => {
    setCapturedImage(null);
    setTrashType(null);
    setTrashQuote('');
    setShowPoints(false);
    trashTypeIndex.current = 0;
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

  // Calculate animation styles
  const pointsOpacity = pointsAnimation;
  const pointsScale = pointsAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1.2, 1]
  });
  const pointsTranslateY = pointsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Conditionally render Camera or captured image */}
      {capturedImage ? ( 
        <View style={styles.camera}>
          <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={goBackToCamera}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Review Item</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <Image source={{ uri: capturedImage.uri }} style={styles.capturedImage} />
          
          {trashType && (
            <Text style={styles.trashTypeText}>This is {trashType}</Text>
          )}
          
          {/* Points animation */}
          {showPoints && (
            <Animated.View style={[
              styles.pointsContainer,
              {
                opacity: pointsOpacity,
                transform: [
                  { scale: pointsScale },
                  { translateY: pointsTranslateY }
                ]
              }
            ]}>
              <Text style={styles.pointsText}>+{points} points!</Text>
              <Text style={styles.trashQuote}>{trashQuote}</Text>
            </Animated.View>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.classifyButton} onPress={classifyTrash}>
              <Text style={styles.classifyButtonText}>Classify Trash</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.goBackButton} onPress={goBackToCamera}>
              <Text style={styles.goBackButtonText}>Take Another Photo</Text>
            </TouchableOpacity>
          </View>
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
                  <Ionicons name="camera" size={48} color="white" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    bottom: 150,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  classifyButton: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  classifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#6b7280',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
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
  pointsContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#22c55e',
    paddingHorizontal: 20, 
    paddingVertical: 10,    
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '80%',      
    justifyContent: 'center', 
  },
  
  pointsText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',   
    marginHorizontal: 10, 
  },  
});