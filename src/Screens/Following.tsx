import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import { NavType, RouteType } from "../navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Profile from '../components/Profile';
import axios from "axios"


function Following() {
  const navigation = useNavigation<NavType>();
  const route = useRoute<RouteType>();
  const username = route?.params?.username;
  const [following, setFollowing] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const getFollowing = async () => {
          setLoading(true)
            try {
                const following = await axios.get(`https://api.github.com/users/${username}/following`);
                if (following){
                    setFollowing(following.data)
                    setLoading(false)
                } 
            } catch (error) {
                console.warn(error)
            }
        }
        getFollowing()
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
                {`Following`}
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
            {loading &&
              <ActivityIndicator style={{ marginTop: "20%" }} size={50} />
            }
            <ScrollView>
                {following && following?.map((item, i) => (
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

export default Following

const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      backgroundColor: "#2F95DC",
    },
});