import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import './styles.scss';


function Header() {

  return (
    <>
      <AppBar component="nav" className="px-5">
        <Toolbar>
          <Typography
            data-cy="header-background"
            variant="h6"
            component="div"
            className="title"
            sx={{ flexGrow: 1, display: { xs: 'block' } }}
          >
            <h3 className="m-0" data-cy="header-title">TO DO LIST APP</h3>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}

export default Header;
