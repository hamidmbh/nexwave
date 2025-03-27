
// API client for promotions

// Base URL for API requests
const API_URL = 'http://localhost:5000/api';

export const fetchAllPromotions = async () => {
  try {
    const response = await fetch(`${API_URL}/promotions`);
    if (!response.ok) {
      throw new Error('Failed to fetch promotions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching promotions:', error);
    throw error;
  }
};

export const fetchPromotionsByType = async (type: string) => {
  try {
    const response = await fetch(`${API_URL}/promotions/type/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} promotions`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type} promotions:`, error);
    throw error;
  }
};

export const fetchPromotionById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/promotions/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch promotion with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching promotion with ID ${id}:`, error);
    throw error;
  }
};
