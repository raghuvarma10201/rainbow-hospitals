import Header from '@/components/header';
import { getCategories } from '@/services/categoryService';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const doctorss = [
    {
        id: '1',
        name: 'Dr. Preetham Kumar',
        designation: 'Senior Consultant - Pediatrician & ...',
        experience: '32+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/preetham.png'),
    },
    {
        id: '2',
        name: 'Dr. Pranathi Reddy A',
        designation: 'Clinical Director - Obstetrics & ...',
        experience: '32+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/pranathi.png'),
    },
    {
        id: '3',
        name: 'Dr. Shruthi Reddy Poddutoor',
        designation: 'Consultant Obstetrician, ...',
        experience: '22+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/1.jpg'),
    },
    {
        id: '4',
        name: 'Dr. Dinesh Kumar Chirla',
        designation: 'Director Intensive Care Services, ...',
        experience: '22+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/1.jpg'),
    },
    {
        id: '5',
        name: 'Dr. Radhika Y',
        designation: 'Senior Consultant Obstetrician ...',
        experience: '22+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/1.jpg'),
    },
];

const Doctors = () => {
    const [doctors, setDoctors] = useState<any[]>([]);

    useEffect(() => {
        console.log('Component mounted');
        fetchData();

        return () => {
            console.log('Component unmounted');
        };
    }, []);

    const fetchData = async () => {
        // Simulate API delay
        setTimeout(async () => {
            try {
                const response = await getCategories(); // ✅ You're using it
                console.log('Verify success:', response.coes);
                setDoctors(doctorss);
            } catch (error) {
                console.error('Verify failed:', error);
            }

        }, 1000);
    };

    // ✅ Define renderItem as a function (not state)
    const renderDoctor = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.doctorImage} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.designation}>{item.designation}</Text>
                <View style={styles.ratingRow}>
                    <Image source={require('../assets/icons/star.png')} style={styles.iconStar} />
                    <Image source={require('../assets/icons/star.png')} style={styles.iconStar} />
                    <Image source={require('../assets/icons/star.png')} style={styles.iconStar} />
                    <Image source={require('../assets/icons/star.png')} style={styles.iconStar} />
                    <Image source={require('../assets/icons/rating.png')} style={styles.iconStar} />
                    <Text style={styles.rating}>{item.rating}</Text>
                    <Text style={styles.experience}>{item.experience}</Text>
                </View>
                <Text style={styles.feeLabel}>Consultation fee</Text>
                <View style={styles.feeRow}>
                    <Text style={styles.fee}>{item.fee}</Text>
                    <TouchableOpacity style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="" showBackButton showLocation showIcons />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.searchBox}>
                    <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                    <TextInput placeholder="Search for doctor" style={styles.input} />
                </View>
                <FlatList
                    data={doctors}
                    keyExtractor={(item) => item.id}
                    renderItem={renderDoctor}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: '0%',
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    headerBackground: {
        backgroundColor: '#76328C',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchBox: {
        margin : 16,
        height : 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: '#aaa',
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    doctorImage: {
        width: '30%',
        height: '100%',
        borderBottomLeftRadius : 12,
        borderTopLeftRadius : 12,
        marginRight: 5,
    },
    details: {
        padding : 5,
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
    },
    designation: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    iconStar: {
        width: 10,
        height: 10,
        tintColor: '#f9a825',
        marginRight: 4,
    },
    rating: {
        fontSize: 10,
        marginRight: 8,
    },
    experience: {
        fontSize: 10,
        color: '#666',
    },
    feeLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 6,
    },
    feeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fee: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'PoetsenOne-Regular',
        color: '#76328C',
    },
    bookButton: {
        backgroundColor: '#76328C',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    bookButtonText: {
        color: '#fff',
        fontFamily : 'Merriweather, Bold',
        fontSize: 13,
    },
});


export default Doctors;
