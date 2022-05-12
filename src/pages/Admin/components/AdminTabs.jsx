import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sugerencias from "../views/sugerencias";

function TabPanel(props) {
    const {children, value, index, classes, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container maxWidth="false" sx={{mt: 2, width: '100%'}}>
                    <Box>  
                        {children}
                    </Box>
                </Container>
            )}
        </div>
    );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#d50000",
    },
    text: {
      primary: "#212121",
    },
    background: {
      default: "#ffffff",
    },
  },
});

export default function AdminTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#222222" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              sx={{ color: "white" }}
              label="Sugerencias"
              {...a11yProps(0)}
            />
            <Tab sx={{ color: "white" }} label="Otro" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} component={"span"}>
            <Sugerencias />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </Box>
    </ThemeProvider>
  );
}
