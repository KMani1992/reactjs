export const UPDATE_USER='users:updateUser'
export  function updateUser(newuser){
return({
    type:UPDATE_USER,
    payload:{
        user:newuser
    }
})
}