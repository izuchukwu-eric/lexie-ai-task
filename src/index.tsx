import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    StyleSheet
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { StatusBar } from "expo-status-bar";
  import { FontAwesome } from "@expo/vector-icons";
  import Profile from "./components/Profile";
  
  const Index = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [profile, setProfile] = useState<{
         username: string, 
         name: string, 
         avatar: string, 
         followers: string, 
         following: string,
         repos: string
        }>({username: "", name: "", avatar: "", followers: "", following: "", repos: ""});

    useEffect(() => {
        const onSearch = async () => {
          if (!username) {
              return;
          }
          const profile = await fetch(`https://api.github.com/users/${username}`);
          const profileJson = await profile.json();
      
          if (profileJson){
              setProfile({ 
                  username: profileJson?.login, 
                  name: profileJson?.name, 
                  avatar: profileJson?.avatar_url, 
                  followers: profileJson?.followers, 
                  following: profileJson?.following,
                  repos: profileJson?.public_repos
              })
          }
      };
      onSearch()

    }, [username])
 

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
          <View
            style={{
              height: "25%",
              width: "100%",
              backgroundColor: "#2F95DC",
            }}
          >
            <View
              style={{
                  marginHorizontal: 20,
                  marginTop: "20%",
                  flexDirection: "row",
                  alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  borderRadius: 24,
                  borderColor: "#E5E5E5",
                  borderWidth: 1,
                }}>
                <FontAwesome name="search" style={{ marginLeft: 20 }} size={20} color="#B1B1B1" />
                <TextInput
                  style={{
                    width: 270,
                    height: 20,
                    margin: 20,
                  }}
                  placeholder="Search username here..."
                  onChangeText={setUsername}
                />
              </View>
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


            {username && profile && (
              <Profile
                username={profile?.username}
                name={profile?.name}
                avatar={profile?.avatar}
                followers={profile?.followers}
                following={profile?.following}
              />
            )}
            
            {!username &&
              <View
                  style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "30%"
                  }}
              >
                  <Image 
                      style={{
                          height: 150,
                          width: 150
                      }}
                      source={require('./assest/search-3.png')}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#A3A3A391"
                    }}
                  >
                      {`Search a GitHub user`}
                  </Text>
              </View>
            }
          </View>
      </SafeAreaView>
    );
  };
  
  export default Index;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      backgroundColor: "#2F95DC",
    },
});
  