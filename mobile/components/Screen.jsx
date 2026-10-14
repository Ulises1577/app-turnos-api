import { Text, View } from 'react-native';

export default function Screen({
    children,
    title,
}) {
  return (
    <View>
      {title && <Text style={styles.title}> {title} </Text> || '' }
      {children}
    </View>
  );
}