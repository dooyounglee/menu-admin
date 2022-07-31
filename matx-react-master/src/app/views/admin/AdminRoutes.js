import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AdminMenu = Loadable(lazy(() => import('./menu/AdminMenu')));
const AdminAuth = Loadable(lazy(() => import('./auth/AdminAuth')));

const adminRoutes = [
  { path: '/admin/menu', element: <AdminMenu />, auth: authRoles.admin },
  { path: '/admin/auth', element: <AdminAuth />, auth: authRoles.admin },
];

export default adminRoutes;
