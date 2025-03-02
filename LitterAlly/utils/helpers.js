// Helper functions for the LitterAlly app

/**
 * Gets the appropriate color based on the waste category
 * @param {string} category - The waste category name
 * @returns {string} HEX color code
 */
export const getCategoryColor = (category) => {
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
        return '#22c55e'; // App primary green
    }
  };
  
  /**
   * Calculate environmental impact based on user activities
   * @param {number} correctSorts - Number of correctly sorted items
   * @returns {object} Impact metrics
   */
  export const calculateEnvironmentalImpact = (correctSorts) => {
    // These are simplified estimates for demo purposes
    return {
      co2Saved: (correctSorts * 0.5).toFixed(1), // kg of CO2
      waterSaved: (correctSorts * 10).toFixed(0), // liters of water
      energySaved: (correctSorts * 0.25).toFixed(1), // kWh of energy
      landfillReduced: (correctSorts * 0.2).toFixed(1), // kg of waste diverted from landfill
    };
  };
