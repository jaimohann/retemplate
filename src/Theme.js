
const defaultThme = {
  primary: "#fff",
  secondary: "#343a40",
  text: "#FFFFFFCC",
  border: "#dee2e6",
  borderInverse:"#4b545c",
  background: "#f4f6f9",
  highlight: "#1f69ab",
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const darkTheme = {
  primary: "#000000",
  secondary: "#353531",
  text: "#FF9505",
  border: "#EC4E20",
  borderInverse:"indigo",
  background: "yellow",
  highlight: "#016FB9",
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const lightTheme = {
  primary: "#3498db",
  secondary: "#2ecc71",
  text: "#2c3e50",
  border: "#95a5a6",
  background: "#ecf0f1",
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const sunriseTheme = {
  primary: "#dfe6e9",
  secondary: "#184e5e",
  text: "#FFFFFFCC",
  border: "#8e8741",
  borderInverse:"#659ebc",
  background: "#fcfeff",
  highlight: "#daad86",
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const sunsetTheme = {
  primary: "#e74c3c",
  secondary: "#f39c12",
  text: "#2c3e50",
  border: "#bdc3c7",
  background: "#f08080",
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const blueSkyTheme = {
  primary: "#87CEEB", // Sky Blue
  secondary: "#F0F8FF", // Alice Blue
  text: "#000",
  border: "#B0E0E6", // Powder Blue
  background: "#87CEFA", // Light Sky Blue
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const forestTheme = {
  primary: "#228B22", // Forest Green
  secondary: "#8FBC8F", // Dark Sea Green
  text: "#2E8B57", // Sea Green
  border: "#556B2F", // Dark Olive Green
  background: "#6B8E23", // Olive Drab
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const desertTheme = {
  primary: "#D2B48C", // Tan
  secondary: "#BC8F8F", // Rosy Brown
  text: "#8B4513", // Saddle Brown
  border: "#A0522D", // Sienna
  background: "#F5DEB3", // Wheat
  success:"#198754",
  danger:"#dc3545",
  warning:"#ffc107"
};

const defaultTheme = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  },
  borderRadius: {
    small: "5px",
    medium: "10px",
    large: "15px",
    circle: "50%",
  },
};



const theme = {
  default: {
    color: defaultThme,
    ...defaultTheme,
  },
  dark: {
    color: darkTheme,
    ...defaultTheme,
  },
  light: {
    color: lightTheme,
    ...defaultTheme,
  },
  sunrise: {
    color: sunriseTheme,
    ...defaultTheme,
  },
  sunset: {
    color: sunsetTheme,
    ...defaultTheme,
  },
  bluesky: {
    color: blueSkyTheme,
    ...defaultTheme,
  },
  forest: {
    color: forestTheme,
    ...defaultTheme,
  },

  desert: {
    color: desertTheme,
    ...defaultTheme,
  },
};

export default theme;
