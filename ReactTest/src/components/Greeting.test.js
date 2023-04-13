import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders greeting link', () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText('Hello world', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders good to see you if the button was NOT clicked', () => {
    render(<Greeting />);
    const goodByElement = screen.getByText(`It's good to see you!`, {
      exact: false,
    });
    expect(goodByElement).toBeInTheDocument();
  });

});
