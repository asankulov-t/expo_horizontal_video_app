import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';
import {ResizeMode, Video} from "expo-av";
import axios from "axios";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {

    const [data, setData] = useState();
    const [videoId, setVideoId] = useState(7)
    useEffect( () => {
        const req= async ()=>await axios.get('https://64411cb4792fe886a89eaf4b.mockapi.io/tv_data/')
        req().then(r =>setData(r.data))

    }, [])
    const playNext=()=>{
        // playNext() method takes the first item in the this.state.playlist array and moves it to the back
        console.log('video did just finish');
        let id=Math.round(Math.abs(Math.random() * data.length-1))
        if (id==videoId){
            setVideoId(++id)
        }else setVideoId(id)
    }
    const videoUpdated=(playbackStatus)=>{
        if(playbackStatus['didJustFinish']){
            playNext();
        }
    }


    const videosArray=data&&data.map((t=>[t.urlVideo, t.poster, t.title]))
    console.log(videosArray&&videosArray[5][1])
    return data&& <View style={styles.container}>
        <Video
            style={styles.video}
            useNativeControls
            title={videosArray[videoId][2]}
            resizeMode={ResizeMode.COVER}
            usePoster={true}
            posterSource={{uri:videosArray[videoId][1]}}
            shouldPlay={true}
            isMuted={true}
            source={{uri: videosArray[videoId][0]}}
            onPlaybackStatusUpdate={(playbackStatus) => videoUpdated(playbackStatus)}
        />
    </View>

}

const styles = StyleSheet.create({
    container: {
        width:1920,
        height:1080,
        flex: 1,
        textAlign:'center'
    },
    video:{
        width:windowWidth,
        height:windowHeight
    },
    // imgContainer:{
    //     position: 'absolute',
    //     width:windowWidth,
    //     alignItems:'center'
    // },
    title:{
        textAlign: 'center',
        textTransform:'uppercase',
        marginTop:'100px',
        color:'#ffa543',
        fontSize:50,
        fontWeight:'bold'
}

});
