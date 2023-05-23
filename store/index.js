export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser }) {
    if (!authUser) {
      commit('SET_USER', null);
    } else {
      const { uid, email } = authUser;
      commit('SET_USER', { uid, email });
    }
  },

  async registerUser({ commit }, { email, password }) {
    try {
      const { user } = await this.$fire.auth.createUserWithEmailAndPassword(email, password);
      const { uid, email: userEmail } = user;
      commit('SET_USER', { uid, email: userEmail });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async resetPassword({ commit }, { email }) {
    try {
      await this.$fire.auth.sendPasswordResetEmail(email);

      commit('SET_SUCCESS_MESSAGE', 'Um email de redefinição de senha foi enviado para o seu endereço de email.');
    } catch (error) {
      console.error(error);

      if (error.code === 'auth/user-not-found') {
        commit('SET_ERROR_MESSAGE', 'Nenhum usuário encontrado com esse email.');
      } else {
        commit('SET_ERROR_MESSAGE', 'Falha ao enviar o email de redefinição de senha. Tente novamente.');
      }
      throw error;
    }
  },
};

export const getters = {
  isAuthenticated(state) {
    return !!state.user;
  },
};











