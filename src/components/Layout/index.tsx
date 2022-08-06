import React from "react";
import { Outlet } from "react-router-dom";
import Container from '@mui/material/Container';

import Header from '../Header';

function Layout() {

  return (
    <>
      <Header />

      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout;
