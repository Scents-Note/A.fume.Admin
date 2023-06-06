import Head from 'next/head';
import React, { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => (
  <div className="w-full h-full">
    <Head>
      <title>Scents Note Admin</title>
    </Head>
    <div className="w-full h-full">{props.children}</div>
  </div>
);
