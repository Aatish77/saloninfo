export default{
    addUsers(state, payload) {
        state.users = payload;
      },
      addAdmin(state, payload) {
        state.admin = payload;
      },
      addAUser(state, payload) {
        state.users.push(payload);
      },
}