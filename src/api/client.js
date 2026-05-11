import { mockUser, mockWarehouses } from './mockData';

const BASE_URL = 'http://125.212.207.52:5000';

class ApiClient {
  constructor() {
    this.token = null;
  }

  async login(userName, passWord) {
    console.log('Logging in with:', userName, passWord);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (userName === 'haint' && passWord === '12345678') {
      this.token = mockUser.token;
      return { success: true, data: mockUser };
    }
    return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
  }

  async getWarehouses() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, data: mockWarehouses };
  }

  // Add more methods corresponding to Postman collection as needed
}

export const api = new ApiClient();
