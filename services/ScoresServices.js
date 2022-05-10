import {configData} from '../settings'
import taskUtil from "./utils/taskUtil";


const UserTotalScore = async (userId) => {
    console.log("here")
    try {
        console.log(1)
        const response = await fetch(`${configData.SERVER_URL}/scores/${userId}/userTotalScores`)
        const json = await response.json();
        return json
    } catch (error) {
        console.log(2)
        console.error(error);
        return (error)
    }
};

const UsersScoresByGroupID = async (groupId) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/scores/${groupId}/usersScores`,
            {
                method: 'GET',
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};


export default {
    UserTotalScore,
    UsersScoresByGroupID
};