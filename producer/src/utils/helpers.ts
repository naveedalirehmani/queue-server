// Simulates a sign up process by blocking the code for 500 milliseconds.
export function mockSignUp(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

// Simulates sending an email by blocking the code for 1.5 seconds.
export function mockSendEmail(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}
