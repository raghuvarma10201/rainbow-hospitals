import FooterBackground from '@/components/footerBackground';
import Header from '@/components/header';
import { ThemedView } from '@/components/ThemedView';
import { getCategories } from '@/services/categoryService';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Category {
    id: number;
    title: string;
    image: ImageSourcePropType;
}


const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        console.log('Component mounted');
        fetchData();

        return () => {
            console.log('Component unmounted');
        };
    }, []);

    const goToDashboard = async () => {
        // Trigger OTP call logic
        
    };

    const fetchData = async () => {
        // Simulate API delay
        setTimeout(async () => {
            try {
                const response = await getCategories(); // ✅ You're using it
                console.log('Verify success:', response.coes);
                setCategories(response.coes);
            } catch (error) {
                console.error('Verify failed:', error);
            }

        }, 1000);
    };

    // ✅ Define renderItem as a function (not state)
    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} onPress={goToDashboard as any}>
            <Image
                source={
                    item.banner_mobile_image
                        ? { uri: 'https://productioncms.rainbowhospitals.in/uploads/' + item.banner_mobile_image }
                        : require('../assets/images/birthright-logo.png')
                }
                style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView />
            <Header title="" showBackButton showLocation showIcons />

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.scrollContent}>
                    <Text style={styles.title}>Centre of Excellence</Text>

                    <FlatList
                        
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={(item) => 'q' + item.id}
                        numColumns={2}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>

            <FooterBackground />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: '25%',
        paddingBottom: 20,
    },
    scrollContent: {
        padding: 16,
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    grid: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        margin : '1%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#e2d0f3',
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Home;
