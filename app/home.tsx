import FooterBackground from '@/components/footerBackground';
import Header from '@/components/header';
import { ThemedView } from '@/components/ThemedView';
import { getCategories } from '@/services/categoryService';
import { useNavigation } from '@react-navigation/native';
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
import CommonLoader from '../components/CommonLoader';
import useLoading from '../hooks/useLoading';

interface Category {
    id: number;
    title: string;
    image: ImageSourcePropType;
}

   type GridItemProps = {
        label: string;
        image: any;
    };

    const GridItem: React.FC<GridItemProps> = ({ label, image }) => (
        <TouchableOpacity >
            <Image source={ image } />
        </TouchableOpacity>
    );

// type RootStackParamList = {
//     Doctors: undefined;
//     // add other routes here if needed
// };

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { isLoading, startLoading, stopLoading } = useLoading();
    const navigation = useNavigation<any>();

    const imageList = [
  require('../assets/images/newborn.jpg'),
  require('../assets/images/gynaecology.jpg'),
  require('../assets/images/fertility-care.png'),
];

    useEffect(() => {
        console.log('Component mounted');
        fetchData();

        return () => {
            console.log('Component unmounted');
        };
    }, []);

     const navigateToDoctors = () => {
        navigation.navigate('Dashboard');
    };

    const goToDashboard = async () => {
        // Trigger OTP call logic
        
    };

    const fetchData = async () => {
        // Simulate API delay
        startLoading();
        setTimeout(async () => {
            stopLoading();
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
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity style={styles.card}  onPress={() => navigateToDoctors()}>
            <Image
                source={imageList[index] }
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
 <CommonLoader isVisible={isLoading} />

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
