import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, 
  Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Learn to Sort Trash Correctly</Text>
          <Text style={styles.heroSubtitle}>
            Interactive learning to help you become a recycling expert and protect our planet.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => navigation.navigate('Scan')}
            >
              <Text style={styles.primaryButtonText}>Start Scanning</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.outlineButton} 
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={styles.outlineButtonText}>Learn Categories</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Feature Section */}
        <View style={styles.featureSection}>
          <FeatureCard 
            icon="scan-outline" 
            title="Scan & Identify" 
            description="Use your camera to scan items and learn how to sort them properly."
            color="#10b981"
            bgColor="#d1fae5"
          />
          
          <FeatureCard 
            icon="checkmark-circle-outline" 
            title="Learn Categories" 
            description="Explore different waste categories and learn what goes where."
            color="#3b82f6"
            bgColor="#dbeafe"
          />
          
          <FeatureCard 
            icon="trophy-outline" 
            title="Earn Points" 
            description="Get rewarded for correct sorting and track your environmental impact."
            color="#f59e0b"
            bgColor="#fef3c7"
          />
        </View>

        {/* Impact Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Items Sorted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Points Earned</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Correct Sorts</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, title, description, color, bgColor }) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    paddingVertical: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    borderColor: '#22c55e',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  outlineButtonText: {
    color: '#22c55e',
    fontWeight: '600',
    fontSize: 16,
  },
  featureSection: {
    padding: 20,
  },
  featureCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'D1FFBD',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  }
});