import {
  BrowserRouter as Router,
} from 'react-router-dom';

import React from 'react';
import AppLayout from 'shared/components/core/AppLayout';

export const RoutesApp = [
  {
    path: '/',
    name: 'Home',
    Component: React.lazy(() => import('pages/dashboard'))
  },
  {
    path: '/meeting',
    name: 'Meeting',
    Component: React.lazy(() => import('pages/meetings/create'))
  },
  {
    path: '/meeting/list',
    name: 'Meeting list',
    Component: React.lazy(() => import('pages/meetings/list'))
  },
  {
    path: '/meeting/planning/:idMeeting',
    name: 'Meeting Planning',
    Component: React.lazy(() => import('pages/meetings/planning'))
  },
  {
    path: '/member/list',
    name: 'Members list',
    Component: React.lazy(() => import('pages/members/list'))
  },
];

export default function AppRouter() {


  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
