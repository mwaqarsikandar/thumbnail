import React, {useState} from 'react';
import { StyleSheet, TouchableHighlight, Modal, Dimensions, Text, View, Button,  SafeAreaView, ScrollView, Image } from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import RNMediaThumbnail from 'react-native-media-thumbnail';

import VideoPlayer from 'react-native-video-player';
const {height, width} = Dimensions.get('window');
/**
 * instead of using the ScalableText component you can use the useScaleText hook or scaleText function
 * and either apply it to the React Native's core Text component style or use it outside of React Native components
 *
 * EXAMPLE:
 * import { useScaleText, scaleText } from 'react-native-text';
 *
 * const { fontSize, lineHeight } = useScaleText({ fontSize: 18 });
 * const textScaleStyle = scaleText({ fontSize: 20 });
 * */
export default function App() {
  const [visible, setVisible] = useState('');
  const [path, setPath] = useState('');
  const [thumb, setThumb] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
var sop = "data:image/png;base64,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";

  function nnn(){
    RNFileSelector.Show(
      {
          title: 'Select File',
          onDone: (path) => {
              console.log('file selected: ' + path)
              setPath(path)
              RNMediaThumbnail.getMedia(
                path, // <------- uri: {Image, Video, Audio}
                {
                 
                  'thumbnail': // <------- Optional
                  {
                    'export_uri': 'Base64', // <------- Allowed: {Base64, DESTINATION_FILE_PATH}
                    'export_type': 'jpg', // <------- Allowed: {jpg, png} - Default: jpg
                    'width': 200,
                    'height': 200
                  }
                },
                (params) => {
                  setThumb('data:image/png;base64,' + params["thumbnail"]['uri'])
                  console.log('data:image/png;base64,' + params["thumbnail"]['uri']);
                }, (e) => {
                  console.log('Error: ', e);
                });
          },
          onCancel: () => {
              console.log('cancelled')
          }
      }
  )
  }
  function ooo(){
    RNFileSelector.Show(
      {
          title: 'Select File',
          onDone: (path) => {
              console.log('file selected: ' + path)
              setPath(path)
              RNMediaThumbnail.getMedia(
                path, // <------- uri: {Image, Video, Audio}
                {
                 
                  'thumbnail': // <------- Optional
                  {
                    'export_uri': 'Base64', // <------- Allowed: {Base64, DESTINATION_FILE_PATH}
                    'export_type': 'jpg', // <------- Allowed: {jpg, png} - Default: jpg
                    'width': 200,
                    'height': 200
                  }
                },
                (params) => {
                  setThumb('data:image/png;base64,' + params["thumbnail"]['uri'])
                  console.log('data:image/png;base64,' + params["thumbnail"]['uri']);
                }, (e) => {
                  console.log('Error: ', e);
                });
          },
          onCancel: () => {
              console.log('cancelled')
          }
      }
  )
    }
  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView>
      <Modal
        animationType="slide"
        //animationInTiming = {13900}
       // transparent={true}
        visible={modalVisible}
       // animationOut = "slide"
        swipeDirection = "down"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Thumbnail</Text>
            <Image
   style={{width: width/1.1, height: height/3,marginBottom: 15}}
   source={{uri: thumb}}
   resizeMode={'cover'} // cover or contain its upto you view look
   />
        
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Thumbnail</Text>
      </TouchableHighlight>
        <Text style={styles.headerText}>Your Local Video to Thumbnail</Text>

        <View style={styles.textContainer}>
         
          
          <Image
   style={{width: width/1.1, height: height/3,marginBottom: 15}}
   source={{uri: thumb}}
   resizeMode={'cover'} // cover or contain its upto you view look
   />

          <View style={{marginBottom: 15}}>
          <Button title="press to Select Video" onPress={nnn} />
          </View>
          
          <VideoPlayer
    video={{ uri: 'file://' +path }}
    videoWidth={1600}
    videoHeight={900}
    thumbnail={{ uri: thumb }}
/>
<View style={{marginTop: 15}}>
          <Button title="Send" onPress={ooo} />
          </View>
       
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  textContainer: {
    margin: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    color: 'tomato',
  },
  text: {
    marginTop: 12,
    fontSize: 20,
  },
  bold: {
    fontWeight: '600',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});