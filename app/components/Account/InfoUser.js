import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default function InfoUser(props) {

    const { userInfo } = props;
    const { photoURL, displayName, email, phoneNumber } = userInfo;

    console.log(photoURL);

    return (
        <View style={styles.viewUserInfo}>
            <View>
                {photoURL ?
                    <Avatar
                        rounded
                        size="large"
                        showEditButton
                        containerStyle={styles.userInfoAvatar}
                        source={{ uri: photoURL }}
                    /> :
                    <Icon
                        type="material-community"
                        name="account-circle"
                        size={60}
                        containerStyle={styles.userInfoAvatar}
                    />
                }
            </View>
            <View>
                <Text style={styles.name}>{displayName ? displayName : "Anónimo"}</Text>
                <Text>{email}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userInfoAvatar: {
        marginRight: 20,
    },
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: "#fff"
    },
    name: {
        fontWeight: "bold"
    }
});

/*

                <Image
                    source={photoURL ? {uri:photoURL} : {uri:foto2}}
                    style={{ width: 100, height: 100, marginRight: 20 }}
                    PlaceholderContent={<ActivityIndicator />}
                />

*/