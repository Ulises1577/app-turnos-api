import { View, Text } from 'react-native';

export default function Field({
    label, children,
}) {
    return <View>
        {label && <Text style={styles.label}> {label} </Text> || '' }
        {children}
    </View>
}