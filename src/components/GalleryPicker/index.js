import React, {useEffect, useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import {userLogout} from '@src/redux/actions/authActions';
import createStyles from '@src/utils/createStyles';
import {Avatar, Badge, useTheme} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import {homeTitleLabel} from '@src/translations/keys';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId, getShadow} from '@src/utils/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import CameraRollPicker from 'react-native-camera-roll-picker';
import {useNavigation} from '@react-navigation/native';

const GalleryPicker = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const getSelectedImages = (images, current) => {
    setSelectedPhotos(images);
  };

  return (
    <Box>
      <CameraRollPicker
        groupTypes="SavedPhotos"
        maximum={3}
        selected={selectedPhotos}
        assetType="Photos"
        imagesPerRow={3}
        imageMargin={5}
        callback={getSelectedImages}
      />
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    content: {
      marginTop: 15,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    text: {
      fontSize: 16,
      alignItems: 'center',
      color: '#fff',
    },
    bold: {
      fontWeight: 'bold',
    },
    info: {
      fontSize: 12,
    },
  };

  return createStyles(styles);
};

export default GalleryPicker;
