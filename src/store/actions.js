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
            return true;
          }
        } catch (error) { 
          console.error(error);
        }
      },
      async viewAdmin(context, payload) {
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
      async viewUsers(context) {
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
}