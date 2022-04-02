import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {Image, Text, Input, Button, useTheme, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {groupService} from '../../services';

export default function CreateTask({navigation}) {

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <View style={{alignItems: "center", display: "flex", marginTop: '10%'}}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    Create Group
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
                    placeholder='Name'
                    leftIcon={{type: 'font-awesome', name: 'users'}}
                    onChangeText={value => setGroupName(value)}
                />
                <Input
                    containerStyle={{width: LineWidth}}
                    placeholder='Description'
                    leftIcon={{type: 'font-awesome', name: 'comments-o'}}
                    onChangeText={value => setDescription(value)}
                />
                <Button
                    title={'Create Group'}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    disabled={IsDisable}
                    onPress={handleSubmit}
                    loading={isLoading}
                />
            </View>
        </KeyboardAwareScrollView>
    )
};