import React, {useState} from 'react'
import {View} from 'react-native'
import {Image, Text, Input, Button, useTheme, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {groupService} from '../../services';
import styles from './styles';

export default function JoinGroup({navigation}) {
    const {theme} = useTheme();
    const LineWidth = 290;
    const [inviteCode, setInviteCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        const promiseGroup = groupService.joinGroup(inviteCode);
        promiseGroup.then(result =>{
            setIsLoading(false);
        })
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <View style={{alignItems: "center", display: "flex", marginTop: '10%'}}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    Join Group
                </Text>
                <View style={{display: "flex", alignItems: "center", margin: '5%'}}>
                    <Avatar
                        size={64}
                        rounded
                        icon={{type: 'font-awesome', name: 'users'}}
                        containerStyle={{backgroundColor: 'orange'}}
                    >
                        <Avatar.Accessory size={24}/>
                    </Avatar>
                </View>
                <Input
                    containerStyle={{width: LineWidth}}
                    placeholder='Invite Code'
                    leftIcon={{type: 'font-awesome', name: 'link'}}
                    onChangeText={value => setInviteCode(value)}
                />
                <Button
                    title={'Join Group'}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={handleSubmit}
                    loading={isLoading}
                />
            </View>
        </KeyboardAwareScrollView>
    )
};