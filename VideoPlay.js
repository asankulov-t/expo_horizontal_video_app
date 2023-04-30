import React from 'react';
import {Video} from "expo-av";
import {StyleSheet, Text, View} from "react-native";

const VideoPlay = (props) => {
    console.log(props)

    return (
        <View style={styles.video}>
            <Video
                shouldPlay={true}
                source={{uri:props.data[props.currentVideo].urlVideo}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    video:{
        position:'none',
        width:'100%',
        height:'100%'
    }
});
export default VideoPlay;