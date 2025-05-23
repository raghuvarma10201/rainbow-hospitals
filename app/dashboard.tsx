
import Header from '@/components/header';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC<Props> = ({ navigation, route }) => {
    type StatBoxProps = {
        count: number;
        label: string;
        color: string;
    };

    const StatBox: React.FC<StatBoxProps> = ({ count, label, color }) => (
        <View style={[styles.statBox, { backgroundColor: color }]}>
            <Text style={styles.statCount}>{count}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    type GridItemProps = {
        label: string;
        image: any;
        onPress?: () => void;
    };

    const GridItem: React.FC<GridItemProps> = ({ label, image, onPress  }) => (
        <TouchableOpacity style={styles.gridItem} onPress={onPress}>
            <Image source={ image } style={styles.gridImage} />
            <Text style={styles.gridLabel}>{label}</Text>
        </TouchableOpacity>
    );

    type DoctorCardProps = {
        name: string;
        designation: string;
        rating: string;
        experience: string;
        image: string;
    };

    const DoctorCard: React.FC<DoctorCardProps> = ({ name, designation, rating, experience, image }) => (
        <View style={styles.doctorCard}  >
            <Image source={{ uri: image }} style={styles.docImage} />
            <View style={styles.docInfo} >
                <Text style={styles.docName} onPress={goToDoctors as any}>{name}</Text>
                <Text style={styles.docDesig}>{designation}</Text>
                <Text style={styles.docMeta}>⭐ {rating} | {experience}</Text>
            </View>
        </View>
    );

    type SectionTitleProps = {
        title: string;
    };

    const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
        <Text style={styles.sectionTitle}>{title}</Text>
    );
    const appointmentOptions = [
        { label: 'Video Consultations', image: 'https://placehold.co/60?text=PA'  },
        { label: 'Physical Appointment', image: 'https://placehold.co/60?text=PA' },
        { label: 'Book Vaccine', image: 'https://placehold.co/60?text=Vaccine' },
        { label: 'Book Scans', image: 'https://placehold.co/60?text=Scan' },
        { label: 'Ultrasound Scans', image: 'https://placehold.co/60?text=US' },
        { label: 'Fetal Medicine', image: 'https://placehold.co/60?text=FM' },
    ];

    const specialities = [
        { label: 'General Physician', image: require('../assets/images/General.svg') },
        { label: 'Child Specialist', image: require('../assets/images/Child.svg') },
        { label: 'Women’s Health', image: require('../assets/images/Women.svg') },
        { label: 'Dental Care', image: require('../assets/images/Dental.svg') },
        { label: 'Eye Specialist', image: require('../assets/images/Eye.svg') },
        { label: 'Skin & Hair', image: require('../assets/images/Skin.svg')},
        { label: 'Kidney Issues', image: require('../assets/images/Kidney.svg') },
        // { label: 'More', image: require('../assets/images/General.svg') },
    ];

    const doctors = [
        {
            name: 'Dr. Preetham Kumar',
            designation: 'Senior Consultant – Pediatrician & Pediatric Intensive Care',
            rating: '4.5',
            experience: '32+ Years Exp',
            image: 'https://placehold.co/60?text=Dr+P',
        },
        {
            name: 'Dr. Pranathi Reddy A',
            designation: 'Clinical Director – Obstetrics & Gynecology',
            rating: '5.0',
            experience: '23+ Years Exp',
            image: 'https://placehold.co/60?text=Dr+R',
        },
    ];
    const goToDoctors = async () => {
        // Trigger OTP call logic
        navigation.navigate('Doctors');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="" showBackButton showLocation showIcons />
            <View style={styles.searchBox}>
                <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                <TextInput placeholder="Search for doctor" style={styles.input} />
            </View>
            <ScrollView style={styles.Dashboardcontainer}>

                {/* Welcome Section */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Hi, Welcome back!</Text>
                    <Text style={styles.subtitle}>Here your details of dashboard.</Text>

                    <View style={styles.statsRow}>
                        <StatBox count={3} label="Video" color="#62B4F4" />
                        <StatBox count={2} label="Physical" color="#1BB4A2" />
                        <StatBox count={14} label="My Reports" color="#A04AD1" />
                    </View>
                </View>

                {/* Appointment Options */}
                <SectionTitle title="Book your appointment" />
                <View style={styles.grid}>
                    {/* {appointmentOptions.map(opt => (
                        <GridItem key={opt.label} label={opt.label} image={opt.image} />
                    ))} */}
                        <GridItem label='Video Consultations' image={require('../assets/images/Video.png')} onPress={goToDoctors}  />
                        <GridItem label='Physical Appointment' image={require('../assets/images/Physical.png')} />
                        <GridItem label='Book Vaccine' image={require('../assets/images/BookVaccine.png')} />
                        <GridItem label='Book Scans' image={require('../assets/images/Scans.png')} />
                        <GridItem label='Ultrasound Scans' image={require('../assets/images/altrasound.png')} />
                        <GridItem label='Fetal Medicine' image={require('../assets/images/Fetal.png')} />

                </View>

                {/* Speciality Options */}
                <SectionTitle title="Find a Doctor for your Health Problem" />
                <View style={styles.grid}>
                    {specialities.map(opt => (
                        <GridItem key={opt.label} label={opt.label} image={opt.image} />
                    ))}
                </View>

                {/* Consulted Doctors */}
                <Text style={styles.sectionTitle}>Doctors you have consulted</Text>
                {doctors.map(doc => (
                    <DoctorCard key={doc.name} {...doc}  />
                ))}
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    Dashboardcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        backgroundColor: '#6C3EFF',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    location: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        flex: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    icon: {
        marginHorizontal: 8,
    },
    searchBox: {
        borderWidth: 2,
        borderColor: '#7E3A93',
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
        marginLeft: 10,
        flex: 1,
    },
    welcomeContainer: {
        marginTop: 10,
    },
    welcome: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginTop: 4,
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statBox: {
        width: '30%',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    statCount: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#fff',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
    },
    gridImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginBottom: 8,
    },
    gridLabel: {
        textAlign: 'center',
        fontSize: 13,
    },
    doctorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    docImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    docInfo: {
        flex: 1,
    },
    docName: {
        fontWeight: 'bold',
    },
    docDesig: {
        fontSize: 12,
        color: '#666',
    },
    docMeta: {
        fontSize: 12,
        marginTop: 2,
        color: '#999',
    },
});

export default Dashboard;




