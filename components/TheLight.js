import {SafeAreaView} from 'react-native'
export default function TheLight() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled ((previousState) => !previousState)
  return (
    <SafeAreaView>
    </SafeAreaView>
  )
}
