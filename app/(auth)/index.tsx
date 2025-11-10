import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
});

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  return (
    <View
        style={{ 
                flex: 1, 
                // width: '80%'
            }}
    >
        <ThemedText
            type='title'
            style={{
                fontSize: 32,
                fontWeight: 'bold',
                marginTop: 130,
                marginBottom: 20,
                textAlign: 'center',
            }}
          >Login</ThemedText>
    <View
        style={{
            margin:  20,
            marginVertical: '40%',
            alignContent: "center",
            justifyContent: 'center',
            // shadowColor: '#555',
            // shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#fff',
            // padding: 20,
            borderRadius: 25,
        }}
    >
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        const res = await login(values);
        if(res.success){
          router.replace('/(tabs)');
        } else {
          Alert.alert(res.title, res.message);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <ThemedView style={{ padding: 20, backgroundColor: '#fff', borderRadius: 25 }}>
            <TextInput placeholder="Email" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
            <Text
              style={{ color: 'red' }}
            >{errors.email}</Text>
            <TextInput placeholder="Password" secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
            <Text
              style={{ color: 'red' }}
            >{errors.password}</Text>
            <Button title="Login" onPress={handleSubmit} />
            <Link href="/signup" style={{ marginTop: 15, alignItems: 'center' , textAlign: "center", color: "#55f" }} >
              Register Here
            </Link>
        </ThemedView>
        )}
    </Formik>
    </View>
    </View>
  );
}
