
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
            sessionStorage.setItem("parlourToken",response.data)
            context.commit("addParlourToken", response.data);
            console.log(response.data);
            context.commit("loadCurrentSalon",response.data)
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
            sessionStorage.setItem("adminToken",response.data)
            context.commit("addAdmin", response.data);
            return true;
          }
        } catch (error) {
          console.error(error);
        }
      },
      async userLogin(context,payload) {
        try {
          const response = await axios.post(`${context.getters.getBaseUrl}/user/UserLogin`,payload);
          if (response.status>=200 || response.status<300) {
            // context.commit("addUsers", response.data);
            console.log(response.data)
            sessionStorage.setItem("userToken",response.data)
            context.commit("addUserToken", response.data);
            return true
          
          }
        } catch (error) {
          console.error(error);
        }
      },
      async viewCategories(context) {
        try {
          const response = await axios.get(
            `${context.getters.getBaseUrl}/Categories/all`,
          {headers: {
            Authorization: `Bearer ${context.getters.getAdminToken}`}
          })

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
            `${context.getters.getBaseUrl}/SubCategory/all?categoryId=${context.getters.getCategories[payload].id}`,{headers: {
              Authorization: `Bearer ${context.getters.getAdminToken}`}
            })
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
            `${context.getters.getBaseUrl}/SubSubCategories/all?subcategoryId=${payload}`,{headers: {
              Authorization: `Bearer ${context.getters.getAdminToken}`}
            })
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
            `${context.getters.getBaseUrl}/user/UserReg`,
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
      async addOffers(context,payload){
        try{
          const response=await axios.post(
            `${context.getters.getBaseUrl}/offers/offer`,payload
          );
          if(response.status>=200 || response.status<300){
            console.log(response.data);
            alert("Offer added successfully");
          }
      }
      catch(error){
        console.error(error);
      }
    },
      async addseasonaloffer(context,payload){
        try{
          const response=await axios.post(
            `${context.getters.getBaseUrl}/offer-categories/offer?categoryId=${payload.id}`,payload.form
            );
            if(response.status>=200 || response.status<300){
              console.log(response.data);
              alert("Seasonal Offer added successfully");
        }
      }
        catch(error){
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
          if (response.status >= 200 || response.status <= 300 ) {
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
          console.log(context.getters.getAdminToken)
          const response = await axios.post(
            `${context.getters.getBaseUrl}/Categories/add`,payload,{headers: {
              Authorization: `Bearer ${context.getters.getAdminToken}`}
            })
          if (response.status===200){
            alert("Subcategory added successfully")
            console.log("Success")
          }}
          catch(error){
            console.error(error)
          }
      },
      async addSubcategory(context,payload){
        try {
          console.log(payload)
          const response = await axios.post(
            `${context.getters.getBaseUrl}/SubCategory/add_Sub`,payload,{headers: {
              Authorization: `Bearer ${context.getters.getAdminToken}`}
            })
          if (response.status===200){
            alert("Subcategory added successfully")
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
            `${context.getters.getBaseUrl}/SubSubCategory/add_Sub`,payload,{headers: {
              Authorization: `Bearer ${context.getters.getAdminToken}`}
            })
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
      },
      async addToCart(context,payload){
        try{
          const response = await axios.post(`${context.getters.getBaseUrl}/api/cart/add`,payload,
            {headers: {
              Authorization: `Bearer ${context.getters.getUserToken}`}
            }
          )
          if(response.status===200){
            console.log(response.data,"Success")
          }
        }catch (error){
          console.error(error)
        }
      },
      //payment with unique id
      async billPayment(context,payload){
        try{
          const response = await axios.post(`${context.getters.getBaseUrl}/userBill/create?uniqueId=${payload.uniqueId}&discount=${payload.discount}`)
          if(response.status===200){
            console.log(response.data,"Success")
          }
        }catch (error){
          console.error(error)
        }
      },
      async addpayMent(context,payload){
        try {
          const response = await axios.get(
            `${context.getters.getBaseUrl}/orderDetails/createTransaction/${payload.amount}/${payload.id}`,{headers: {
              Authorization: `Bearer ${context.getters.getUserToken}`}
            })
          if (response.status===200){

            console.log(response.data)
            context.commit("loadRazorDetails",response.data)
            return true
          }}
          catch(error){
            console.error(error)
          }
      },
      async addRazorPayment(context,payload){
        try {
          const response = await axios.post(
            `${context.getters.getBaseUrl}/api/verifypayment/payment/${payload.orderId}/${payload.paymentId}/${payload.signature}`,payload,{headers: {
              Authorization: `Bearer ${context.getters.getUserToken}`}
            })
          if (response.status===200){

            console.log(response.data)  
            return true
          }}
          catch(error){
            console.error(error)
          }
      },  
      async addRating(context,payload){
        try{
          const response = await axios.post(`${context.getters.getBaseUrl}/ratings/add?parlourId=${payload.parlourId}`,payload.pay)
          if (response.status===200){
            console.log(response.data)
          }}
          catch(error){
            console.error(error)
          }
        },
        async parlourBookinghistory(context,payload){
          try{
            const response = await axios.get(`${context.getters.getBaseUrl}/../,${payload}`)
            if(response.status===200){
              console.log(response.data)
              context.commit("loadparlourBookinghistory",response.data)
              }}
              catch(error){
                console.error(error)
        
      }
    }
  }
