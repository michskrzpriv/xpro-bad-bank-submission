import React from 'react';
import * as ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

import App from './components/App';


test('Application Renders', () => {
  const {getByText, getByLabelText} = render(<App />);
  const linkElement = getByText(/Welcome to Bad Bank/i);
  expect(linkElement).toBeInTheDocument();
});
