import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ButtonGroup, Text, useTheme } from 'react-native-elements';
import Leaderboard from "../App/Leaderboard";
import { useIsFocused } from "@react-navigation/native";
import {GetMeDetails} from "../../services/userService";
import {UsersScoresByGroupID} from "../../services/ScoresServices";
import trophy from '../../utils/images/trophy.png'

export default function Goals({route}) {
    const groupId = route.params.groupId;
    const [user,setUser] = useState();
    const [userScore,setUserScore] = useState(0);
    const [userRank,setUserRank] = useState(0);
    const [data, setData] = useState([]);
    const [noScores, setNoScores] = useState(false)
    const isFocused = useIsFocused();

    useEffect(async () => {
        let meResponse = await GetMeDetails();
        setUser(meResponse);
        let usersScoreResponse = await UsersScoresByGroupID(groupId);
        console.log(usersScoreResponse);
        const members = usersScoreResponse.members
        setData(members);
        if(members.length == 0){
            setNoScores(true);
        }else{
            calculateUserRank(meResponse,members);
        }
    }, [isFocused]);

    const calculateUserRank = (me,data) => {
        const myDetails = data.find(member=> member.user_id == me.id)
        setUserScore(myDetails?.score);
        const sortedData = data.sort((item1, item2) => {
            return item2['score'] - item1['score'];
        })
        const index = sortedData.map(e => e.user_id).indexOf(me.id);
        setUserRank(index+1)
    }
    const  renderHeader = () => {
        return (
            <View colors={[, '#6db5ed', '#1695b7']}
                  style={{ backgroundColor: '#2089dc', padding: 15, paddingTop: 35, alignItems: 'center' }}>

                {!noScores &&
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        marginBottom: 15, marginTop: 20
                    }}>
                        <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'center', marginRight: 40 }}>
                            You are in {ordinal_suffix_of(userRank)} Place!
                        </Text>
                        {userRank === 1 &&
                            <Image style={{height:60, width:60, resizeMode: 'contain'}}
                                   source={trophy}/>
                        }
                        <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'center', marginLeft: 40 }}>
                            You have {userScore} pts
                        </Text>
                    </View>
                }
                {noScores &&
                    <View>
                        <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'center' }}>
                            There are no tasks!
                            Go on and create some
                        </Text>
                    </View>
                }

            </View>
        )
    }

    return (

        <View style={{flex:1}}>
            {renderHeader()}
            <Leaderboard sortBy='score' labelBy='display_name' data={data} icon='image'/>
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        flex:1,
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center',
        padding: 2,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop:'10%',
        height: '100%',
        width: '100%',

    },
    imageContainer:{
        height: '100%',
        width:'100%'
    },
    imageView:{
        height: '50%',
        width:'80%'
    }
});

const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}



