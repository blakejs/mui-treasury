import React from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {
  HeaderMockUp,
  NavHeaderMockUp,
  NavContentMockUp,
  ContentMockUp,
  FooterMockUp,
} from '@mui-treasury/mockup/layout';
import {
  Root,
  getHeader,
  getContent,
  getDrawerSidebar,
  getSidebarContent,
  getFooter,
  getSidebarTrigger,
  getCollapseBtn,
  getStandardScheme,
} from '@mui-treasury/layout';

const Header = getHeader(styled);
const Content = getContent(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Footer = getFooter(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const CollapseBtn = getCollapseBtn(styled);

const standardScheme = getStandardScheme();

const StandardLayout = () => {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root scheme={standardScheme}>
        {({ state: { sidebar } }) => (
          <>
            <Header>
              <Toolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                <HeaderMockUp />
              </Toolbar>
            </Header>
            <DrawerSidebar sidebarId="primarySidebar">
              <SidebarContent>
                <NavHeaderMockUp collapsed={sidebar.primarySidebar.collapsed} />
                <NavContentMockUp />
              </SidebarContent>
              <CollapseBtn />
            </DrawerSidebar>
            <Content>
              <ContentMockUp />
            </Content>
            <Footer>
              <FooterMockUp />
            </Footer>
          </>
        )}
      </Root>
    </StylesProvider>
  );
};
// hide-start
StandardLayout.metadata = {
  title: 'Standard Layout',
  path: 'layout/presets/standard',
  files: [],
  relates: [],
};
// hide-end

export default StandardLayout;
