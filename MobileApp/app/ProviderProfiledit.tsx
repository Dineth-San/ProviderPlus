/**
 * ProviderProfiledit.tsx
 * Provider+ App — Provider Profile Editing Screen
 * with Map-based Company Location Picker
 *
 * Required packages (run once, then rebuild):
 *   npx expo install expo-image-picker expo-document-picker expo-location react-native-maps
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import MapView, { Marker, MapPressEvent, Region } from 'react-native-maps';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────

interface AttachmentFile {
  name: string;
  uri: string;
}

interface WorkItem {
  name: string;
  attachments: AttachmentFile[];
  description: string;
}

interface LatLng {
  latitude: number;
  longitude: number;
}

interface InputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
}

interface SectionHeaderProps {
  title: string;
}

interface SkillChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  onRemove?: () => void;
  isCustom?: boolean;
}

interface WorkCardProps {
  index: number;
  work: WorkItem;
  onChange: (index: number, field: keyof WorkItem, value: any) => void;
  onRemove: (index: number) => void;
}

// ─── Theme ────────────────────────────────────────────────────────────────────

const COLORS = {
  bg: '#071A3E',
  card: 'rgba(255,255,255,0.07)',
  cardBorder: 'rgba(255,255,255,0.12)',
  inputBg: 'rgba(255,255,255,0.06)',
  inputBorder: 'rgba(255,255,255,0.18)',
  accent: '#1A6BFF',
  accentLight: '#3D85FF',
  accentGlow: 'rgba(26,107,255,0.25)',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.45)',
  textSub: 'rgba(255,255,255,0.65)',
  chipBg: 'rgba(26,107,255,0.25)',
  chipBorder: 'rgba(26,107,255,0.6)',
  chipSelected: '#1A6BFF',
  sectionTitle: '#FFFFFF',
  divider: 'rgba(255,255,255,0.1)',
  danger: '#FF4D4F',
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const CATEGORIES: string[] = [
  'Plumbing', 'Electrical', 'Carpentry', 'Painting',
  'Cleaning', 'Landscaping', 'HVAC & Air Conditioning',
  'IT & Tech Support', 'Interior Design', 'Other',
];

const PREDEFINED_SKILLS: string[] = [
  'Plumbing', 'Electrical', 'Welding', 'Carpentry',
  'Painting', 'Tiling', 'Roofing', 'Masonry',
  'Landscaping', 'HVAC', 'Cleaning', 'Security',
  'IT Support', 'Networking', 'CCTV', 'Solar Panels',
];

// Default map region — centered on Sri Lanka
const DEFAULT_REGION: Region = {
  latitude: 7.8731,
  longitude: 80.7718,
  latitudeDelta: 3.5,
  longitudeDelta: 3.5,
};

// ─── Map Location Picker Modal ────────────────────────────────────────────────

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (address: string, coords: LatLng) => void;
  initialCoords?: LatLng | null;
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
  initialCoords,
}) => {
  const mapRef = useRef<MapView>(null);
  const [selectedCoords, setSelectedCoords] = useState<LatLng | null>(initialCoords ?? null);
  const [address, setAddress] = useState<string>('');
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const reverseGeocode = async (coords: LatLng): Promise<void> => {
    setIsGeocoding(true);
    try {
      const results = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (results.length > 0) {
        const r = results[0];
        const parts = [r.name, r.street, r.city, r.region, r.country].filter(Boolean);
        setAddress(parts.join(', '));
      } else {
        setAddress(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`);
      }
    } catch {
      setAddress(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleMapPress = async (e: MapPressEvent): Promise<void> => {
    const coords = e.nativeEvent.coordinate;
    setSelectedCoords(coords);
    await reverseGeocode(coords);
  };

  const handleUseMyLocation = async (): Promise<void> => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        setIsLocating(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const coords: LatLng = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setSelectedCoords(coords);
      await reverseGeocode(coords);
      mapRef.current?.animateToRegion(
        { ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 },
        600
      );
    } catch {
      Alert.alert('Error', 'Could not get your location. Please try again.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleConfirm = (): void => {
    if (!selectedCoords) {
      Alert.alert('No Location', 'Please tap on the map or use your current location.');
      return;
    }
    onConfirm(address, selectedCoords);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={mapStyles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Map Header */}
        <SafeAreaView style={mapStyles.headerSafe}>
          <View style={mapStyles.header}>
            <TouchableOpacity onPress={onClose} style={mapStyles.headerBtn}>
              <Ionicons name="close" size={22} color="#1A1A2E" />
            </TouchableOpacity>
            <Text style={mapStyles.headerTitle}>Select Location</Text>
            <View style={{ width: 38 }} />
          </View>
        </SafeAreaView>

        {/* Hint banner */}
        <View style={mapStyles.hintBanner}>
          <Ionicons name="information-circle-outline" size={15} color={COLORS.accentLight} />
          <Text style={mapStyles.hintText}>Tap anywhere on the map to pin your location</Text>
        </View>

        {/* Map */}
        <MapView
          ref={mapRef}
          style={mapStyles.map}
          initialRegion={
            initialCoords
              ? { ...initialCoords, latitudeDelta: 0.01, longitudeDelta: 0.01 }
              : DEFAULT_REGION
          }
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass
        >
          {selectedCoords && (
            <Marker
              coordinate={selectedCoords}
              title="Company Location"
              pinColor={COLORS.accent}
            />
          )}
        </MapView>

        {/* Use My Location floating button */}
        <TouchableOpacity
          style={mapStyles.myLocationBtn}
          onPress={handleUseMyLocation}
          activeOpacity={0.85}
          disabled={isLocating}
        >
          {isLocating ? (
            <ActivityIndicator size="small" color={COLORS.accent} />
          ) : (
            <>
              <MaterialIcons name="my-location" size={20} color={COLORS.accent} />
              <Text style={mapStyles.myLocationText}>Use My Location</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Bottom sheet */}
        <View style={mapStyles.bottomSheet}>
          <View style={mapStyles.addressRow}>
            <View style={mapStyles.addressIconWrap}>
              <Ionicons name="location" size={20} color={COLORS.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={mapStyles.addressLabel}>Selected Location</Text>
              {isGeocoding ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <ActivityIndicator size="small" color={COLORS.accentLight} />
                  <Text style={mapStyles.addressResolving}>Resolving address…</Text>
                </View>
              ) : selectedCoords ? (
                <Text style={mapStyles.addressText} numberOfLines={2}>
                  {address || `${selectedCoords.latitude.toFixed(5)}, ${selectedCoords.longitude.toFixed(5)}`}
                </Text>
              ) : (
                <Text style={mapStyles.addressPlaceholder}>No location selected yet</Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[mapStyles.confirmBtn, !selectedCoords && mapStyles.confirmBtnDisabled]}
            onPress={handleConfirm}
            activeOpacity={0.85}
            disabled={!selectedCoords || isGeocoding}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={mapStyles.confirmBtnText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const InputField: React.FC<InputFieldProps> = ({
  label, value, onChangeText, placeholder,
  multiline = false, keyboardType = 'default',
}) => (
  <View style={styles.inputWrapper}>
    {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
    <TextInput
      style={[styles.input, multiline && styles.inputMultiline]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder ?? label}
      placeholderTextColor={COLORS.textMuted}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <View style={styles.sectionHeaderRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const SkillChip: React.FC<SkillChipProps> = ({
  label, selected, onPress, onRemove, isCustom = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}
    activeOpacity={0.75}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    {isCustom && selected && onRemove && (
      <TouchableOpacity onPress={onRemove} style={styles.chipRemove}>
        <AntDesign name="close" size={10} color="#fff" />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const WorkCard: React.FC<WorkCardProps> = ({ index, work, onChange, onRemove }) => {
  const handleAttachment = (): void => {
    Alert.alert(
      'Add Attachment',
      'Choose how to add your attachment',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
              Alert.alert('Permission denied', 'Camera access is required.');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: false,
              quality: 0.85,
            });
            if (!result.canceled && result.assets.length > 0) {
              const file = result.assets[0];
              onChange(index, 'attachments', [
                ...work.attachments,
                { name: `photo_${Date.now()}.jpg`, uri: file.uri },
              ]);
            }
          },
        },
        {
          text: 'Photo Library',
          onPress: async () => {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
              Alert.alert('Permission denied', 'Media library access is required.');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsMultipleSelection: true,
              quality: 0.85,
            });
            if (!result.canceled) {
              const files: AttachmentFile[] = result.assets.map((a) => ({
                name: a.fileName ?? `image_${Date.now()}`,
                uri: a.uri,
              }));
              onChange(index, 'attachments', [...work.attachments, ...files]);
            }
          },
        },
        {
          text: 'Files / Documents',
          onPress: async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                multiple: true,
                copyToCacheDirectory: true,
              });
              if (!result.canceled && result.assets) {
                const files: AttachmentFile[] = result.assets.map((a) => ({
                  name: a.name,
                  uri: a.uri,
                }));
                onChange(index, 'attachments', [...work.attachments, ...files]);
              }
            } catch {
              Alert.alert('Error', 'Could not open file picker.');
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.workCard}>
      <View style={styles.workCardHeader}>
        <Text style={styles.workCardTitle}>Work {index + 1}</Text>
        {index > 0 && (
          <TouchableOpacity onPress={() => onRemove(index)}>
            <Feather name="trash-2" size={16} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={work.name}
          onChangeText={(t) => onChange(index, 'name', t)}
          placeholder="Work Name"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <TouchableOpacity style={styles.attachmentField} onPress={handleAttachment} activeOpacity={0.8}>
        <View>
          <Text style={styles.attachmentLabel}>Attachments</Text>
          {work.attachments.length === 0 ? (
            <Text style={styles.attachmentPlaceholder}>Add Your Images / Videos / Files Here</Text>
          ) : (
            <Text style={styles.attachmentCount}>
              {work.attachments.length} file{work.attachments.length > 1 ? 's' : ''} attached
            </Text>
          )}
        </View>
        <Feather name="paperclip" size={18} color={COLORS.textMuted} />
      </TouchableOpacity>

      {work.attachments.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attachmentPreviewRow}>
          {work.attachments.map((file, fi) => (
            <View key={fi} style={styles.attachmentChip}>
              <Feather name="file" size={12} color={COLORS.accentLight} />
              <Text style={styles.attachmentChipText} numberOfLines={1}>
                {file.name.length > 14 ? file.name.slice(0, 12) + '…' : file.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const updated = work.attachments.filter((_, i) => i !== fi);
                  onChange(index, 'attachments', updated);
                }}
              >
                <AntDesign name="close" size={10} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={work.description}
          onChangeText={(t) => onChange(index, 'description', t)}
          placeholder="Add A Description About Your Work"
          placeholderTextColor={COLORS.textMuted}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProviderProfiledit(): React.JSX.Element {
  const [name, setName] = useState<string>('Nimal Chandra');
  const [email, setEmail] = useState<string>('nimalC@gmail.com');
  const [contact, setContact] = useState<string>('');
  const [nic, setNic] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [category, setCategory] = useState<string>('');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [serviceDescription, setServiceDescription] = useState<string>('');

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [showSkillInput, setShowSkillInput] = useState<boolean>(false);

  const [companyLocation, setCompanyLocation] = useState<string>('');
  const [companyCoords, setCompanyCoords] = useState<LatLng | null>(null);
  const [locationModalVisible, setLocationModalVisible] = useState<boolean>(false);

  const [brNumber, setBrNumber] = useState<string>('');

  const [works, setWorks] = useState<WorkItem[]>([
    { name: '', attachments: [], description: '' },
  ]);

  const handlePickProfileImage = async (): Promise<void> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };

  const toggleSkill = (skill: string): void => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = (): void => {
    const trimmed = customSkillInput.trim();
    if (!trimmed || customSkills.includes(trimmed) || PREDEFINED_SKILLS.includes(trimmed)) return;
    setCustomSkills((prev) => [...prev, trimmed]);
    setSelectedSkills((prev) => [...prev, trimmed]);
    setCustomSkillInput('');
    setShowSkillInput(false);
  };

  const removeCustomSkill = (skill: string): void => {
    setCustomSkills((prev) => prev.filter((s) => s !== skill));
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleWorkChange = (index: number, field: keyof WorkItem, value: any): void => {
    setWorks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addWork = (): void =>
    setWorks((prev) => [...prev, { name: '', attachments: [], description: '' }]);

  const removeWork = (index: number): void =>
    setWorks((prev) => prev.filter((_, i) => i !== index));

  const handleLocationConfirm = (address: string, coords: LatLng): void => {
    setCompanyLocation(address);
    setCompanyCoords(coords);
  };

  const handleEditDetails = (): void => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing Info', 'Please fill in your name and email.');
      return;
    }
    Alert.alert('Profile Updated', 'Your provider profile has been saved successfully!');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Provider Profile</Text>
        <View style={styles.headerRight}>
          <Text style={styles.langText}>ENG</Text>
          <View style={styles.toggleOuter}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar */}
          <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickProfileImage} activeOpacity={0.85}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={38} color="rgba(255,255,255,0.4)" />
              </View>
            )}
            <View style={styles.avatarBadge}>
              <Feather name="camera" size={11} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Personal Info */}
          <View style={styles.card}>
            <InputField label="Name" value={name} onChangeText={setName} />
            <View style={styles.divider} />
            <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <View style={styles.divider} />
            <InputField label="Contact No." value={contact} onChangeText={setContact} keyboardType="phone-pad" />
            <View style={styles.divider} />
            <InputField label="NIC" value={nic} onChangeText={setNic} />
          </View>

          {/* Service Information */}
          <SectionHeader title="Service Information" />

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCategoryModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={category ? styles.dropdownValue : styles.dropdownPlaceholder}>
              {category || 'Category'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Service Description</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={serviceDescription}
              onChangeText={setServiceDescription}
              placeholder="Enter A Description About You"
              placeholderTextColor={COLORS.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Skills */}
          <View style={styles.card}>
            <Text style={[styles.inputLabel, { marginBottom: 12 }]}>Skills</Text>
            <View style={styles.chipsGrid}>
              {PREDEFINED_SKILLS.map((skill) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onPress={() => toggleSkill(skill)}
                />
              ))}
              {customSkills.map((skill) => (
                <SkillChip
                  key={`custom-${skill}`}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onPress={() => toggleSkill(skill)}
                  onRemove={() => removeCustomSkill(skill)}
                  isCustom
                />
              ))}
            </View>
            {showSkillInput ? (
              <View style={styles.customSkillRow}>
                <TextInput
                  style={styles.customSkillInput}
                  value={customSkillInput}
                  onChangeText={setCustomSkillInput}
                  placeholder="Enter skill name…"
                  placeholderTextColor={COLORS.textMuted}
                  autoFocus
                  onSubmitEditing={addCustomSkill}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.customSkillConfirm} onPress={addCustomSkill}>
                  <AntDesign name="check" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.customSkillCancel}
                  onPress={() => { setShowSkillInput(false); setCustomSkillInput(''); }}
                >
                  <AntDesign name="close" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.addSkillBtn} onPress={() => setShowSkillInput(true)}>
                <AntDesign name="pluscircleo" size={20} color={COLORS.accentLight} />
                <Text style={styles.addSkillBtnText}>Add Custom Skill</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Company Location — Map Picker */}
          <Text style={styles.fieldSectionLabel}>Company Location</Text>
          <TouchableOpacity
            style={styles.locationPickerBtn}
            onPress={() => setLocationModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.locationPickerLeft}>
              <View style={styles.locationIconCircle}>
                <Ionicons name="location" size={18} color={COLORS.accent} />
              </View>
              <View style={{ flex: 1 }}>
                {companyLocation ? (
                  <>
                    <Text style={styles.locationSetLabel}>Location Set</Text>
                    <Text style={styles.locationAddress} numberOfLines={2}>
                      {companyLocation}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.locationPlaceholder}>Tap to select on map</Text>
                )}
              </View>
            </View>
            <View style={styles.locationPickerAction}>
              <MaterialIcons name="map" size={18} color={COLORS.accentLight} />
              <Text style={styles.locationPickerActionText}>
                {companyLocation ? 'Change' : 'Open Map'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Mini map preview once location is set */}
          {companyCoords && (
            <TouchableOpacity
              style={styles.miniMapWrapper}
              onPress={() => setLocationModalVisible(true)}
              activeOpacity={0.9}
            >
              <MapView
                style={styles.miniMap}
                region={{
                  ...companyCoords,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                pointerEvents="none"
              >
                <Marker coordinate={companyCoords} pinColor={COLORS.accent} />
              </MapView>
              <View style={styles.miniMapOverlay}>
                <Ionicons name="pencil" size={14} color="#fff" />
                <Text style={styles.miniMapOverlayText}>Tap to edit</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* BR Number */}
          <View style={[styles.card, { marginTop: 14 }]}>
            <InputField value={brNumber} onChangeText={setBrNumber} placeholder="BR Number" />
          </View>

          {/* Work Portfolio */}
          <SectionHeader title="Work Portfolio" />

          {works.map((work, index) => (
            <WorkCard
              key={index}
              index={index}
              work={work}
              onChange={handleWorkChange}
              onRemove={removeWork}
            />
          ))}

          <TouchableOpacity style={styles.addWorkBtn} onPress={addWork} activeOpacity={0.8}>
            <Text style={styles.addWorkBtnText}>Add Another Works</Text>
            <AntDesign name="pluscircleo" size={18} color={COLORS.accentLight} />
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>

          <TouchableOpacity style={styles.skipBtn} activeOpacity={0.8} onPress={() => router.back()}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editBtn} onPress={handleEditDetails} activeOpacity={0.85}>
            <Text style={styles.editBtnText}>Edit Details</Text>
            <Ionicons name="arrow-forward-circle" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Category Modal */}
      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setCategoryModalVisible(false)}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, category === item && styles.modalItemSelected]}
                  onPress={() => { setCategory(item); setCategoryModalVisible(false); }}
                >
                  <Text style={[styles.modalItemText, category === item && styles.modalItemTextSelected]}>
                    {item}
                  </Text>
                  {category === item && (
                    <Ionicons name="checkmark-circle" size={18} color={COLORS.accent} />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.modalDivider} />}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Location Picker Modal */}
      <LocationPickerModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onConfirm={handleLocationConfirm}
        initialCoords={companyCoords}
      />
    </SafeAreaView>
  );
}

