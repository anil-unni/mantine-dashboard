import { authService } from '../services';
import { User } from '../../types/api';

export async function getAccountInfo(): Promise<User> {
  return authService.getProfile();
}
