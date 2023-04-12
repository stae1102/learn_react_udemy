import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders greeting link', () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText('Hello world', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
