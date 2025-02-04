import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Home, RateReview, LibraryBooks, ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "New Review", icon: <RateReview />, path: "/reviews" },
    { text: "My Reviews", icon: <LibraryBooks />, path: "/dashboard" },
    { text: "Logout", icon: <ExitToApp />, path: "/login" }, //change this to login too!!!! backend shite 0_0
  ];

  return (
    <AppBar position="static" color="primary" className="navbar">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Title on the left */}
          <Typography
            variant="h6"
            className="navbar-title"
            sx={{
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
            }}
          >
            AAR Platform
          </Typography>
  
          {/* Menu items on the right */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {menuItems.map((item) => (
              <Button
                component={Link as React.ElementType}
                to={item.path}
                startIcon={item.icon}
                color="inherit"
                sx={{
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    color: 'white',
                  },
                }}
                key={item.text}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
  

};

export default NavigationBar;
