import React, {useEffect, useState} from 'react'
import {ScrollView, View, ActivityIndicator, StyleSheet} from 'react-native'
import {ListItem, Icon,} from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import styles from './styles';
import {userService} from "../../services";
import {getData} from "../../utils/asyncStorageUtils";

export default function GroupsList({handlePress}) {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            getData("Access Token").then((accessToken)=>{
                const userGroups = userService.getUserGroups(accessToken);
                userGroups.then(groups => {
                    setGroups(groups);
                    setIsLoading(false)
                })
            });
        }
    }, [isFocused]);

    return (
        <View style={styles.list}>
            <ScrollView>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicatorWrapper}/>
                {groups.map((group, i) => (
                    <ListItem key={i} bottomDivider onPress={handlePress}>
                        <Icon name="user-circle-o" type="font-awesome" color="#00aced"/>
                        <ListItem.Content>
                            <ListItem.Title style={{color: '#4366b6'}}>
                                {group.name}
                            </ListItem.Title>
                            <ListItem.Subtitle>{group.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}