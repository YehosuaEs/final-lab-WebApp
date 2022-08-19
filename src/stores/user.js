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
    // Registra un nuevo usuario y envía un email para la activación
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
    // Logea al usuario.
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