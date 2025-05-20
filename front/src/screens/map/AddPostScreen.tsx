import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';
import ImageInput from '@/components/ImageInput';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { colors, mapNavigations } from '@/constants';
import InputField from '@/components/InputField';
import useModal from '@/hooks/useModal';
import useForm from '@/hooks/useForm';
import { getDateWithSeparator, validateAddPost } from '@/utils';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import { MarkerColor } from '@/types';
import CustomButton from '@/components/CustomButton';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import DatePickerOption from '@/components/DatePickerOption';
import PreviewImageList from '@/components/PreviewImageList';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({ route, navigation }: AddPostScreenProps) {
  const { location } = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  
  const datePickerModal = useModal();
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);

  const imagePicker = useImagePicker({
    initialImages: [],
  });

  console.log('imagePicker.imageUris', imagePicker.imageUris);
  usePermission('PHOTO');


  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: [],
    };

    createPost.mutate(
      { address, ...location, ...body },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };


  // 날짜 라벨 포맷
  const dateLabel = isPicked ? getDateWithSeparator(date, '. ') : '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled={true}
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />

          {
          <InputField
            {...addPost.getTextInputProps('title')}
            error={addPost.errors.title}
            touched={addPost.touched.title}
            placeholder="제목을 입력하세요."
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              descriptionRef.current?.focus();
            }}
          />
          }

          {/* 날짜 InputField + 오른쪽 달력 아이콘 */}
           <Text style={styles.label}>사진 추가하기</Text>

           <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>


          {/* 날짜 InputField + 오른쪽 달력 아이콘 */}
          <Text style={styles.label}>상세 설명</Text>

          <InputField
            {...addPost.getTextInputProps('description')}
            error={addPost.errors.description}
            touched={addPost.touched.description}
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력해주세요."
            returnKeyType="next"
            multiline
          />


          {/* 날짜 선택 */}
          <Text style={styles.label}>날짜 선택하기</Text>
          <InputField
            value={dateLabel}
            disabled={true}
            placeholder="날짜를 선택하세요."
            rightIcon={
              <Pressable onPress={datePickerModal.show} hitSlop={8}>
                <Octicons name="calendar" size={20} color={colors.GRAY_500} />
              </Pressable>
            }
          />

          
          <DatePickerOption
            date={date}
            isVisible={datePickerModal.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />


        </View>
      </ScrollView>

      <View style={styles.bottomButtonWrap}>
        <CustomButton
          label="기록하기"
          size="large"
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginTop: 10,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
  bottomButtonWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 24, // SafeArea 하단 여백
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderColor: colors.GRAY_100,
    alignItems: 'center',
    justifyContent: 'center',
    // shadow 효과
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AddPostScreen;
