import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders Vite + React text', () => {
    render(<App />);
    const textElement = screen.getByText(/Vite \+ React/i);
    expect(textElement).toBeInTheDocument();
  });
});