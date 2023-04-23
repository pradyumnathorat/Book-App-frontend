
export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('token')){
        return JSON.parse(localStorage.getItem('token'));
    }
    else{
        return false;
    }
}


export const getUserEmail = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('user')){
        return localStorage.getItem('user');
    }
    else{
        return false;
    }
}

