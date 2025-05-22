import Header from '@/components/header';
import NoData from '@/components/NoData';
import { getDoctorbyName } from '@/services/categoryService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { RootStackParamList } from './../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Doctors'>;



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
        name: 'Dr. Divi Srujini',
        designation: 'Director Intensive Care Services, ...',
        experience: '22+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/divi.jpg'),
    },
    {
        id: '5',
        name: 'Dr. Annapoorna Tadavarthy',
        designation: 'Senior Consultant Obstetrician ...',
        experience: '22+ Years Exp',
        rating: 4.5,
        fee: '₹1100',
        image: require('../assets/images/doctors/annapoorna.png'),
    },
    {
        id: '6',
        name: 'Dr. Nishanth Reddy Inavolu',
        designation: 'Consultant Cardiologist',
        experience: '15+ Years Exp',
        rating: 4.7,
        fee: '₹1200',
        image: require('../assets/images/doctors/nishanth.jpg'),
    },
    {
        id: '7',
        name: 'Dr. Meena Sharma',
        designation: 'Senior Neurologist',
        experience: '20+ Years Exp',
        rating: 4.6,
        fee: '₹1300',
        image: require('../assets/images/doctors/1.jpg'),
    },
    {
        id: '8',
        name: 'Dr. Sandeep Reddy',
        designation: 'Orthopedic Surgeon',
        experience: '25+ Years Exp',
        rating: 4.8,
        fee: '₹1400',
        image: require('../assets/images/doctors/sandeep.png'),
    },
    {
        id: '9',
        name: 'Dr. Ratna Durvasula',
        designation: 'Dermatologist',
        experience: '18+ Years Exp',
        rating: 4.4,
        fee: '₹1000',
        image: require('../assets/images/doctors/ratna.jpg'),
    },
    {
        id: '10',
        name: 'Dr. Radhika Y',
        designation: 'Pulmonologist',
        experience: '22+ Years Exp',
        rating: 4.3,
        fee: '₹1150',
        image: require('../assets/images/doctors/radhika.png'),
    },
];

const Doctors: React.FC<Props> = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 5;
    const navigation = useNavigation<any>();
    

    useEffect(() => {
        console.log('Component mounted');
        fetchData();

        return () => {
            console.log('Component unmounted');
        };
    }, []);

useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if (searchQuery.length > 3) {
            handleSearch(searchQuery);
        }
    }, 500);

    return () => clearTimeout(delayDebounce);
}, [searchQuery]);


const fetchData = async () => {
    setLoading(true);
    try {
        // const response = await getCategories();
        const fetchedDoctors = doctorss;
        setFilteredDoctors(fetchedDoctors);
        setDoctors(fetchedDoctors.slice(0, itemsPerPage));
        setHasMore(fetchedDoctors.length > itemsPerPage);
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        setLoading(false);
    }
};

const navigationToDetails = () => {
    navigation.navigate('DoctorsDetail')
}


    const filterAndLoadData = () => {
        // Filter based on search query
        const filtered = doctorss.filter((doctor: any) =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.designation.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredDoctors(filtered);

        // Load initial batch
        const initialBatch = filtered.slice(0, itemsPerPage);
        setDoctors(initialBatch);
        setHasMore(filtered.length > itemsPerPage);
    };

    const handleSearch = async (text: string) => {
        console.log('Search text:', text);
        setSearchQuery(text);
        setDoctors([]);
        setFilteredDoctors([]);
        setHasMore(false);

        if (text.length <= 3) {
            return; // Don't search for less than 4 characters
        }
        try {
            let payload = {
                name: text,
            }
            const response = await getDoctorbyName(payload);

            const results = response.data?.doctors || [];

            // Store all results
            setFilteredDoctors(results);

            // Load initial batch
            const initialBatch = results.slice(0, itemsPerPage);
            setDoctors(initialBatch);
            setHasMore(results.length > itemsPerPage);

        } catch (error) {
            console.error('Search API error:', error);
        }
        // // Filter doctors based on search
        // const filtered = doctorss.filter((doctor: any) =>
        //     doctor.name.toLowerCase().includes(text.toLowerCase()) ||
        //     doctor.designation.toLowerCase().includes(text.toLowerCase())
        // );

        // setFilteredDoctors(filtered);

        // // Load initial batch of filtered results
        // const initialBatch = filtered.slice(0, itemsPerPage);
        // setDoctors(initialBatch);
        // setHasMore(filtered.length > itemsPerPage);
    };
//     const handleSearch = async (text: string) => {
//     console.log('Search text:', text);
//     setSearchQuery(text);

//     if (text.length < 4) {
//         // 👇 Show default local list when search query is cleared
//         filterAndLoadData();
//         return;
//     }

//     try {
//         let payload = { name: text };
//         const response = await getDoctorbyName(payload);
//         const results = response.data?.doctors || [];

//         // Store all results
//         setFilteredDoctors(results);

//         // Load initial batch
//         const initialBatch = results.slice(0, itemsPerPage);
//         setDoctors(initialBatch);
//         setHasMore(results.length > itemsPerPage);
//     } catch (error) {
//         console.error('Search API error:', error);
//     }
// };


    const loadMoreDoctors = () => {
        if (!hasMore || loadingMore) return;

        console.log('Loading more doctors...');
        setLoadingMore(true);

        setTimeout(() => {
            const currentCount = doctors.length;
            const nextBatch = filteredDoctors.slice(currentCount, currentCount + itemsPerPage);

            setDoctors((prev) => [...prev, ...nextBatch]);

            const newTotal = currentCount + nextBatch.length;
            setHasMore(newTotal < filteredDoctors.length);

            setLoadingMore(false);
        }, 500); // Simulating delay; remove if calling real API
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
                    <TouchableOpacity onPress={() =>navigationToDetails()} style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    const renderFooter = () => {
        if (!loadingMore) return null;

        return (
            <View style={styles.loaderFooter}>
                <ActivityIndicator size="small" color="#76328C" />
                <Text style={styles.loadingMoreText}>Loading more doctors...</Text>
            </View>
        );
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                {searchQuery ? 'No doctors found matching your search' : 'No doctors available'}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="" showBackButton showLocation showIcons />
            <View style={styles.searchBox}>
                <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search for doctor"
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <View style={styles.contentContainer}>
                    {doctors && doctors.length > 0 ? (
                        <FlatList
                            data={doctors}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderDoctor}
                            contentContainerStyle={styles.list}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<NoData message="No data found." />}
                            ListFooterComponent={renderFooter}
                            onEndReached={loadMoreDoctors}
                            onEndReachedThreshold={0.5}
                        />) : <NoData message="No results found." />
                    }

                
                </View>
            )}
            {/* <ScrollView style={styles.scrollContainer}>
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
            </ScrollView> */}
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
        margin: 16,
        height: 50,
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
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        marginRight: 5,
    },
    details: {
        padding: 5,
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
        fontFamily: 'Merriweather, Bold',
        fontSize: 13,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    loadingMoreText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#76328C',
    },
    loaderFooter: {
        paddingVertical: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 20,
    }
});


export default Doctors;
