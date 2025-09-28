import { client } from '../axios';
import { User } from '../entities';

// Mock account info function
export async function getAccountInfo() {
  // Check if we have a mock token in localStorage
  const token = localStorage.getItem('access_token');
  
  if (token && token.startsWith('mock_')) {
    // Return mock user data
    return User.parse({
      id: 'mock_user_123',
      email: 'switrusAdmin@example.com',
      name: 'Switrus Admin',
      displayName: 'Switrus Admin',
      avatarUrl: null,
    });
  }
  
  // Fallback to original API call for non-mock tokens
  const response = await client.get('account');
  return User.parse(response.data);
}
