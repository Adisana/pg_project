import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ruchi Elite text', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Ruchi Elite/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
