import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MissionForm from "./components/mission_form";
import SavingMissionReview from "./pages/saving_mission_review";
import React from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./components/nav";
import CorporateLayout from "./components/corporate_layout"; // Ensure this matches your file name
import MissionForm from './components/mission_form';
        
import "./App.css";


// Debug Component to Log Current Location
const DebugLocation: React.FC = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname);
  return null; // This component doesn't render anything on the UI
};

// Layout Component for Navigation and Main Content
const App: React.FC = () => {
  return (

    <>
      <CssBaseline />
      <NavigationBar />
      {/* Wrapper to ensure full page scroll */}
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Centering Main Content */}
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mt: 4,
            px: 3, // Adds some padding on small screens
          }}
        >
          <DebugLocation />
          <Outlet />
        </Container>
        {/* Footer at the bottom */}
        <Box component="footer" sx={{ textAlign: "center", py: 3, backgroundColor: "#f5f5f5", mt: "auto" }}>
          © {new Date().getFullYear()} AAR Platform
        </Box>
      </Box>
    </>
>>>>>>> 592b1cd9e1f4c359a3ab2b755e97c3264bb961b4
  );
};

export default App;