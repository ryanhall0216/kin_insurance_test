import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import CreditCard from "./components/pages/CreditCard";
import { themes } from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={themes}>
      <Router>
        <Routes>
          <Route path="/" element={<CreditCard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
