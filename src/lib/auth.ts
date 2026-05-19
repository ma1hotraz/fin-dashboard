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
