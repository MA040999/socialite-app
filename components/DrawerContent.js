import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { PRIMARY, SECONDARY, TRANSPARENT } from '../constants/colors';
import { AntDesign, FontAwesome5,Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import userCircle from "../assets/user-circle.png";

export default function DrawerContent(props) {
  const user = useSelector((state) => state.auth.user);

    return (
        <View style={{flex: 1, paddingBottom: 10}}>
            <View style={styles.drawerHeader}>
            {user?.displayImage ? (
          <Image
            source={{ uri: user?.displayImage }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              
            }}
          />
        ) : (
          <Image
            source={userCircle}
            style={{  width: 80, height: 80, borderRadius: 50 }}
          />
        )}
            <Text style={styles.userName}>{user?.fullname}</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <DrawerItem
                icon={({focused, color, size})=><Ionicons name="exit-outline" size={size} color={color} />}
                label="Signout"
                onPress={() => {}}
                pressColor={TRANSPARENT}
                style={{borderBottomRightRadius: 40, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                inactiveBackgroundColor={SECONDARY}
                inactiveTintColor={PRIMARY}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    drawerHeader: {
        paddingTop: 20,
        paddingBottom: 10,
        borderColor: SECONDARY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userName: {
        marginTop: 20, 
        borderRadius: 8, 
        color: PRIMARY, 
        fontSize: 16, 
        fontWeight: 'bold', 
        backgroundColor: SECONDARY, 
        paddingHorizontal: 20, 
        textAlign: 'center'
    }
})
