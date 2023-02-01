import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native"
import { Feather, Foundation } from '@expo/vector-icons'; 


interface Props {
    name: string,
    link: string
}

function RepoList({ name, link }: Props) {
  return (
    <SafeAreaView>
        <View
            style={{
                marginTop: 30,
                marginHorizontal: 20
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Feather name="book" size={20} color="black" />
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "600"
                    }}
                >
                    {name}
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Foundation name="link" size={20} color="#2F95DC" />
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: "400",
                        color: "#2F95DC",
                        left: 5
                    }}
                >
                    {link}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RepoList