export const MOCK_USER = {
    email: "test@finapp.com",
    password: "123456",
  };
  
  export function generateToken(): string {
    return JSON.stringify({
      userId: 1,
      exp: Date.now() + 1000 * 60 * 60,
    });
  }
  
  export function validateToken(token: string): boolean {
    try {
      const parsed = JSON.parse(token);
      if (!parsed.userId || !parsed.exp) return false;
      if (parsed.exp < Date.now()) return false;
      return true;
    } catch {
      return false;
    }
  }