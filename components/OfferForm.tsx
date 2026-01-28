import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MIN_CHARS = 0;
const MAX_CHARS = 300;
const ORANGE = '#FF6A00';

type OfferFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  recipientName: string;
};

export default function OfferForm({ visible, onClose, onSubmitSuccess, recipientName }: OfferFormProps) {
  const [whatIOffer, setWhatIOffer] = useState('');
  const [whatIWant, setWhatIWant] = useState('');
  const [optionalNote, setOptionalNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Animation values
  const successScale = React.useRef(new Animated.Value(0.5)).current;
  const successOpacity = React.useRef(new Animated.Value(0)).current;

  // Confetti particles
  const PARTICLES = 20;
  const confettiParticles = React.useRef(
    Array.from({ length: PARTICLES }).map(() => ({
      tx: new Animated.Value(0),
      ty: new Animated.Value(0),
      rotate: new Animated.Value(0),
      op: new Animated.Value(1),
      dx: (Math.random() - 0.5) * 400,
      dy: (Math.random() - 0.5) * 300 - 150,
      color: ['#FF6A00', '#FFD700', '#FF1493', '#00CED1', '#32CD32'][Math.floor(Math.random() * 5)],
      size: Math.floor(Math.random() * 8) + 6,
    }))
  ).current;

  // Validation
  const isOfferValid = whatIOffer.trim().length > 0 && whatIOffer.length <= MAX_CHARS;
  const isWantValid = whatIWant.trim().length > 0 && whatIWant.length <= MAX_CHARS;
  const isFormValid = isOfferValid && isWantValid;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Animate success feedback
    Animated.parallel([
      Animated.spring(successScale, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(successOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger confetti animation
    Animated.stagger(
      30,
      confettiParticles.map((p) =>
        Animated.parallel([
          Animated.timing(p.tx, {
            toValue: p.dx,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(p.ty, {
            toValue: p.dy,
            duration: 1200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(p.rotate, {
            toValue: Math.random() * 720 - 360,
            duration: 1200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(p.op, {
            toValue: 0,
            duration: 1200,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      )
    ).start();

    // Notify parent immediately after success (don't auto-close)
    onSubmitSuccess();
  };

  const handleClose = () => {
    setShowSuccess(false);
    successScale.setValue(0.5);
    successOpacity.setValue(0);
    // Reset confetti
    confettiParticles.forEach((p) => {
      p.tx.setValue(0);
      p.ty.setValue(0);
      p.rotate.setValue(0);
      p.op.setValue(1);
    });
    setWhatIOffer('');
    setWhatIWant('');
    setOptionalNote('');
    onClose();
  };

  const getCharCountColor = (length: number, isRequired: boolean) => {
    if (!isRequired) return '#999';
    if (length === 0) return '#FF3B30';
    if (length > MAX_CHARS) return '#FF3B30';
    return '#34C759';
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Send Offer to {recipientName}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Form Content */}
          {!showSuccess ? (
            <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
              {/* What I Offer */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  What I Offer <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    whatIOffer.length > 0 && !isOfferValid && styles.textInputError,
                  ]}
                  multiline
                  numberOfLines={6}
                  maxLength={MAX_CHARS}
                  placeholder="Describe what you can offer in exchange (required, max 300 characters)"
                  placeholderTextColor="#999"
                  value={whatIOffer}
                  onChangeText={setWhatIOffer}
                  editable={!isSubmitting}
                />
                <Text
                  style={[
                    styles.charCount,
                    { color: getCharCountColor(whatIOffer.length, true) },
                  ]}
                >
                  {whatIOffer.length}/{MAX_CHARS} characters
                </Text>
              </View>

              {/* What I Want */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  What I Want <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    whatIWant.length > 0 && !isWantValid && styles.textInputError,
                  ]}
                  multiline
                  numberOfLines={6}
                  maxLength={MAX_CHARS}
                  placeholder="Describe what you're looking for (required, max 300 characters)"
                  placeholderTextColor="#999"
                  value={whatIWant}
                  onChangeText={setWhatIWant}
                  editable={!isSubmitting}
                />
                <Text
                  style={[
                    styles.charCount,
                    { color: getCharCountColor(whatIWant.length, true) },
                  ]}
                >
                  {whatIWant.length}/{MAX_CHARS} characters
                </Text>
              </View>

              {/* Optional Note */}
              <View style={styles.fieldContainer}>
                <Text style={[styles.label, styles.optionalLabel]}>Optional Note</Text>
                <TextInput
                  style={[styles.textInput, styles.optionalInput]}
                  multiline
                  numberOfLines={4}
                  maxLength={200}
                  placeholder="Add any additional notes (optional)"
                  placeholderTextColor="#aaa"
                  value={optionalNote}
                  onChangeText={setOptionalNote}
                  editable={!isSubmitting}
                />
                <Text style={[styles.charCount, styles.optionalCharCount]}>
                  {optionalNote.length}/200 characters
                </Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Send Offer</Text>
                )}
              </TouchableOpacity>

              {/* Validation hint */}
              {!isFormValid && (whatIOffer.length > 0 || whatIWant.length > 0) && (
                <Text style={styles.validationHint}>
                  {whatIOffer.trim().length === 0 || whatIWant.trim().length === 0
                    ? 'Both required fields must be filled'
                    : 'Please ensure both fields are under 300 characters'}
                </Text>
              )}
            </ScrollView>
          ) : (
            // Success Feedback
            <View style={styles.successContainer}>
              <Animated.View
                style={[
                  styles.successIcon,
                  { opacity: successOpacity, transform: [{ scale: successScale }] },
                ]}
              >
                <Ionicons name="checkmark-circle" size={80} color="#34C759" />
              </Animated.View>
              
              {/* Confetti particles */}
              {confettiParticles.map((p, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.confetti,
                    {
                      backgroundColor: p.color,
                      width: p.size,
                      height: p.size,
                      opacity: p.op,
                      transform: [
                        { translateX: p.tx },
                        { translateY: p.ty },
                        { rotate: p.rotate.interpolate({
                          inputRange: [0, 360],
                          outputRange: ['0deg', '360deg'],
                        })},
                      ],
                    },
                  ]}
                />
              ))}
              
              <Text style={styles.successTitle}>Offer Sent!</Text>
              <Text style={styles.successMessage}>
                Your offer has been sent to {recipientName}. They'll be notified shortly.
              </Text>
              
              {/* Close button on success screen */}
              <TouchableOpacity 
                style={styles.successCloseButton} 
                onPress={handleClose}
              >
                <Text style={styles.successCloseButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  formScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  optionalLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  required: {
    color: '#FF3B30',
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#1A1A1A',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  textInputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  optionalInput: {
    minHeight: 90,
    borderColor: '#e8e8e8',
    backgroundColor: '#FAFAFA',
  },
  charCount: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
    textAlign: 'right',
  },
  optionalCharCount: {
    color: '#999',
    fontWeight: '400',
  },
  submitButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    shadowColor: ORANGE,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  validationHint: {
    fontSize: 13,
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  confetti: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    borderRadius: 4,
  },
  successCloseButton: {
    marginTop: 24,
    backgroundColor: ORANGE,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: ORANGE,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  successCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
