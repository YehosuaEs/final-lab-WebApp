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
    // to Signup a new user and send an email verification.
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    // Login the user 
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
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
  /* -----------------------------------------------------*/
  // async handleSignup(credentials: Credentials) {
  //   try {
  //     const { email, password } = credentials;
  //     // Avisa al usuario si no ha rellenado sus credenciales
  //     if (!email || !password) {
  //       alert("Por favor introduce el correo y la contraseña.");
  //       return;
  //     }
  //     const { error } = await supabase.auth.signUp({ email, password });
  //     if (error) {
  //       alert(error.message);
  //       console.error(error, error.message);
  //       return;
  //     }
  //     alert("Registro comprobado, se enviará un email para la activación");
  //   } catch (err) {
  //     alert("¡Lo sentimos ha ocurrido un error de inicio!");
  //     console.error("Error de singin", err);
  //   }
  // },
  /* -----------------------------------------------------*/

});