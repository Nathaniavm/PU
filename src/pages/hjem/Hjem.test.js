import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hjem from './Hjem';
import { BrowserRouter } from 'react-router-dom';

// Simple test to check if the Hjem component renders without crashing
test('renders Icebreakers title', () => {
  render(
    <BrowserRouter>
      <Hjem />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Icebreakers/i);
  expect(linkElement).toBeInTheDocument();
});
