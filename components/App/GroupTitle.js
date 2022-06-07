import React, {useEffect, useState} from 'react'
import {View, Image} from 'react-native'
import { Text} from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import placeholder from '../../utils/images/groupPlaceholder.jpg'
import {GetGroupMembers} from "../../services/groupsService";
import {useIsFocused} from "@react-navigation/native";


const GroupTitle = ({groupId, groupName,groupImage, navigation}) => {
    const isFocused = useIsFocused();
    const [members, setMembers] = useState();
    useEffect(async () => {
        let response = await GetGroupMembers(groupId);
        let membersNames = response && response.map && response.map(({display_name}) => (display_name))
        let membersString = membersNames?.join(', ');
        setMembers(membersString);
    },[isFocused]);

    return (
        <View style={[tw`flex flex-row justify-around items-center h-16 p-2`,{
            position: "absolute"
        }]}>
            <Image
                style={[tw`rounded-full -ml-2`,{
                    width: 43,
                    height: 43,
                    marginBottom: 2
                }]}
                source={groupImage? {uri: groupImage} : placeholder }/>
            <View style={[tw`flex flex-col`]}>
                <Text numberOfLines={1}  style={[tw`px-5 font-bold text-white`]}>
                    {groupName}
                </Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[tw`px-5 text-white flex`,{width:200}]}>
                        {members}
                    </Text>
            </View>
        </View>
    )
}
export default GroupTitle
