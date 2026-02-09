import { StyleSheet, Dimensions } from 'react-native';

export const COLORS = {
    userGradient: ['#00ADF5', '#004eba'] as [string, string],
    providerGradient: ['#1086b5', '#022373'] as [string, string],
    white: '#FFFFFF',
    glassBorder: 'rgba(255, 255, 255, 0.3)',
    glassBackground: 'rgba(255, 255, 255, 0.15)',
};

export const globalStyles = StyleSheet.create({
    mainContainer: { flex: 1 },
    safeArea: { flex: 1, paddingHorizontal: 24 },
    // Step Indicator Styles
    stepContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 30 },
    stepWrapper: { alignItems: 'center', flex: 1 },
    stepText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
    inactiveStepText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 5 },
    activeLine: { height: 4, width: '90%', backgroundColor: '#FFF', borderRadius: 2 },
    inactiveLine: { height: 4, width: '90%', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2 },
    // Input Styles
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.glassBackground,
        borderRadius: 25,
        height: 55,
        marginBottom: 15,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: COLORS.glassBorder,
        overflow: 'hidden',
    },
    textInput: { flex: 1, color: '#FFF', fontSize: 16 },
    // Button Styles
    nextButton: {
        alignSelf: 'center',
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 20,
    }
});