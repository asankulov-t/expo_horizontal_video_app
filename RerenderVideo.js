import React, {useEffect, useState} from 'react';
import {ResizeMode, Video} from "expo-av";
import {Dimensions, StyleSheet, View} from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const RerenderVideo = (props) => {

    return <View>
        <Video
            useNativeControls={true}
            key={props.id}
            onPlaybackStatusUpdate={(playbackStatus) => props.videoUpdate(playbackStatus)}
            style={styles.video}
            onLoad={() => true}
            resizeMode={ResizeMode.COVER}
            usePoster={true}
            posterSource={{uri: props.data[props.videoId.id].poster}}
            shouldPlay={true}
            isMuted={true}
            source={{uri:props.data[props.videoId.id].urlVideo}}
        />
    </View>
};
const styles = StyleSheet.create({
    video: {
        width: windowWidth,
        height: windowHeight
    },
});


