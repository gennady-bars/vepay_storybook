import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders integration link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Интеграция/i);
  expect(linkElement).toBeInTheDocument();
});
