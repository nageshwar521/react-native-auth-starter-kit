import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {useTheme} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import useUploadApi from '../../hooks/useUploadApi';
import createStyles from '../../utils/createStyles';
import Button from '../../components/Button';

const ProfileScreen = () => {
  const theme = useTheme();
  const {uploadImage, resetUpload, uploadStatus, uploadResponse, uploadError} =
    useUploadApi();
  const styles = getStyles();

  const handleImageUpload = async () => {
    await launchImageLibrary(
      {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        // console.log('handleImageUpload response', response);
        const file =
          response.assets && Array.isArray(response.assets)
            ? response.assets[0]
            : null;
        // console.log(file, 'file');
        uploadImage({file: file});
      },
    );
  };

  return (
    <Box bg={theme.colors.primary} f={1} justify="center">
      <Box bg={'white'} p={10} f={3}>
        <Button
          disabled={uploadStatus === 'loading'}
          onPress={handleImageUpload}>
          {uploadStatus === 'loading' ? 'Loading...' : 'Upload Image'}
        </Button>
      </Box>
    </Box>
  );
};

const getStyles = () => {
  const styles = {textInput: {borderColor: 'red', borderWidth: 1, flex: 1}};
  return createStyles(styles);
};

export default ProfileScreen;
