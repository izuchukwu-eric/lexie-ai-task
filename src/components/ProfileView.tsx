import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { StatusBar } from "expo-status-bar";
  import { NavType, RouteType } from "../navigation/types";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { Entypo } from '@expo/vector-icons'; 
  import axios from "axios"
  import RepoList from "./RepoList";
  import ProfileItems from "./ProfileItems";

  
  const ProfileView = () => {
    const navigation = useNavigation<NavType>();
    const route = useRoute<RouteType>();
    const username = route?.params?.username;  
    const avatar = route?.params?.avatar;
    const [repository, setRepository] = useState<any[]>();


    useEffect(() => {
        const getRepository = async () => {
            try {
                const repository = await axios.get(`https://api.github.com/users/${username}/repos`);
                if (repository){
                    setRepository(repository.data)
                } 
            } catch (error) {
                console.warn(error)
            }
        }
        getRepository()
    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
          <View
            style={{
              height: "23%",
              width: "100%",
              backgroundColor: "#2F95DC",
            }}
          >
            <View
              style={{
                  marginHorizontal: 20,
                  marginTop: "10%",
                  alignItems: "flex-start",
              }}
            >
                <TouchableOpacity
                    style={{
                        marginVertical: 20
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Entypo name="chevron-left" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  marginTop: 25
                }}>
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50
                        }}
                        source={{ uri: avatar }}
                    />
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "600",
                            left: 10,
                            color: "#FFFFFF"
                        }}
                    >
                        {username}
                    </Text>
                </View>
            
                <ProfileItems username={username} />
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

            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "600",
                    alignSelf: "flex-start",
                    marginHorizontal: 20,
                    marginTop: 10,
                    color: "#A3A3A3"
                }}
            >
                {`Repos:`}
            </Text>

            <ScrollView>
                {repository && repository?.map((item, i) => (
                    <RepoList name={item?.name} link={item?.html_url} key={i} />
                ))}
            </ScrollView>
          </View>
    </SafeAreaView>
    );
  };
  
  export default ProfileView;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      backgroundColor: "#2F95DC",
    },
});
  