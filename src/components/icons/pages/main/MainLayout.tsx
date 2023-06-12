import React, { useState } from 'react';
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material';

import { drawerStyle } from '@/styles/drawerStyle';

import { Layout, LayoutProps } from '../Layout';
import { CloseSideBarIcon, OpenSideBarIcon } from '../../icons';

export const MainLayout: React.FC<LayoutProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const renderMenuButton = (openState: boolean) =>
    !openState ? (
      <IconButton onClick={() => setOpen(true)}>
        <OpenSideBarIcon className="text-white" />
      </IconButton>
    ) : (
      <IconButton onClick={() => setOpen(false)}>
        <CloseSideBarIcon className="text-white" />
      </IconButton>
    );

  return (
    <Layout>
      <AppBar className="h-60 flex justify-center" position="static">
        <Toolbar>{renderMenuButton(open)}</Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        PaperProps={{ style: drawerStyle }}
        open={open}
      >
        <div>test</div>
      </Drawer>
      <div>{props.children}</div>
    </Layout>
  );
};
