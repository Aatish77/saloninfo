export default{
    getUsers: (state) => state.users,
    getSalons: (state) => state.salons,
    getAdmin: (state) => state.admin,
    getBaseUrl: (state) => state.baseUrl,
    getSalonsPending: (state) => state.salonsPending,
    getServiceCategories: (state) => state.serviceCategories,
    getoffers: (state )=> state.offers,
    getCategories:(state)=> state.categories,
    getCurrentSalon:(state)=> state.currentSalon,
    getAdminToken:(state)=> state.adminToken
}