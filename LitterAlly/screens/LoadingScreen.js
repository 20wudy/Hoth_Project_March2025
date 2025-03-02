"use client"

import { useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LoadingScreen({ navigation }) {
  const [imageSource, setImageSource] = useState(require("../assets/closed_trash.png"))
  const [isClicked, setIsClicked] = useState(false)

  const handleImageClick = () => {
    if (!isClicked) {
      setIsClicked(true)
      setImageSource(require("../assets/open_trash.png"))

      // Navigate to home screen after 2 seconds
      setTimeout(() => {
        navigation.navigate('MainTabs', { screen: 'Home' });
      }, 2000)

      // Reset image after 5 seconds (this will run but user will already be on home screen)
      setTimeout(() => {
        setImageSource(require("../assets/closed_trash.png"))
        setIsClicked(false)
      }, 5000)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to LitterAlly</Text>
        <Text style={styles.subtitle}>Open the lid to take a peek</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleImageClick}
          disabled={isClicked}
          style={styles.imageContainer}
        >
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>

        {isClicked && <Text style={styles.loadingText}>Recycling Microplastics...</Text>}
      </View>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#22c55e",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
    color: "#64748b",
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loadingText: {
    marginTop: 30,
    fontSize: 18,
    color: "#22c55e",
    fontWeight: "600",
  },
})
