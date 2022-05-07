import React, {useEffect, useState} from 'react'
import {ScrollView, View, ActivityIndicator, Image} from 'react-native'
import {ListItem} from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import styles from './styles';
import {userService} from "../../services";
import image1 from '../../utils/images/1.jpg'
import image2 from '../../utils/images/2.jpg'
import image3 from '../../utils/images/3.jpg'
import image4 from '../../utils/images/4.jpg'

const images=[
    image1,
    image2,
    image3,
    image4
]

export default function GroupsList({handlePress}) {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            const userGroups = userService.getUserGroupsExtended();
            userGroups.then(groups => {
                setGroups(groups);
                setIsLoading(false)
            })
        }
    }, [isFocused]);

    const chooseRandomPicture = () => {
        let random =Math.floor(Math.random() * 4)
        return random;
    }

    return (
        <View style={styles.list}>
            <ScrollView>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicatorWrapper}/>
                {groups.map((group, i) => (
                    <ListItem key={i} bottomDivider onPress={()=>handlePress(group)}>
                        <Image
                            source={images[chooseRandomPicture()]}
                            style={styles.miniLogo}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{color: '#4366b6'}}>
                                {group.name}
                            </ListItem.Title>
                            <ListItem.Subtitle>{group.group_description}</ListItem.Subtitle>
                            <ListItem.Subtitle>your score: {group.current_user_score}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}