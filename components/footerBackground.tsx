import React from 'react';
import { StyleSheet, View } from 'react-native';

const FooterBackground: React.FC = () => {
    return (
        <View style={styles.footerBackground}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 376.001 149.871">
                <g id="Group_14828" data-name="Group 14828" transform="translate(0.5 0.5)">
                    <path id="Path_29260" data-name="Path 29260" d="M313.9,349.176V228.521c81.762,0,100.137,49.566,175.372,64.357a234.739,234.739,0,0,0,45.444,4.109c100.558,0,154.183-68.467,154.183-68.467V349.176a28.219,28.219,0,0,1-28.219,28.215H342.11A28.213,28.213,0,0,1,313.9,349.176Z" transform="translate(-313.903 -228.521)" fill="#4c1a6a" />
                    <path id="Union_1" data-name="Union 1" d="M-4833-494.26v-28h0c0-.071,0-.143,0-.215V-643.131c81.762,0,100.137,49.567,175.373,64.358C-4637.86-554.95-4582.936-510.21-4458-529.3v6.823c0,.071,0,.143,0,.215h0v28Z" transform="translate(4833 643.13)" fill="#7e3a93" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" strokeWidth="1" />
                </g>
            </svg>
        </View>
    );
};
const styles = StyleSheet.create({
    footerBackground: {
        position : "relative",
        width : "100%",
        bottom : 0,
    }
});

export default FooterBackground;
