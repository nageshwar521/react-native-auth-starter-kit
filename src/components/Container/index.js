import React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import createStyles from '@src/utils/createStyles';
import Content from '../Content';
import {useTheme, List} from 'react-native-paper';
import {Box} from 'react-native-design-utility';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = ({
  style = {},
  title = '',
  subtitle = '',
  children,
  showImage = false,
  headerImageUrl,
  headerImageProps = {},
  headerLeftIconProps = {},
  getLeftComponent,
  getRightComponent,
  headerContainerProps = {},
  contentContainerProps = {},
  headerLeftContainerProps = {},
  headerRightContainerProps = {},
  titleStyle = {},
  subtitleStyle = {},
  headerBoxContainerProps = {},
  headerContentContainerProps = {},
}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const {
    height = 50,
    width = 50,
    resizeMode = 'contain',
    ...otherImgProps
  } = headerImageProps;

  const renderHeaderImage = () => {
    return headerImageUrl ? (
      <TouchableOpacity {...headerLeftContainerProps}>
        <Box>
          <FastImage
            resizeMode={resizeMode}
            height={height}
            width={width}
            {...otherImgProps}
          />
        </Box>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity {...headerLeftContainerProps}>
        <Box>
          <Icon
            color={theme.colors.border}
            name="image"
            size={72}
            {...headerLeftIconProps}
          />
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={[styles.container, style]}>
      {[title, subtitle].some(e => !!e) ? (
        <Box
          paddingHorizontal={30}
          pt={10}
          flexDirection="row"
          {...headerContainerProps}>
          {showImage
            ? renderHeaderImage()
            : getLeftComponent
            ? getLeftComponent()
            : null}
          <Box
            flexGrow={1}
            justifyContent="center"
            {...headerBoxContainerProps}>
            <List.Item
              title={title}
              description={subtitle}
              style={styles.centerContainerStyle}
              titleStyle={[styles.titleStyle, titleStyle]}
              descriptionStyle={[styles.subtitleStyle, subtitleStyle]}
              descriptionNumberOfLines={2}
              {...headerContentContainerProps}
            />
          </Box>
          <Box>{getRightComponent ? getRightComponent() : null}</Box>
        </Box>
      ) : null}
      <Box f={1} p={20} {...contentContainerProps}>
        {children}
      </Box>
    </ScrollView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      backgroundColor: theme.colors.bgPrimary,
      margin: 0,
      padding: 0,
    },
    centerContainerStyle: {
      marginLeft: -8,
      paddingHorizontal: 0,
    },
    titleStyle: {
      fontSize: 20,
      color: theme.colors.textDark,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
    subtitleStyle: {
      color: theme.colors.textDark,
      fontSize: 14,
    },
  };

  return createStyles(styles);
};

export default Container;
