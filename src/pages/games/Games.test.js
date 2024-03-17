import React from 'react';
import { render, screen } from '@testing-library/react';
import Games from './Games';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    gameID: '1',
  }),
}));

describe('Games Component', () => {
  test('renders game information based on gameID', () => {
    render(
      <Router>
        <Games />
      </Router>
    );
    // Check if the title for the first game is rendered
    expect(screen.getByText('Stiv Heks')).toBeInTheDocument();
  });

  test('displays an alert when the report button is clicked', () => {
    // Use jest.spyOn to spy on the window.alert method
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <Router>
        <Games />
      </Router>
    );

    // Click the report button
    screen.getByText(/Rapporter/).click();

    // Check if alert was called
    expect(alertSpy).toHaveBeenCalledWith("Spillet Stiv Heks (ID: 1) ble rapportert");

    // Clean up the mock to remove any side effects
    alertSpy.mockRestore();
  });
});