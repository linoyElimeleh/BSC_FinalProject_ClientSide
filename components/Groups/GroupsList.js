import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import { ListItem, Icon,} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import userService from "../../services/userService";

export default function GroupsList(){
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const userGroups = userService.getUserGroups();
        userGroups.then(groups =>{
            setGroups(groups);
        })
    },[]);

    return(
        <View style={styles.list}>
            {groups.map((group, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon name="user-circle-o" type="font-awesome" color="#4366b" />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: '#4366b6' }}>
                            {group.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>{group.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}

