import { Text, View } from 'react-native';
import Dust from './Dust';
import Weather from './Weather';
import Temp from './Temp';

export default function App() {
  return (
    <View>
      <Temp userNx={61} userNy={120} />
      <Weather userNx={61} userNy={120} />
      <Dust />
    </View>
  );
}
