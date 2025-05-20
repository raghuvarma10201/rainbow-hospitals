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

const BasicHeader: React.FC<HeaderProps> = ({ title, showBackButton = false, showLocation = false, showIcons = false }) => {
    const navigation = useNavigation();

    return (
        <View>
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
        backgroundColor: '#7A2C87', // Purple header background
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

export default BasicHeader;
