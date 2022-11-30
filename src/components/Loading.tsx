import { Text, View } from 'react-native';

const Loading = () => {
    return (
        <View style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#4ABBFF', fontSize: 30}}>Loading...</Text>
        </View>
    )
}

export default Loading