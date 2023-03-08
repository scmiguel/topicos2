import {SafeAreaView, Image} from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default function TheLight() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled ((previousState) => !previousState)
  return (
    <SafeAreaView>
        <StatusBar style="light"/>
        <Image fadeDuration={0} source={isEnabled ? bulbOn: bulbOff}>

        </Image>
    </SafeAreaView>
  )
}
