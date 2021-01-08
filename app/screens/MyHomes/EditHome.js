import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import FormEditHome from '../../components/MyHomes/FormEditHome';

export default function EditHome(props) {

    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    return (
        <View>
            <FormEditHome
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                data={route.params}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Cargando..." />
        </View>
    );
}