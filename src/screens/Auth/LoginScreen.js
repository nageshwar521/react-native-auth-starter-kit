import React from 'react';
import {Dimensions, View} from 'react-native';
import Container from '../../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import createStyles from '../../utils/createStyles';
import {TextInput} from '../../components/Input';
import {userLogin} from '../../redux/actions/authActions';
import {getI18nMessage} from '../../translations/messages';
import {
  usernameLabel,
  passwordLabel,
  loginButtonLabel,
  loginTitle,
} from '../../translations/keys';
import Button from '../../components/Button';
import useStorage from '../../hooks/useStorage';
import {Box} from 'react-native-design-utility';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const LoginScreen = ({navigation}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);
  const [username, setUsername] = React.useState('nagesh');
  const [password, setPassword] = React.useState('reddy');
  const {get, isLoading, response: token, error} = useStorage();

  React.useEffect(() => {
    get('accessToken');
  }, []);

  const handleLogin = () => {
    dispatch(userLogin({username, password}));
  };

  React.useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token, navigation]);

  return (
    <Box justify="center" p={20} f={1} backgroundColor={theme.colors.secondary}>
      <Container
        style={styles.container}
        title={getI18nMessage(loginTitle)}
        titleStyle={styles.titleStyle}
        titleProps={{align: 'center', type: 'title'}}>
        <TextInput
          size="small"
          label={getI18nMessage(usernameLabel)}
          value={username}
          onChange={text => setUsername(text)}
        />
        <TextInput
          size="small"
          label={getI18nMessage(passwordLabel)}
          value={password}
          onChange={text => setPassword(text)}
        />
        <Button
          disabled={state.status === 'loading'}
          position="full"
          size="small"
          onPress={handleLogin}>
          {getI18nMessage(loginButtonLabel)}
        </Button>
      </Container>
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    titleStyle: {
      fontSize: 32,
      alignItems: 'center',
    },
    container: {
      // backgroundColor: theme.colors.secondary,
    },
  };
  return createStyles(styles);
};

export default LoginScreen;
