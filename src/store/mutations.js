export default{
    addUsers(state, payload) {
        state.users = payload;
      },
      addAdmin(state, payload) {
        state.adminToken = payload;
      },
      addParlourToken(state,payload){
        state.parlourToken = payload
      },addUserToken(state,payload){
        state.userToken=payload
      },
      addAUser(state, payload) {
        state.users.push(payload);
      },
      loadCategories(state,payload){
        state.categories=payload
        
      },
      loadSubCategories(state,payload){

            state.categories[payload.id].subCategories=payload.data.filter(d=>d.categoryId===state.categories[payload.id].id)
            console.log("aaaaaa",state.categories)

        
       },
       loadSubSubCategories(state,payload){
        state.categories[payload.catIndex].subCategories[payload.subIndex].subsubCategories=payload.data
       },
       loadCurrentSalon(state,payload){
        state.currentSalon=payload
       }
      }