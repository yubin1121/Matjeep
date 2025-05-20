import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '@/constants';

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({ onChange }: ImageInputProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.imageInput,
        pressed && styles.imageInputPressed,
      ]}
      onPress={onChange}
    >
      <Ionicons name="add" size={25} color={colors.GRAY_300} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 2,
    borderColor: colors.GRAY_300,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16, 
    backgroundColor: colors.WHITE,
    gap: 8,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
  inputText: {
    fontSize: 14,
    color: colors.GRAY_300,
    fontWeight: '500',
  },
});

export default ImageInput;
