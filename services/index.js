import userService  from "./userService";
import TasksServices  from "./TasksServices";
import groupService from './groupsService';
import categoriesService from "./categoriesService";
import taskService from "./taskService";
import ScoreServices from "./ScoresServices";
import fetchIntercept from 'fetch-intercept';
import {RefreshToken} from "./AuthServices";
import {getData, storeData} from "../utils/asyncStorageUtils";

const originalRequest = {};

const unregister = fetchIntercept.register({
    request: async function (url, config) {
        const accessToken = await getData("Access Token");
        //TODO: add accessToken to auth headers
        const headers = {
            'Authorization': "Bearer " + accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        originalRequest.url = url;
        originalRequest.config = config;
        return [url, {headers, ...config}];
    },
    requestError: function (error) {
        return Promise.reject(error);
    },

    response: async function (response) {
        if (response.status == 401) {
            const {url, config} = originalRequest;
            const refreshToken = await getData("Refresh Access Token");
            const refreshResponse = await RefreshToken(refreshToken);
            await storeData("Access Token", refreshResponse.accessToken)
            await storeData("Refresh Access Token", response.refreshToken);
            config.headers["Authorization"] = "Bearer " + refreshResponse.accessToken;
            return fetch(url, config);
        }
        return response;
    },

    responseError: function (error) {
        return Promise.reject(error);
    }
});

export {
    unregister,
    userService,
    groupService,
    TasksServices,
    categoriesService,
    taskService,
    ScoreServices
};