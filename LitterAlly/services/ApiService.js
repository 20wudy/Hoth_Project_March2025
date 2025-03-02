// ApiService.js
// This file would handle API calls and data management in a production app

import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock database for demo purposes
const mockDatabase = {
  users: {
    current: {
      id: 'user1',
      name: 'John ACMHack',
      email: 'hack@uclaacm.com',
      joinDate: 'March 2025',
      points: 310,
      scans: 24,
      correctSorts: 22,
      badges: [
        { id: '1', name: 'Recycling Rookie', icon: 'ribbon-outline', unlocked: true },
        { id: '2', name: 'Compost Champion', icon: 'leaf-outline', unlocked: true },
        { id: '3', name: 'Waste Warrior', icon: 'shield-outline', unlocked: false },
        { id: '4', name: 'Eco Expert', icon: 'planet-outline', unlocked: false },
      ],
    }
  },
  
  wasteCategories: [
    {
      id: '1',
      name: 'Recyclables',
      color: '#3b82f6',
      icon: 'refresh-circle-outline',
      description: 'Materials that can be reprocessed into new products',
      binColor: 'Blue',
      items: ['Paper', 'Cardboard', 'Plastic bottles', 'Glass jars', 'Aluminum cans'],
    },
    {
      id: '2',
      name: 'Compostables',
      color: '#10b981',
      icon: 'leaf-outline',
      description: 'Organic matter that can decompose naturally',
      binColor: 'Green',
      items: ['Food scraps', 'Yard waste', 'Coffee grounds', 'Eggshells', 'Paper towels'],
    },
    {
      id: '3',
      name: 'Landfill Waste',
      color: '#6b7280',
      icon: 'trash-outline',
      description: 'Items that cannot be recycled or composted',
      binColor: 'Gray',
      items: ['Styrofoam', 'Chip bags', 'Candy wrappers', 'Diapers', 'Pet waste'],
    },
    {
      id: '4',
      name: 'Hazardous Waste',
      color: '#ef4444',
      icon: 'warning-outline',
      description: 'Materials requiring special disposal methods',
      binColor: 'Red',
      items: ['Batteries', 'Paint', 'Electronics', 'Light bulbs', 'Chemicals'],
    },
  ],
  
  // Simple item database for mock identification
  // In a real app, this would be replaced with ML-based identification
  items: [
    {
      id: 'item1',
      name: 'Plastic Bottle',
      category: 'Recyclable',
      categoryId: '1',
      binColor: 'Blue',
      points: 10,
      tips: [
        'This recyclable has potential to become something useful in the future! Unlike you.',
        'Oh wow, single-handedly keeping the recycling industry alive? Mother Earth says thanks… I guess.',
        'I’m sure the fish will enjoy those microplastics.'
      ],
    },
    {
      id: 'item2',
      name: 'Banana Peel',
      category: 'Compost',
      categoryId: '2',
      binColor: 'Green',
      points: 5,
      tips: [
        'At this point, your fridge is less of an appliance and more of a food graveyard.',
        'At least this trash will actually break down faster than your willpower to quit single-use plastics.',
        'You really bought that fresh produce just to let it die a slow, tragic death in your fridge?'
      ],
    },
    {
      id: 'item3',
      name: 'Aluminum Can',
      category: 'Recyclable',
      categoryId: '1',
      binColor: 'Blue',
      points: 10,
      tips: [
        'Rinse before recycling',
        'No need to remove the tab',
        'Can be crushed to save space'
      ],
    },
    {
      id: 'item4',
      name: 'Styrofoam Cup',
      category: 'Landfill',
      categoryId: '3',
      binColor: 'Gray',
      points: 2,
      tips: [
        'A polar bear just shed a single tear.',
        'You know your trash is basically a time capsule for future archaeologists, right?',
        'You generate so much waste, I wouldn’t be surprised if raccoons started paying rent at your place.'
      ],
    },
    {
      id: 'item5',
      name: 'Used Battery',
      category: 'Hazardous',
      categoryId: '4',
      binColor: 'Red',
      points: 15,
      tips: [
        'That trash is almost as toxic as you!',
        'Take to designated drop-off locations',
        'Some electronic stores offer battery recycling'
      ],
    },
  ],
  
  // User scan history would be stored here
  scanHistory: []
};

// Simulate API latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  // ------------- USER METHODS -------------
  
  async getUserProfile() {
    await delay(500); // Simulate network request
    return mockDatabase.users.current;
  }
  
  async updateUserPoints(points) {
    await delay(300);
    const currentUser = mockDatabase.users.current;
    currentUser.points += points;
    
    // Store updated points in AsyncStorage for persistence
    try {
      await AsyncStorage.setItem('@user_points', currentUser.points.toString());
    } catch (error) {
      console.error('Error saving points:', error);
    }
    
    return currentUser;
  }
  
  async incrementScanCount() {
    await delay(200);
    mockDatabase.users.current.scans += 1;
    return mockDatabase.users.current.scans;
  }
  
  async incrementCorrectSorts() {
    await delay(200);
    mockDatabase.users.current.correctSorts += 1;
    return mockDatabase.users.current.correctSorts;
  }
  
  // ------------- WASTE CATEGORY METHODS -------------
  
  async getWasteCategories() {
    await delay(500);
    return mockDatabase.wasteCategories;
  }
  
  async getCategoryById(id) {
    await delay(300);
    return mockDatabase.wasteCategories.find(cat => cat.id === id);
  }
  
  // ------------- SCANNING METHODS -------------
  
  // In a real app, this would connect to a machine learning API
  // Here we're just simulating item identification with random selection
  async identifyItem(imageUri) {
    await delay(2000); // Simulate processing time
    
    // Randomly select an item from our mock database
    const randomIndex = Math.floor(Math.random() * mockDatabase.items.length);
    const identifiedItem = mockDatabase.items[randomIndex];
    
    // Add the image URI to the result
    const result = {
      ...identifiedItem,
      imageUri,
      timestamp: new Date().toISOString()
    };
    
    // Save to scan history
    mockDatabase.scanHistory.push(result);
    
    return result;
  }
  
  async getScanHistory() {
    await delay(500);
    return mockDatabase.scanHistory;
  }
  
  // ------------- SETTINGS METHODS -------------
  
  async saveSettings(settings) {
    await delay(300);
    try {
      await AsyncStorage.setItem('@user_settings', JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }
  
  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem('@user_settings');
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error retrieving settings:', error);
      return null;
    }
  }
}

export default new ApiService();