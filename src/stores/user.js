import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    // Signup a new user and send an email verification.
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        // console.log(this.user);
      }
    },
    // Login the user 
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn(
        {
          email: email,
          password: password,
        },
        {
          /* to dont send magic session */
          shouldCreateUser: false,
        }
      );
      if (error) throw error;
      if (user) {
        this.user = user;
        // console.log(this.user);
      }
    },
    // Logout the user
    async signOut() {
      console.log("Saliendo");
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          alert("Ha ocurrido un error al salir de la sesión");
          console.error("Error", error);
          return;
        }
        alert("¡Has salido de la sesión!");
      } catch (error) {
        alert("Error desconocido al salir de la sesión");
        console.error("Error", error);
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});