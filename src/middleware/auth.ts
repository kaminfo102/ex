import { useAuthStore } from '../stores/authStore';

export const requireAuth = async (context: any) => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  
  if (!isAuthenticated) {
    return context.redirect('/login');
  }
  
  return context.next();
};

export const requireAdmin = async (context: any) => {
  const user = useAuthStore.getState().user;
  
  if (!user || user.role !== 'admin') {
    return context.redirect('/');
  }
  
  return context.next();
};