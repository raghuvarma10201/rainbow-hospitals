import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
    showLocation?: boolean;
    showIcons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showLocation = false, showIcons = false }) => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.headerBackground}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 376.001 149.871">
                    <g id="Group_14875" data-name="Group 14875" transform="translate(0.5 0.5)">
                        <path id="Path_29260" data-name="Path 29260" d="M688.9,256.736V377.391c-81.762,0-100.137-49.566-175.372-64.357a234.739,234.739,0,0,0-45.444-4.109c-100.558,0-154.183,68.467-154.183,68.467V256.736a28.219,28.219,0,0,1,28.219-28.215H660.7A28.213,28.213,0,0,1,688.9,256.736Z" transform="translate(-313.903 -228.521)" fill="#4c1a6a" />
                        <path id="Union_1" data-name="Union 1" d="M0,148.871v-28H0c0-.071,0-.143,0-.215V0C81.762,0,100.137,49.567,175.373,64.358,195.14,88.181,250.065,132.921,375,113.833v6.823c0,.071,0,.143,0,.215h0v28Z" transform="translate(375.001 148.871) rotate(180)" fill="#7e3a93" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" strokeWidth="1" />
                    </g>
                </svg>
            </View>
            <View style={styles.header}>
                <View style={styles.left}>
                    {showBackButton && (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                    )}
                    {showLocation && (
                        <View style={styles.locationContainer}>
                            <Icon name="location-outline" size={16} color="#fff" />
                            <Text style={styles.locationText}>Hyderabad</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.title}>{title}</Text>

                {showIcons && (
                    <View style={styles.right}>
                        <Icon name="notifications-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
                        <Icon name="chatbox-ellipses-outline" size={24} color="#fff" />
                    </View>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerBackground: {
        position : "absolute",
        width : "100%",
        top : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: '#7A2C87', // Purple header background
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    iconSmall: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    locationText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default Header;
