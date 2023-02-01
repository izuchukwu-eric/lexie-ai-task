import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { NavType } from "../navigation/types";
  import { useNavigation } from "@react-navigation/native";


interface Props {
    username: string,
    name?: string,
    avatar: string,
    followers?: string,
    following?: string,
}

function Profile({username, name, avatar, followers, following }: Props) {
    const navigation = useNavigation<NavType>();

    const onFollowers = () => {
        navigation.navigate("Followers", {
            username: username,
            avatar: avatar
        })
    }

    const onFollowing = () => {
        navigation.navigate("Following", {
            username: username,
            avatar: avatar
        })
    }

    const onProfile = () => {
        navigation.navigate("ProfileDetails", {
            username: username,
            avatar: avatar
        })
    }
  return (
    <SafeAreaView>
        <TouchableOpacity
            style={{
                marginTop: "10%",
                marginHorizontal: 30,
                alignItems: "flex-start",
                borderRadius: 8,
                borderColor: ""
            }}
            onPress={onProfile}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Image 
                    source={{ uri: avatar }}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 44/2
                    }}
                />
                <View
                    style={{
                        marginLeft: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600"
                        }}
                    >
                        {username}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: "#626262"
                        }}
                    >
                        {name}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 65,
                    marginTop: 10,
                    paddingBottom: 20
                }}
            >
                <TouchableOpacity
                    onPress={onFollowers}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                        }}
                    >
                        {followers} {followers && "followers"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onFollowing}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                            marginLeft: 20
                        }}
                    >
                        {following} {following && "following"}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Profile