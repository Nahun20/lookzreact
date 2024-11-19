// CatalogoStyle.test.js
import CatalogoStyle from './catalogostyle';

test('setTheme applies theme correctly', () => {
  // Configuramos el DOM simulado
  document.body.innerHTML = '<div style="--background: white; --color: black; --primary-color: blue;"></div>';
  const theme = {
    background: "#F7B267",
    color: "#000000",
    primaryColor: "#F7B267",
    glassColor: 'rgba(255, 255, 255, 0.5)'
  };

  CatalogoStyle.setTheme(theme);

  // Verificamos que las propiedades de CSS se aplicaron correctamente
  const root = document.querySelector(":root");
  expect(root.style.getPropertyValue('--background')).toBe(theme.background);
  expect(root.style.getPropertyValue('--color')).toBe(theme.color);
  expect(root.style.getPropertyValue('--primary-color')).toBe(theme.primaryColor);
  expect(root.style.getPropertyValue('--glass-color')).toBe(theme.glassColor);
});
