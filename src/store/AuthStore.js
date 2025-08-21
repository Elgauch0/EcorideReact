import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  roles: [],
  token_exp: null,
  isLogged: false,
  userID: null,

  login: (token, roles, exp, userID) => {
    set({
      token,
      roles,
      token_exp: exp,
      isLogged: true,
      userID,
    });
  },
  setRole: (role) => {
    set((state) => {
      if (!state.roles.includes(role)) {
        return { roles: [...state.roles, role] };
      }
      return {};
    });
  },

  // Action to handle logout
  logout: () => {
    set({
      token: null,
      roles: [],
      token_exp: null,
      isLogged: false,
      userID: null,
    });
  },
}));
