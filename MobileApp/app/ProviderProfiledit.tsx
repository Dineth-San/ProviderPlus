/**
 * ProviderProfiledit.tsx
 * COMMIT 2 — Basic Profile + Service Information
 * Fields: Profile Picture, Name, Email, Contact No, NIC
 * Service Information: Category Dropdown, Service Description,
 *                      Skills (predefined + custom), Company Location, BR Number
 * Buttons: Skip, Edit Details
 *
 * Required packages:
 *   npx expo install expo-image-picker
 */

import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProviderProfiledit(): React.JSX.Element {
  // Personal Info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [nic, setNic] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Service Info
  const [category, setCategory] = useState<string>('');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [serviceDescription, setServiceDescription] = useState<string>('');

  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [showSkillInput, setShowSkillInput] = useState<boolean>(false);

  // Company
  const [companyLocation, setCompanyLocation] = useState<string>('');
  const [brNumber, setBrNumber] = useState<string>('');

  // ── Handlers ──────────────────────────────────────────────────────────────

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

  const handleEditDetails = (): void => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing Info', 'Please fill in your name and email.');
      return;
    }
    Alert.alert('Profile Updated', 'Your provider profile has been saved successfully!');
  };

  // ── Render ─────────────────────────────────────────────────────────────────

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
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={handlePickProfileImage}
            activeOpacity={0.85}
          >
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

          {/* Personal Info Card */}
          <View style={styles.card}>
            <InputField label="Name" value={name} onChangeText={setName} />
            <View style={styles.divider} />
            <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <View style={styles.divider} />
            <InputField label="Contact No." value={contact} onChangeText={setContact} keyboardType="phone-pad" />
            <View style={styles.divider} />
            <InputField label="NIC" value={nic} onChangeText={setNic} />
          </View>

          {/* ── Service Information ── */}
          <SectionHeader title="Service Information" />

          {/* Category Dropdown */}
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

          {/* Service Description */}
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

          {/* Company Location — plain text input (map picker added in next commit) */}
          <View style={styles.locationField}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0, paddingHorizontal: 0 }]}
              value={companyLocation}
              onChangeText={setCompanyLocation}
              placeholder="Company Location"
              placeholderTextColor={COLORS.textMuted}
            />
            <Ionicons name="location-outline" size={18} color={COLORS.textMuted} />
          </View>

          {/* BR Number */}
          <View style={styles.card}>
            <InputField value={brNumber} onChangeText={setBrNumber} placeholder="BR Number" />
          </View>

          <Text style={styles.orText}>Or</Text>

          {/* Skip */}
          <TouchableOpacity
            style={styles.skipBtn}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>

          {/* Edit Details */}
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
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.divider,
  },
  headerBack: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  headerTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  langText: { color: COLORS.textSub, fontSize: 13, fontWeight: '600' },
  toggleOuter: {
    width: 40, height: 22, borderRadius: 11, backgroundColor: COLORS.accent,
    justifyContent: 'center', paddingHorizontal: 2, alignItems: 'flex-end',
  },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },
  avatarWrapper: { alignSelf: 'center', marginBottom: 24 },
  avatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 3, borderColor: COLORS.accent },
  avatarPlaceholder: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.card,
    borderWidth: 2, borderColor: COLORS.cardBorder, alignItems: 'center', justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute', bottom: 2, right: 2, width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.bg,
  },
  card: {
    backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1,
    borderColor: COLORS.cardBorder, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 14,
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
    backgroundColor: COLORS.inputBg, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.inputBorder, minHeight: 44,
  },
  inputMultiline: { minHeight: 90, paddingTop: 10 },
  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 10 },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1,
    borderColor: COLORS.cardBorder, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 14,
  },
  dropdownPlaceholder: { color: COLORS.textMuted, fontSize: 15 },
  dropdownValue: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  chipsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, backgroundColor: COLORS.chipBg, borderWidth: 1,
    borderColor: COLORS.chipBorder, gap: 5,
  },
  chipSelected: { backgroundColor: COLORS.chipSelected, borderColor: COLORS.chipSelected },
  chipText: { color: COLORS.textSub, fontSize: 13, fontWeight: '500' },
  chipTextSelected: { color: '#fff', fontWeight: '700' },
  chipRemove: { marginLeft: 2 },
  addSkillBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', paddingVertical: 6,
  },
  addSkillBtnText: { color: COLORS.accentLight, fontSize: 14, fontWeight: '600' },
  customSkillRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  customSkillInput: {
    flex: 1, color: COLORS.text, fontSize: 14, backgroundColor: COLORS.inputBg,
    borderRadius: 10, borderWidth: 1, borderColor: COLORS.inputBorder,
    paddingHorizontal: 12, paddingVertical: 8, height: 40,
  },
  customSkillConfirm: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  customSkillCancel: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  locationField: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderRadius: 14, borderWidth: 1, borderColor: COLORS.cardBorder,
    paddingHorizontal: 16, paddingVertical: 4, marginBottom: 14,
  },
  orText: { color: COLORS.textMuted, fontSize: 14, textAlign: 'center', marginBottom: 12 },
  skipBtn: {
    alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.card,
    borderRadius: 14, borderWidth: 1, borderColor: COLORS.cardBorder,
    paddingVertical: 13, marginBottom: 20,
  },
  skipBtnText: { color: COLORS.textSub, fontSize: 15, fontWeight: '600' },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.accent, borderRadius: 14, paddingVertical: 15,
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14, elevation: 8,
  },
  editBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: '#0D2251', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 12, paddingBottom: 34, paddingHorizontal: 20,
    maxHeight: '65%', borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.divider,
    alignSelf: 'center', marginBottom: 16,
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