import React, { useEffect } from 'react';

const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#1A1A2E"
    },
    {
        background: "#FF4081",
        color: "#FFFFFF",
        primaryColor: "#FF4081"
    },
    {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#461220"
    },
    {
        background: "#F7B267",
        color: "#000000",
        primaryColor: "#F7B267"
    },
    {
        background: "#F25F5C",
        color: "#000000",
        primaryColor: "#F25F5C"
    }
];

const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--glass-color", theme.glassColor || 'rgba(255, 255, 255, 0.5)');
};

const LoginStyle = () => {
    useEffect(() => {
        // Establecer el tema inicial
        setTheme(themes[1]); // Establece el tema rosa (#FF4081)

        const displayThemeButtons = () => {
            const btnContainer = document.querySelector(".theme-btn-container");
            if (btnContainer) {
                // Limpiar el contenedor antes de agregar nuevos botones
                btnContainer.innerHTML = ''; // Limpia el contenido del contenedor

                themes.forEach((theme) => {
                    const div = document.createElement("div");
                    div.className = "theme-btn";
                    div.style.cssText = `background: ${theme.background}; width: 20px; height: 20px; cursor: pointer;`; // Cambia el tamaño aquí
                    btnContainer.appendChild(div);
                    div.addEventListener("click", () => setTheme(theme));
                });
            }
        };

        displayThemeButtons();
    }, []); // El array vacío asegura que esto se ejecute solo al montar

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div className="theme-btn-container" style={{ display: 'flex', gap: '5px' }}>
                {/* Los botones de tema se añadirán aquí */}
            </div>
        </div>
    );
};

export default LoginStyle;
