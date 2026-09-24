// Static builds never fetch sessions, registrations or protected fees.
// Retain the shared components' types without including the server provider.
import type { portalApi as serverApi, usePortal as serverPortal } from '../app/portal-provider';
export const portalApi: typeof serverApi = async () => {
  throw new Error('A szakmai hozzáférés ezen az oldalon még nem érhető el.');
};
export const usePortal: typeof serverPortal = () => ({
  status: { signedIn: false, active: false, approved: false, admin: false },
  loading: false,
  error: '',
  refresh: async () => {},
  start: async () => {},
  logout: async () => {},
});
