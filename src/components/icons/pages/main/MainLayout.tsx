import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { drawerStyle } from '@/styles/drawerStyle';
import { DRAWER_WIDTH } from '@/common/constants/constants';

import { Layout, LayoutProps } from '../Layout';
import { CloseSideBarIcon, DrawerLogoIcon, OpenSideBarIcon } from '../../icons';

const PAGES = ['향수', '향료', '카테고리', '브랜드'];

const getPageName = (koPage: string): string => {
  switch (koPage) {
    case '향수':
      return 'perfume';
    case '향료':
      return 'ingredient';
    case '카테고리':
      return 'category';
    case '브랜드':
      return 'brand';
    default:
      return 'null';
  }
};

const getMuiTheme = () =>
  createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 100,
            maxWidth: 300,
          },
        },
      },
    },
  });

export const MainLayout: React.FC<LayoutProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem('token');

    if (loginToken === null || loginToken === undefined) {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    const currentURL = router.asPath;
    if (currentURL.includes('perfume')) setCurrentPage('향수');
    else if (currentURL.includes('ingredients')) setCurrentPage('향료');
    else if (currentURL.includes('category')) setCurrentPage('카테고리');
    else if (currentURL.includes('brand')) setCurrentPage('브랜드');
  }, [router.asPath]);

  const renderMenuButton = (openState: boolean) =>
    !openState ? (
      <IconButton onClick={() => setOpen(true)}>
        <OpenSideBarIcon className="text-[#2C323DDE]" />
      </IconButton>
    ) : (
      <IconButton onClick={() => setOpen(false)}>
        <CloseSideBarIcon className="text-[#2C323DDE]" />
      </IconButton>
    );

  const handleClickList = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @assertion list의 text content는 반드시 있음.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    router.push(`/main/${getPageName(e.currentTarget.textContent!)}`);
  };

  return (
    <Layout>
      <ThemeProvider theme={getMuiTheme()}>
        <AppBar
          className="h-60 flex ml-auto justify-center bg-white text-black"
          sx={{ width: `${open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'}` }}
          position="static"
        >
          <Toolbar>
            {renderMenuButton(open)}{' '}
            <div className="select-none">{`${currentPage}데이터`}</div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          PaperProps={{ style: drawerStyle }}
          open={open}
        >
          <div className="flex h-60 items-center justify-center">
            <DrawerLogoIcon />
          </div>
          <Divider className="bg-black" />
          <List>
            {PAGES.map((text) => (
              <ListItem key={text}>
                <ListItemButton onClick={handleClickList}>
                  <ListItemText
                    className={`w-128 h-36 flex justify-center items-center text-white hover:bg-[#4A6EB114] ${
                      currentPage === text && 'bg-[#4A6EB114]'
                    }`}
                  >
                    {text}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div
          className="ml-auto h-full"
          style={{
            width: `${open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'}`,
          }}
        >
          {props.children}
        </div>
      </ThemeProvider>
    </Layout>
  );
};
