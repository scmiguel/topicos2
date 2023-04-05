import {SafeAreaView, View, TouchableOpacity, StatusBar, StyleSheet, Image, FlatList} from 'react-native'
import {Feather} from '@expo/vector-icons'
import Constants from 'expo-constants'
import Article from './Article'
import Stories from './Stories'

import data from './data.js'

export default function Instagram() {
    function renderItem({item, index}){
        if (index === 0){ // stories
            return (
              <>
                  <View style={styles.stories}> 
                      <Stories stories={data.stories} profile={data.profile}/>
                  </View>
                  <Article item={item}/>
              </>
            )
        }
        else {
            return  <Article item={item}/>
        }
    }
    return (
        <SafeAreaView style={styles.container}> 
            <StatusBar style="dark"/>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="camera" size={24}/>
                </TouchableOpacity>
                <Image source={{
                    uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'}}
                    style={styles.logo}/> 
                <TouchableOpacity>
                    <Feather name="send" size={24}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data.articles}
                renderItem={renderItem}
                keyExtractor={ (item) => item.id.toString()}
                showsVerticalScrollIndicator={false}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    stories: {
        borderBottomWidth: 1, borderBottomColor: "#dbdbdb",
        height: 104,
        padding: 10,
        backgroundColor: "#fafafa"
    },
    logo: {
        flex: 1, height: 30, resizeMode: "contain"
    },
    container: {
        flex: 1, paddingTop: Constants.statusBarHeight
    },
    header: {
        borderBottomWidth: 1, borderBottomColor: "#dbdbdb",
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: 16, height: 44
    }
})