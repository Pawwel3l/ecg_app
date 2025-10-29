import {View, StyleSheet} from 'react-native';
// ✅ Заменяем импорт StatusBar из expo-status-bar на стандартный React Native.
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainScreen from './src/screens/mainscreen';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* ⚠️ Используем стандартный StatusBar, чтобы избежать ошибки импорта */}
      <StatusBar barStyle="light-content" />

      {/* Контейнер для центрирования всего приложения на веб-странице */}
      <View style={styles.container}>
        <MainScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // Стиль, гарантирующий, что контейнер займет всю область просмотра браузера
    flex: 1,
    width: '100%',
    height: '100%',
    // Центрирование макета по центру страницы
    alignItems: 'center',
    justifyContent: 'center',
  },
});
