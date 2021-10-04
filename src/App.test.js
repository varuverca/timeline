import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';

test('renders learn react link', () => {
  render(<Timeline />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
