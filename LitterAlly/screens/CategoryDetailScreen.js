import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryDetailScreen({ route }) {
  const { category } = route.params;
  
  const renderItem = ({ item, index }) => (
    <View style={styles.itemCard}>
      <View style={[styles.itemIcon, { backgroundColor: category.color }]}>
        <Text style={styles.itemNumber}>{index + 1}</Text>
      </View>
      <Text style={styles.itemName}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        {/* Category Header */}
        <View style={[styles.header, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={60} color="white" />
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </View>
        
        {/* Bin Information */}
        <View style={styles.binSection}>
          <View style={styles.binHeader}>
            <Text style={styles.sectionTitle}>Bin Information</Text>
          </View>
          
          <View style={styles.binInfoCard}>
            <View style={[styles.binIndicator, { backgroundColor: category.binColor.toLowerCase() }]} />
            <View style={styles.binTextContainer}>
              <Text style={styles.binTitle}>{category.binColor} Bin</Text>
              <Text style={styles.binDescription}>
                Items in this category should be placed in the {category.binColor.toLowerCase()} bin for proper disposal.
              </Text>
            </View>
          </View>
        </View>
        
        {/* Common Items */}
        <View style={styles.itemsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Common Items</Text>
            <Text style={styles.sectionSubtitle}>Items that belong in this category</Text>
          </View>
          
          <FlatList
            data={category.items}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            scrollEnabled={false}
          />
        </View>
        
        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Disposal Tips</Text>
          </View>
          
          <View style={styles.tipCard}>
            <Ionicons name="information-circle-outline" size={24} color={category.color} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Make sure items are clean and free of food residue before disposal.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Ionicons name="information-circle-outline" size={24} color={category.color} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Check local guidelines as recycling rules can vary by location.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Ionicons name="information-circle-outline" size={24} color={category.color} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              When in doubt, use the scan feature to identify the correct bin.
            </Text>
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
  header: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  binSection: {
    padding: 20,
  },
  binHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  binInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  binIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  binTextContainer: {
    flex: 1,
  },
  binTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  binDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  itemsSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  tipsSection: {
    padding: 20,
    paddingTop: 0,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  tipIcon: {
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
  },
});
