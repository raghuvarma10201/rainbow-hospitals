import { EvilIcons, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Header } from '@react-navigation/elements';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';


const DoctorsDetails: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>('Today');
    const dateTabs = [
        { label: 'Today', slots: ['08:00 PM', '08:30 PM'], slotsCount: 2 },
        { label: 'Tomorrow', slots: ['07:30 PM', '09:00 PM'], slotsCount: 2 },
        { label: '15 May', slots: ['06:30 PM', '08:00 PM', '08:30 PM'], slotsCount: 3 },
        { label: '16 May', slots: ['05:30 PM', '07:00 PM'], slotsCount: 2 },
        { label: '17 May', slots: [], slotsCount: 0 },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Header
                title='Video Consultant'
                headerStyle={{ backgroundColor: '#7E3A93' }}
                headerTintColor="white"
                headerTitleAlign="center"

            />
            {/* <View >
                <View >
                        <TouchableOpacity>
                            <Icon name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                </View>
        </View> */}
            {/* <Header title="Appointment" showBackButton  showShareIcons/> */}
            {/* <View style={styles.header}> */}
            {/* <TouchableOpacity>
          <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity> */}
            {/* <Text style={styles.title}>Appointment</Text> */}
            {/* <TouchableOpacity>
                    <Text style={styles.shareIcon}><Entypo name="share" size={24} color="black" /></Text>
                </TouchableOpacity> */}
            {/* </View> */}

            {/* Doctor Info Card */}
            <ImageBackground
                source={require('../assets/images/top-vector-xs.png')}
                style={styles.imagebackground}
            ></ImageBackground>
            <View style={styles.doctorCard}>
                <Image
                    source={require('../assets/images/doctors/preetham.png')} // Replace with real image
                    style={styles.doctorImage}
                />
                <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>Dr. Preetham Kumar</Text>
                    <Text style={styles.doctorSpecialty}>
                        Senior Consultant - Pediatrician & Pediatric Intensive Care
                    </Text>
                    <Text style={styles.infoText}><FontAwesome name="stethoscope" size={15} color="white" /> 32+ Years Exp</Text>
                    <Text style={styles.infoText}><SimpleLineIcons name="globe" size={15} color="white" /> English, Telugu</Text>
                    <Text style={styles.infoText}><EvilIcons name="location" size={15} color="white" /> Banjara Hills</Text>
                </View>

            </View>
            {/* Video Consultation */}
            <View style={styles.consultationBox}>
                <Text style={styles.videoText}><Feather name="video" size={24} color="black" /> Video Consultation</Text>
                <Text style={styles.feeText}>
                    Consultation fee: <Text style={{ color: '#B100A1' }}>₹1100 Fee</Text>
                </Text>
                <Text style={styles.upcomingText}>Upcoming Appointments: 2</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateTabsContainer}>
                {dateTabs.map((item, index) => {
                    const isSelected = item.label === selectedDate;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dateTab, isSelected && styles.selectedDateTab]}
                            onPress={() => setSelectedDate(item.label)}
                        >
                            <Text style={[styles.dateTabLabel, isSelected && styles.selectedDateTabLabel]}>
                                {item.label}
                            </Text>
                            <Text style={[styles.slotCountText, isSelected && styles.selectedDateTabLabel]}>
                                {item.slotsCount} Slots
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {/* Slots */}
            <View style={styles.slotSection}>
                <Text style={styles.dateLabel}>
                    {selectedDate}{' '}
                    <Text style={styles.slotCount}>
                        {
                            dateTabs.find((tab) => tab.label === selectedDate)?.slots.length || 0
                        } Slots
                    </Text>
                </Text>
                <View style={styles.slotList}>
                    {dateTabs.find((tab) => tab.label === selectedDate)?.slots.length ? (
                        dateTabs
                            .find((tab) => tab.label === selectedDate)
                            ?.slots.map((time, index) => (
                                <TouchableOpacity key={index} style={styles.slotButton}>
                                    <Text style={styles.slotText}>{time}</Text>
                                </TouchableOpacity>
                            ))
                    ) : (
                        <Text style={{ color: '#999' }}>No slots available</Text>
                    )}
                </View>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all slots ➤</Text>
                </TouchableOpacity>
            </View>
            {/* Patient Details */}
            <View style={styles.patientSection}>
                <Text style={styles.sectionTitle}>Patient Details</Text>
                <View style={styles.patientRow}>
                    <Image
                        source={require('../assets/images/doctors/1.jpg')} // Replace with real image
                        style={styles.patientImage}
                    />
                    <View>
                        <Text style={styles.patientName}>Divya Meghana</Text>
                        <Text style={styles.patientDetails}>Daughter | 35 years</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn}>
                        <Text><EvilIcons name="pencil" size={24} color="black" /></Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Message Box */}
            <TextInput
                style={styles.messageBox}
                placeholder="Your query message"
                multiline
            />
            {/* Book Button */}
            <TouchableOpacity style={styles.bookBtn}>
                <Text style={styles.bookText}>Book Appointment</Text>
            </TouchableOpacity>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7E3A93', borderBottomColor: '#7E3A93' },
    backArrow: { fontSize: 24 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#6A1B9A' },
    shareIcon: { fontSize: 18 },

    doctorCard: { flexDirection: 'row', marginVertical: 20, marginTop: 0, padding: 12 },
    doctorImage: { width: 100, height: 150, borderRadius: 10 },
    doctorInfo: { marginLeft: 12, flex: 1 },
    doctorName: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
    doctorSpecialty: { fontSize: 12, color: '#fff', marginBottom: 5 },
    infoText: { fontSize: 12, color: '#fff' },

    consultationBox: { backgroundColor: '#F3E5F5', marginTop: 190, padding: 12, borderRadius: 8 },
    videoText: { fontWeight: 'bold' },
    feeText: { fontSize: 14, marginTop: 4 },
    upcomingText: { fontSize: 12, marginTop: 2, color: '#777' },

    slotSection: { marginVertical: 16 },
    dateLabel: { fontWeight: 'bold' },
    slotCount: { color: 'green' },
    slotList: { flexDirection: 'row', marginVertical: 8, flexWrap: 'wrap', gap: 10 },
    slotButton: {
        backgroundColor: '#6A1B9A',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    slotText: { color: '#fff' },
    viewAll: { color: '#6A1B9A', fontWeight: 'bold', marginTop: 8 },

    patientSection: { marginVertical: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold' },
    patientRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    patientImage: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    patientName: { fontWeight: 'bold' },
    patientDetails: { color: '#666' },
    editBtn: { marginLeft: 'auto' },

    messageBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        minHeight: 100,
        padding: 12,
        textAlignVertical: 'top',
        marginVertical: 16,
    },

    bookBtn: {
        backgroundColor: '#6A1B9A',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    bookText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    dateTabsContainer: {
        flexDirection: 'row',
        marginVertical: 12,
    },

    dateTab: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 10,
        backgroundColor: '#F3E5F5',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    selectedDateTab: {
        backgroundColor: '#6A1B9A',
    },

    dateTabLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },

    selectedDateTabLabel: {
        color: '#fff',
    },

    slotCountText: {
        fontSize: 12,
        color: 'green',
    },
    imagebackground: {
        top: 0, width: 'auto', objectFit: 'cover',
    }

});

export default DoctorsDetails;
