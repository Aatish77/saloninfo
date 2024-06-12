import axios from "axios";
export default{
    addOneUser(context, payload) {
        context.commit("addAUser", payload);
      },
      async parlourLogin(context, payload) {
        try {
          console.log(payload);
          const response = await axios.post(
            `${context.getters.getBaseUrl}/parlour/ParlourLogin`,
            payload
          );
          if (response.status === 200) {
            console.log(response.data);
            return response;
          }
        } catch (error) { 
          console.error(error);
        }
      },
      async adminLogin(context, payload) {
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/admin/AdminLogin`,
            payload
          );
          if (response.status === 200) {
            console.log(response.data);
            context.commit("addAdmin", response.data);
            return true;
          }
        } catch (error) {
          console.error(error);
        }
      },
      async userLogin(context) {
        try {
          const response = await axios.get(`${context.getters.getBaseUrl}/`);
          if (response.status === 200) {
            context.commit("addUsers", response.data);
          }
        } catch (error) {
          console.error(error);
        }
      },
      async viewCategories(context) {
        try {
          const response = await axios.get(
            `${context.getters.getBaseUrl}/Categories/all`)
          if (response.status===200){
            console.log("Success")
            console.log(response.data)
            context.commit("loadCategories",response.data)
            // for (let i=0;i< context.getters.getCategories.length;i++){
            //   let subCategories = await context.dispatch("viewSubCategories",context.getters.getCategories[i].id)
            //   context.commit("loadSubCategories",{data:subCategories,index:i})
            //     for (let j = 0; j<context.getters.getCategories[i].subCategories;++i){
            //       let subsubCategories = await context.dispatch("viewSubSubCategories",context.getters.getCategories[i].subCategories[j].id)
            //       context.commit("loadSubSubCategories",{data:subsubCategories,catIndex:i,subIndex:j})
            //     }
            // }
            console.log("All cat",context.getters.getCategories)
          }}
          catch(error){
            console.error(error)
          }
      },
      async viewSubCategories(context,payload) {
        try {
          const response = await axios.get(
            `${context.getters.getBaseUrl}/SubCategory/all?categoryId=${payload}`)
          if (response.status>=200 || response.status<300){
            console.log("Success",payload)
            console.log(response.data)
            context.commit("loadSubCategories",{data:response.data,id:payload})
          }}
          catch(error){
            console.error(error)
          }
      },
      async viewSubSubCategories(context,payload) {
        try {
          const response = await axios.get(
            `${context.getters.getBaseUrl}/SubSubCategories/all?subcategoryId=${payload}`)
          if (response.status===200){
            console.log("Success",payload)
            console.log(response.data)
            return response.data
          }}
          catch(error){
            console.error(error)
          }
      },
      async addTheUser(context, payload) {
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/`,
            payload
          );
          if (response.status === 201) {
            console.log(response.data);
            alert("You have been successfully registered");
          }
        } catch (error) {
          console.error(error);
        }
      },
      async addTheAdmin(context, payload) {
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/admin/AdminReg`,
            payload
          );
          if (response.status === 200) {
            console.log(response.data);
            alert("You have been successfully registered");
          }
        } catch (error) {
          console.error(error);
        }
      },
  
      async addTheParlour(context, payload) {
        try {
          console.log(payload);
          const response = await axios.post(
            `${context.getters.getBaseUrl}/parlour/ParlourReg`,
            payload
          );
          if (response.status === 200) {
            console.log(response.data);
            alert("You have been successfully registered");
          }
        } catch (error) {
          console.error(error);
        }
      },
      async checkParlourStatus(context,payload){
        try {
        const response = await axios.get(
          `${context.getters.getBaseUrl}/parlour/ParlourStatus/${payload}`)
        if (response.status===200){
          console.log(response.data,"Success")
        }}
        catch(error){
          console.error(error)
        }
      },
      async addCategories(context,payload){
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/Categories/add`,payload)
          if (response.status===200){
            console.log("Success")
          }}
          catch(error){
            console.error(error)
          }
      },
      async addSubcategory(context,payload){
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/SubCategory/add_Sub?categoryId=${payload.catId}`,payload.form)
          if (response.status===200){
            console.log("Success")
            console.log(response)
            return response
          }}
          catch(error){
            console.error(error)
          }
      },
      async addSubsubcategory(context,payload){
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/SubSubCategory/add_Sub?subCategoryId=2`,payload)
          if (response.status===200){
            console.log("Success")
            console.log(response)
          }}
          catch(error){
            console.error(error)
          }
      },
      async updateParlour(context,payload){
        try{
          const response = await axios.put(`${context.getters.getBaseUrl}/parlour/1`,payload)
          if(response.status===200){
            console.log(response.data,"Success")
          }         
        }catch(error){
          console.error(error)
        }
      }
      
}