// ─── Map Modal Styles ─────────────────────────────────────────────────────────

const mapStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerSafe: { backgroundColor: '#fff', zIndex: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF5',
  },
  headerBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#F0F4FF',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { color: '#1A1A2E', fontSize: 17, fontWeight: '700' },
  hintBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(26,107,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  hintText: { color: COLORS.accentLight, fontSize: 12, fontWeight: '500' },
  map: { flex: 1 },
  myLocationBtn: {
    position: 'absolute',
    right: 16,
    bottom: 220,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(26,107,255,0.2)',
  },
  myLocationText: { color: COLORS.accent, fontSize: 13, fontWeight: '700' },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
    minHeight: 52,
  },
  addressIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(26,107,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  addressLabel: {
    color: '#888', fontSize: 11,
    fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: 0.5, marginBottom: 3,
  },
  addressText: { color: '#1A1A2E', fontSize: 14, fontWeight: '600', lineHeight: 20 },
  addressPlaceholder: { color: '#AAAAAA', fontSize: 14 },
  addressResolving: { color: COLORS.accentLight, fontSize: 13 },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  confirmBtnDisabled: { backgroundColor: '#B0C4DE', shadowOpacity: 0, elevation: 0 },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

// ─── Main Screen Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.divider,
  },
  headerBack: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  headerTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  langText: { color: COLORS.textSub, fontSize: 13, fontWeight: '600' },
  toggleOuter: {
    width: 40, height: 22, borderRadius: 11,
    backgroundColor: COLORS.accent,
    justifyContent: 'center', paddingHorizontal: 2, alignItems: 'flex-end',
  },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },
  avatarWrapper: { alignSelf: 'center', marginBottom: 24 },
  avatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 3, borderColor: COLORS.accent },
  avatarPlaceholder: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: COLORS.card,
    borderWidth: 2, borderColor: COLORS.cardBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute', bottom: 2, right: 2,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.bg,
  },
  card: {
    backgroundColor: COLORS.card, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder,
    paddingHorizontal: 16, paddingVertical: 14, marginBottom: 14,
  },
  sectionHeaderRow: { alignItems: 'center', marginVertical: 18 },
  sectionTitle: { color: COLORS.sectionTitle, fontSize: 17, fontWeight: '700', letterSpacing: 0.4 },
  inputWrapper: { marginBottom: 4 },
  inputLabel: {
    color: COLORS.textSub, fontSize: 12, fontWeight: '600',
    marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.6,
  },
  input: {
    color: COLORS.text, fontSize: 15, fontWeight: '500',
    paddingVertical: 10, paddingHorizontal: 12,
    backgroundColor: COLORS.inputBg,
    borderRadius: 10, borderWidth: 1, borderColor: COLORS.inputBorder,
    minHeight: 44,
  },
  inputMultiline: { minHeight: 90, paddingTop: 10 },
  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 10 },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.card, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.cardBorder,
    paddingHorizontal: 16, paddingVertical: 14, marginBottom: 14,
  },
  dropdownPlaceholder: { color: COLORS.textMuted, fontSize: 15 },
  dropdownValue: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  chipsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: COLORS.chipBg, borderWidth: 1, borderColor: COLORS.chipBorder, gap: 5,
  },
  chipSelected: { backgroundColor: COLORS.chipSelected, borderColor: COLORS.chipSelected },
  chipText: { color: COLORS.textSub, fontSize: 13, fontWeight: '500' },
  chipTextSelected: { color: '#fff', fontWeight: '700' },
  chipRemove: { marginLeft: 2 },
  addSkillBtn: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, alignSelf: 'center', paddingVertical: 6,
  },
  addSkillBtnText: { color: COLORS.accentLight, fontSize: 14, fontWeight: '600' },
  customSkillRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  customSkillInput: {
    flex: 1, color: COLORS.text, fontSize: 14,
    backgroundColor: COLORS.inputBg, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.inputBorder,
    paddingHorizontal: 12, paddingVertical: 8, height: 40,
  },
  customSkillConfirm: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center',
  },
  customSkillCancel: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },

  // Location picker
  fieldSectionLabel: {
    color: COLORS.textSub, fontSize: 12, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8,
  },
  locationPickerBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.card, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.cardBorder,
    paddingHorizontal: 14, paddingVertical: 12,
  },
  locationPickerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  locationIconCircle: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: COLORS.accentGlow,
    alignItems: 'center', justifyContent: 'center',
  },
  locationSetLabel: {
    color: COLORS.accentLight, fontSize: 11, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2,
  },
  locationAddress: { color: COLORS.text, fontSize: 13, fontWeight: '500', lineHeight: 18 },
  locationPlaceholder: { color: COLORS.textMuted, fontSize: 14 },
  locationPickerAction: { alignItems: 'center', gap: 3, marginLeft: 10 },
  locationPickerActionText: { color: COLORS.accentLight, fontSize: 11, fontWeight: '700' },
  miniMapWrapper: {
    marginTop: 10, borderRadius: 14, overflow: 'hidden',
    height: 130, borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  miniMap: { flex: 1 },
  miniMapOverlay: {
    position: 'absolute', bottom: 8, right: 8,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  miniMapOverlayText: { color: '#fff', fontSize: 11, fontWeight: '600' },

  // Work card
  workCard: {
    backgroundColor: COLORS.card, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder, padding: 16, marginBottom: 14,
  },
  workCardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  workCardTitle: {
    color: COLORS.textSub, fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.8,
  },
  attachmentField: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.inputBorder,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 8,
  },
  attachmentLabel: {
    color: COLORS.textSub, fontSize: 12, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2,
  },
  attachmentPlaceholder: { color: COLORS.textMuted, fontSize: 13 },
  attachmentCount: { color: COLORS.accentLight, fontSize: 13, fontWeight: '600' },
  attachmentPreviewRow: { flexDirection: 'row', marginBottom: 8 },
  attachmentChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(26,107,255,0.15)',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5,
    marginRight: 8, borderWidth: 1,
    borderColor: 'rgba(26,107,255,0.3)', maxWidth: 140,
  },
  attachmentChipText: { color: COLORS.textSub, fontSize: 11, flex: 1 },
  addWorkBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.card, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.accentLight, paddingVertical: 14, marginBottom: 12,
  },
  addWorkBtnText: { color: COLORS.accentLight, fontSize: 15, fontWeight: '700' },
  orText: { color: COLORS.textMuted, fontSize: 14, textAlign: 'center', marginBottom: 12 },
  skipBtn: {
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.card, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.cardBorder,
    paddingVertical: 13, marginBottom: 20,
  },
  skipBtnText: { color: COLORS.textSub, fontSize: 15, fontWeight: '600' },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.accent, borderRadius: 14, paddingVertical: 15,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45,
    shadowRadius: 14, elevation: 8,
  },
  editBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: '#0D2251',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 12, paddingBottom: 34, paddingHorizontal: 20,
    maxHeight: '65%', borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.divider, alignSelf: 'center', marginBottom: 16,
  },
  modalTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  modalItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, paddingHorizontal: 4,
  },
  modalItemSelected: {
    backgroundColor: COLORS.accentGlow, borderRadius: 10,
    paddingHorizontal: 10, marginHorizontal: -10,
  },
  modalItemText: { color: COLORS.textSub, fontSize: 15 },
  modalItemTextSelected: { color: COLORS.text, fontWeight: '700' },
  modalDivider: { height: 1, backgroundColor: COLORS.divider },
});