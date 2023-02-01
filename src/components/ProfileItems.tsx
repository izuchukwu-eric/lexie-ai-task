import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native"


interface Props {
    username: string
}

function ProfileItems({ username }: Props) {
    const [profile, setProfile] = useState<{
        avatar: string, 
        followers: string, 
        following: string,
        repos: string
       }>({avatar: "", followers: "", following: "", repos: ""});


    useEffect(() => {
        const getProfileItems = async () => {
            try {
                const profile = await fetch(`https://api.github.com/users/${username}`);
                const profileJson = await profile.json();
            
                if (profileJson){
                    setProfile({ 
                        avatar: profileJson?.avatar_url, 
                        followers: profileJson?.followers, 
                        following: profileJson?.following,
                        repos: profileJson?.public_repos
                    })
                }   
            } catch (error) {
                console.warn(error)  
            }
        }
        getProfileItems()
    }, [])

  return (
    <SafeAreaView>
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
                marginTop: 40,
                paddingBottom: 20
            }}
        >
            <TouchableOpacity
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "500",
                    }}
                >
                    {profile?.followers} {"followers"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "500",
                        marginLeft: 20
                    }}
                >
                    {profile?.following} {"following"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "500",
                        marginLeft: 20
                    }}
                >
                    {profile?.repos} {"repos"}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ProfileItems