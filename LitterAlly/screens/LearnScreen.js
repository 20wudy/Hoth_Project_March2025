import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock data for waste categories
const categories = [
  {
    id: '1',
    name: 'Recyclables',
    color: '#3b82f6',
    icon: 'refresh-circle-outline',
    description: 'Fancy trash that gets a second chance at life.',
    binColor: 'Blue',
    items: ['Paper', 'Cardboard', 'Plastic bottles', 'Glass jars', 'Aluminum cans'],
  },
  {
    id: '2',
    name: 'Compostables',
    color: '#10b981',
    icon: 'leaf-outline',
    description: 'Nature’s leftovers—because even banana peels deserve a glow-up.',
    binColor: 'Green',
    items: ['Food scraps', 'Yard waste', 'Coffee grounds', 'Eggshells', 'Paper towels'],
  },
  {
    id: '3',
    name: 'Landfill Waste',
    color: '#6b7280',
    icon: 'trash-outline',
    description: 'The garbage graveyard—where bad choices go to stay forever.',
    binColor: 'Gray',
    items: ['Styrofoam', 'Chip bags', 'Candy wrappers', 'Diapers', 'Pet waste'],
  },
  {
    id: '4',
    name: 'Hazardous Waste',
    color: '#ef4444',
    icon: 'warning-outline',
    description: 'Dangerous junk—handle with care unless you want superpowers (not the good kind).',
    binColor: 'Red',
    items: ['Batteries', 'Paint', 'Electronics', 'Light bulbs', 'Chemicals'],
  },
];

export default function LearnScreen({ navigation }) {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('CategoryDetail', { category: item })}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={28} color="white" />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Waste Categories</Text>
        <Text style={styles.subtitle}>
          Because sorting trash should be easier than your last relationship.
        </Text>
      </View>
      
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  listContainer: {
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});
