import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import FormSaveHome from '../../components/MyHomes/FormSaveHome';

export default function SaveHome(props) {

    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();
    
    return (
        <View>
            <FormSaveHome
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                route={route}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Cargando..." />
        </View>
    );
}