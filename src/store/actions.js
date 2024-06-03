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
            console.log(response.data,"Success")
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