import {configData} from '../settings'

export const RegisterUser = async (registerJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/register`,
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
        const response = await fetch(`${configData.SERVER_URL}/auth/login`,
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
        const response = await fetch(`${configData.SERVER_URL}/auth/refresh_token`,
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

export const changePassword = async (oldPassword, newPassword) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/changePassword`,
            {
                method: 'PUT',
                body: JSON.stringify({oldPassword,newPassword})
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return (error)
    }
};