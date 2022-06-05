import React, { Component } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import gold from '../../utils/images/1.png'
import silver from '../../utils/images/2.png'
import bronze from '../../utils/images/3.png'
import {Avatar} from "react-native-elements";

const images = [
    gold,
    silver,
    bronze
]

const oddRowColor = "white";
const evenRowColor = "#f2f5f7";

export default class Leaderboard extends Component {
    state = {
        sortedData: [],
        prevData: null
    };

    defaultRenderItem = (item, index) => {
        const sortBy = this.props.sortBy;
        const evenColor = this.props.evenRowColor || evenRowColor;
        const oddColor = this.props.oddRowColor || oddRowColor;
        const rowColor = index % 2 === 0 ? evenColor : oddColor;
        const rowJSx = (
            <View style={[styles.row, { backgroundColor: rowColor }]}>
                <View style={styles.left}>
                    {index < 3 &&
                        <Image
                            source={images[index]}
                            style={[styles.avatar, this.props.avatarStyle]}
                        />
                    }
                    {index >=3 &&
                        <Text
                            style={[
                                styles.rank,
                                this.props.rankStyle,
                                index < 9 ? styles.singleDidget : styles.doubleDidget
                            ]}
                        >
                            {parseInt(index) + 1}
                        </Text>
                    }
                    {this.props.icon && item[this.props.icon] && (
                        <Image
                            source={{ uri: item[this.props.icon] }}
                            style={[styles.avatar, this.props.avatarStyle]}
                        />
                    )}
                    {this.props.icon && !item[this.props.icon] && (
                        <Avatar
                            size="small"
                            rounded
                            icon={{name: 'person', type: 'material'}}
                            containerStyle={styles.placeholderAvatar}
                        >
                        </Avatar>
                    )}
                    <Text style={[styles.label, this.props.labelStyle]} numberOfLines={1}>
                        {item[this.props.labelBy]}
                    </Text>
                </View>
                <Text style={[styles.score, this.props.scoreStyle]}>
                    {item[sortBy] || 0}
                </Text>
            </View>
        );

        return this.props.onRowPress ? (
            <TouchableOpacity onPress={() => this.props.onRowPress(item, index)}>
                {rowJSx}
            </TouchableOpacity>
        ) : (
            rowJSx
        );
    };

    renderItem = ({ item, index }) => {
        return this.props.renderItem
            ? this.props.renderItem(item, index)
            : this.defaultRenderItem(item, index);
    };

    componentDidMount() {
        const { data, sortBy, sort } = this.props;
        this.setState({ sortedData: sortData(data, sortBy, sort) });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.prevData !== nextProps.data) {
            return {
                sortedData: sortData(nextProps.data, nextProps.sortBy, nextProps.sort),
                prevData: nextProps.data
            };
        } else {
            return {};
        }
    }

    render() {
        const { sortedData } = this.state;

        return (
            <FlatList
                data={sortedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={data => this.renderItem(data)}
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#d6d7da"
    },
    left: {
        flexDirection: "row",
        alignItems: "center"
    },
    rank: {
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 5
    },
    singleDidget: {
        paddingLeft: 16,
        paddingRight: 6
    },
    doubleDidget: {
        paddingLeft: 10,
        paddingRight: 2
    },
    label: {
        fontSize: 17,
        flex: 1,
        paddingRight: 80
    },
    score: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        right: 15,
        paddingLeft: 15
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        marginRight: 10,

    },
    placeholderAvatar: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        marginRight: 10,
        backgroundColor: 'orange'
    }
});

const sortData = (data, sortBy, sort) => {
    if (sort) {
        return sort(data);
    } else if (typeof data === "object") {
        let sortedKeys =
            data &&
            Object.keys(data).sort((key1, key2) => {
                return data[key2][sortBy] - data[key1][sortBy];
            });
        return (
            sortedKeys &&
            sortedKeys.map(key => {
                return data[key];
            })
        );
    } else if (typeof data === "array") {
        return (
            data &&
            data.sort((item1, item2) => {
                return item2[sortBy] - item1[sortBy];
            })
        );
    }
};