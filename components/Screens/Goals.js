import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { ButtonGroup, Text, Image, useTheme } from 'react-native-elements';
import Leaderboard from "../App/Leaderboard";
import { useIsFocused } from "@react-navigation/native";

export default function Goals() {
    const isFocused = useIsFocused();
    const userRank  = 1;
    const data = [
        {userName: 'Joe', highScore: 52, iconUri: "http://todobom.cs.colman.ac.il/static/b89b2a7fc52d4d07b496d9d77dd2acf1.jpg"},
        {userName: 'Jenny', highScore: 120, iconUri: "http://todobom.cs.colman.ac.il/static/b89b2a7fc52d4d07b496d9d77dd2acf1.jpg"},
    ]
    const  renderHeader = () => {
        return (
            <View colors={[, '#6db5ed', '#1695b7']}
                  style={{ backgroundColor: '#2089dc', padding: 15, paddingTop: 35, alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: 'white', }}>Leaderboard</Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 15, marginTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                        {ordinal_suffix_of(userRank)}
                    </Text>
                    <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                           source={{ uri: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' }} />
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                        0 pts
                    </Text>
                </View>

            </View>
        )
    }

    return (
        <View style={{flex:1}}>
            {renderHeader()}
            <Leaderboard sortBy='highScore' labelBy='userName' data={data} icon='iconUri'/>
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



