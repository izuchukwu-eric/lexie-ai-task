import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import { NavType, RouteType } from "../navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import Profile from '../components/Profile';
import { StatusBar } from "expo-status-bar";
import axios from "axios"



function Followers() {
    const navigation = useNavigation<NavType>();
    const route = useRoute<RouteType>();
    const username = route?.params?.username;
    const [followers, setFollowers] = useState<any[]>();


  useEffect(() => {
    const getFollowers = async () => {
        try {
            const followers = await axios.get(`https://api.github.com/users/${username}/followers`);
            if (followers){
                setFollowers(followers.data)
            } 
        } catch (error) {
            console.warn(error)
        }
    }
    getFollowers()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
          <View
            style={{
              height: "15%",
              width: "100%",
              backgroundColor: "#2F95DC",
            }}
          >
            <View
              style={{
                  marginHorizontal: 20,
                  marginTop: "15%",
                  flexDirection: "row",
                  alignItems: "center",
              }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Entypo name="chevron-left" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              <Text
                style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    left: 120
                }}
              >
                {`Followers`}
              </Text>
             
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>

            <ScrollView>
                {followers && followers?.map((item, i) => (
                    <Profile
                        username={item?.login}
                        avatar={item?.avatar_url}
                        key={i}
                    />
                ))}
            </ScrollView>
            
          </View>
    </SafeAreaView>
  )
}

export default Followers

const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      backgroundColor: "#2F95DC",
    },
});