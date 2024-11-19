// Catalogo.test.js
import { render, screen } from '@testing-library/react';
import Catalogo from './catalogo';

test('renders catalog title', () => {
  render(<Catalogo />);
  const titleElement = screen.getByText(/Lo mejor de Lookz/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders product cards', () => {
  render(<Catalogo />);
  const productCards = screen.getAllByRole('img'); // Verifica que haya imágenes en cada tarjeta de producto
  expect(productCards.length).toBeGreaterThan(0); // Asegura que al menos haya un producto
});

test('renders button with text "Ver más"', () => {
  render(<Catalogo />);
  const buttonElement = screen.getAllByText(/Ver más/i); // Verifica que el botón tiene el texto esperado
  expect(buttonElement.length).toBeGreaterThan(0);
});
