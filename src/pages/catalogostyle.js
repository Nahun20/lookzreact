const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#1A1A2E"
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

const CatalogoStyle = {
    setTheme
};

export default CatalogoStyle;
