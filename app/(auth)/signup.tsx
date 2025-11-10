import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/AuthContext';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import { Button, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  return (
    <View
        style={{ 
                flex: 1, 
                // width: '80%'
            }}
    >
        <ThemedText
            style={{
                fontSize: 32,
                fontWeight: 'bold',
                marginTop: 130,
                marginBottom: 20,
                textAlign: 'center',
            }}
            type='title'
          >SignUp</ThemedText>
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
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        signup(values);
        router.replace('/(tabs)');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 25 }}>
            <TextInput placeholder="Email" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
            {errors.email && <Text
              style={{ color: 'red' }}
            >{errors.email}</Text>}
            <TextInput placeholder="Password" secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
            {errors.password && (
            <Text
              style={{ color: 'red' }}
            >{errors.password}</Text>
            )}
            <TextInput placeholder="Confirmpassword" secureTextEntry onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} value={values.confirmPassword} />
            {errors.confirmPassword && (
            <Text
              style={{ color: 'red' }}
            >{errors.confirmPassword}</Text>
            )}
            <Button title="Signup" onPress={handleSubmit} />
            <Link href="/(auth)" style={{ marginTop: 15, alignItems: 'center' , textAlign: "center", color: "#55f" }} >
              Go to Login
            </Link>
        </View>
        )}
    </Formik>
    </View>
    </View>
  );
}
