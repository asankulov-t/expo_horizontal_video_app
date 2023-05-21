import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from "axios";
import {RerenderVideo} from "./RerenderVideo";


export default function App() {

    const [data, setData] = useState();
    let [videoId, setVideoId] = useState({id:5})
    useEffect(() => {
        const req = async () => await axios.get('https://64411cb4792fe886a89eaf4b.mockapi.io/tv_data/')
        req().then(r => setData(r.data));
    }, []);

    let id = data&&Math.abs(Math.round(Math.random() *data.length - 1))
    if (id== videoId.id) {
        setVideoId({...id, id: Math.abs(Math.round(Math.random() * data.length - 1))})
    }
    const playNext = () => {
        setVideoId({...id, id: id})
    }
    const videoUpdated = (playbackStatus) => {
        if (playbackStatus['didJustFinish']==true) {
            playbackStatus['didJustFinish']=false
            playbackStatus.isPaused=false
            playbackStatus.isBuffering=true
            playbackStatus.isPlaying=true
            playNext();
        }
    }
    return data&&<View style={styles.container}>
        <RerenderVideo
            data={data}
            videoUpdate={videoUpdated}
            videoId={videoId}
        />
    </View>
}
const styles = StyleSheet.create({
    container: {
        width: 1920,
        height: 1080,
        flex: 1,
        textAlign: 'center'
    },
});
