export const RegisterUser = async (registerJson) => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/users/register',
            {
                method: 'POST',
                body: JSON.stringify(registerJson)
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};


export const Login = async (LoginJson) => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(LoginJson)
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export const RefreshToken = async (token) => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/auth/refresh_token',
            {
                method: 'POST',
                body: JSON.stringify({"refresh_token":token})
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return (error)
    }
};