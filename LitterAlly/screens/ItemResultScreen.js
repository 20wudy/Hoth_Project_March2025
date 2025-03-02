import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ItemResultScreen({ route }) {
  const { result } = route.params;
  const navigation = useNavigation();
  const [pointsAdded, setPointsAdded] = useState(false);
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Recyclable':
        return '#3b82f6'; // Blue
      case 'Compost':
        return '#10b981'; // Green
      case 'Landfill':
        return '#6b7280'; // Gray
      case 'Hazardous':
        return '#ef4444'; // Red
      default:
        return '#22c55e';
    }
  };
  
  const handleAddPoints = () => {
    // In a real app, this would call an API to update the user's points
    setPointsAdded(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: result.imageUri }} style={styles.itemImage} />
        </View>
        
        <View style={styles.resultContainer}>
          <View style={styles.itemInfoHeader}>
            <Text style={styles.itemName}>{result.item}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(result.category) }]}>
              <Text style={styles.categoryText}>{result.category}</Text>
            </View>
          </View>
          
          <View style={styles.disposalInstructions}>
            <Text style={styles.sectionTitle}>Disposal Instructions</Text>
            <View style={styles.binInfo}>
              <View style={[styles.binIndicator, { backgroundColor: result.binColor.toLowerCase() }]} />
              <Text style={styles.binText}>Place in the {result.binColor} bin</Text>
            </View>
            
            <Text style={styles.tipsTitle}>Tips:</Text>
            {result.tips.map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <Ionicons name="checkmark-circle" size={18} color="#22c55e" style={styles.tipIcon} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.pointsSection}>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>{result.points} points</Text>
              <Text style={styles.pointsSubtext}>for correct disposal</Text>
            </View>
            
            {!pointsAdded ? (
              <TouchableOpacity 
                style={styles.addPointsButton}
                onPress={handleAddPoints}
              >
                <Text style={styles.addPointsText}>Add to my points</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.pointsAddedButton}>
                <Ionicons name="checkmark-circle" size={18} color="white" style={styles.pointsAddedIcon} />
                <Text style={styles.pointsAddedText}>Points added!</Text>
              </View>
            )}
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.outlineButton}
              onPress={() => navigation.navigate('LearnCategories')}
            >
              <Text style={styles.outlineButtonText}>Learn more</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('ScanCamera')}
            >
              <Text style={styles.primaryButtonText}>Scan another</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    width: '100%',
    backgroundColor: '#f1f5f9',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  resultContainer: {
    padding: 20,
  },
  itemInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
  },
  disposalInstructions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  binInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  binIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  binText: {
    fontSize: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipIcon: {
    marginRight: 8,
  },
  tipText: {
    flex: 1,
  },
  pointsSection: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flex: 1,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  pointsSubtext: {
    color: '#374151',
  },
  addPointsButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addPointsText: {
    color: 'white',
    fontWeight: '600',
  },
  pointsAddedButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsAddedIcon: {
    marginRight: 4,
  },
  pointsAddedText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineButton: {
    borderColor: '#22c55e',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#22c55e',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});