import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// !!! ВАЖНО: Импорты нативных модулей УДАЛЕНЫ (или закомментированы)
// import {LinearGradient} from 'expo-linear-gradient';
// import {BlurView} from 'expo-blur';

// Задаем размеры экрана для имитации 360/800
const SCREEN_WIDTH = 360;
const SCREEN_HEIGHT = 800;
const {width, height} = Dimensions.get('window');

// --- Компоненты ---

// Компонент Glassmorphism Card (использует View с веб-стилями)
const GlassCard = ({children, style}) => (
  // Заменяем <BlurView> на <View> и добавляем веб-совместимый стиль размытия
  <View style={[styles.glassCard, style, styles.glassCardWeb]}>
    <View style={styles.glassCardContent}>{children}</View>
  </View>
);

// --- Основной Компонент Экрана ---

const MainScreen = () => {
  // CSS-градиенты для Web
  const backgroundGradientStyle = {
    // @ts-ignore: backgroundImage не поддерживается RN, но работает на Web
    backgroundImage: 'linear-gradient(to bottom, #1c0c6b, #180e30, #1c0c6b)',
  };
  const buttonGradientStyle = {
    // @ts-ignore: backgroundImage не поддерживается RN, но работает на Web
    backgroundImage: 'linear-gradient(to right, #ff8c42, #ff4d4d)',
  };

  return (
    // Заменяем <LinearGradient> на <View>
    <View style={[styles.container, backgroundGradientStyle]}>
      <View style={styles.contentContainer}>
        {/* Хедер: Приветствие. Заменяем <BlurView> на <View> */}
        <View style={[styles.headerCard, styles.glassCardWeb]}>
          <Text style={styles.headerText}>🔥 Добро пожаловать, **[Имя]**!</Text>
        </View>

        {/* Карточка 1: Последний анализ */}
        <GlassCard style={styles.topCard}>
          <Text style={styles.cardTitle}>Последний анализ</Text>
          <Text style={styles.cardSubtitle}>19 октября 2025, 14:30</Text>
          <View style={styles.analysisContainer}>
            <Text style={styles.riskPercent}>15%</Text>
            <Text style={styles.riskLevel}>Низкий риск</Text>
          </View>
          {/* Имитация волнистого графика */}
          <View style={styles.waveGraphContainer}>
            <View style={styles.waveLine} />
          </View>
        </GlassCard>

        {/* Карточка 2: Статистика */}
        <GlassCard style={styles.bottomCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Среднее за неделю:</Text>
            <Text style={styles.statValue}>15%</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Изменение за месяц:</Text>
            <Text style={styles.statValuePositive}>+2%</Text>
          </View>
        </GlassCard>

        {/* Кнопка: Начать анализ. Заменяем <LinearGradient> на <View> с CSS-градиентом */}
        <TouchableOpacity style={styles.buttonShadow}>
          <View
            style={[styles.actionButton, buttonGradientStyle]}
            // start и end здесь не используются, так как это не LinearGradient
          >
            <Text style={styles.buttonText}>НАЧАТЬ АНАЛИЗ</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Нижняя навигационная панель. Заменяем <BlurView> на <View> */}
      <View style={[styles.bottomNav, styles.glassCardWeb]}>
        <Text style={styles.navIcon}>☰</Text>
        <Text style={styles.navIcon}>🖼️</Text>
        <Text style={styles.navIcon}>📅</Text>
        <Text style={styles.navIcon}>🔗</Text>
        <Text style={styles.navIcon}>⏱️</Text>
        <Text style={styles.navIcon}>👤</Text>
      </View>
    </View>
  );
};

// --- Стили ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1c0c6b', // Запасной цвет, если градиент не сработает
  },
  contentContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingTop: 50,
    flex: 1,
  },
  headerCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // --- Glassmorphism Card Styles ---
  glassCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  // !!! Ключевой стиль для Web: Backdrop Filter !!!
  glassCardWeb: {
    // @ts-ignore: Backdrop Filter не поддерживается RN, но это стандартный CSS для Web
    backdropFilter: 'blur(10px)',
  },
  glassCardContent: {
    padding: 20,
  },
  topCard: {
    height: 200,
  },
  bottomCard: {
    height: 100,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 10,
  },
  analysisContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  riskPercent: {
    color: '#90ee90',
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  riskLevel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    fontWeight: '500',
  },
  waveGraphContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  waveLine: {
    width: '100%',
    height: 50,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 100,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statValuePositive: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonShadow: {
    borderRadius: 30,
    shadowColor: '#ff4d4d',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 40,
    alignSelf: 'center',
    width: '90%',
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: SCREEN_WIDTH,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  navIcon: {
    fontSize: 24,
    color: '#fff',
    padding: 5,
  },
});

export default MainScreen;
