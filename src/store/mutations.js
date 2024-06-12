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
      loadCategories(state,payload){
        state.categories=payload
        
      },
      loadSubCategories(state,payload){
        console.log("payload",payload)
        for (let i=0; i< state.categories.length;++i){
          if (state.categories[i].id === payload.id){
            state.categories[i].subCategories=payload.data
            console.log("aaaaaa",state.categories)
          }
        }
        
       },
       loadSubSubCategories(state,payload){
        state.categories[payload.catIndex].subCategories[payload.subIndex].subsubCategories=payload.data
       }
      }