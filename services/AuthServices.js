export const RegisterUser = async (registerJson) => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/users/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginJson)
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return (error)
    }
};