import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders "Hello world"', () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText('Hello world', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see you" if the button was NOT clicked', () => {
    render(<Greeting />);
    const goodByElement = screen.getByText(`It's good to see you!`, {
      exact: false,
    });
    expect(goodByElement).toBeInTheDocument();
  });

  test('renders Changed! if the button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText("It's good to see you!", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
