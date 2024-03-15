import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoggInn from './LoggInn';
import { AuthContext } from '../../AuthContext';

// Mock the AuthContext provider
const mockLogin = jest.fn();

// Create a custom render function that includes the AuthContext provider
const customRender = (ui, options) =>
  render(ui, { wrapper: ({ children }) => <AuthContext.Provider value={{ login: mockLogin }}>{children}</AuthContext.Provider>, ...options });

// Simple test to check if the LoggInn component renders without crashing
test('renders LoggInn component', () => {
  customRender(<LoggInn />);
  expect(screen.getByPlaceholderText('Brukernavn/Epost')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Passord')).toBeInTheDocument();
});

// Additional tests for user inputs and button click
test('allows the user to enter username and password', () => {
  customRender(<LoggInn />);

  // Find the input elements
  const usernameInput = screen.getByPlaceholderText('Brukernavn/Epost');
  const passwordInput = screen.getByPlaceholderText('Passord');

  // Simulate user typing
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Assert that the inputs have the new values
  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('password123');
});

test('calls handleLogin when the login button is clicked', () => {
  customRender(<LoggInn />);

  // Simulate button click
  fireEvent.click(screen.getByRole('button', { name: /logg inn/i }));

  // Check if login function was called
  expect(mockLogin).toHaveBeenCalled();
});


  