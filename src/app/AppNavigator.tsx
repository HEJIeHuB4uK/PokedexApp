import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PokemonListScreen} from '../features/pokemon-list';
import {PokemonDetailScreen} from '../features/pokemon-detail';
import {FavoritesScreen} from '../features/favorites';
import {SearchScreen} from '../features/search/screen';
import {colors} from '../constants/colors';

export type RootStackParamList = {
  MainTabs: undefined;
  PokemonDetail: {name: string};
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

type TabButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  accessibilityState?: {selected?: boolean};
};

function TabBarButton({onPress, children, accessibilityState}: TabButtonProps) {
  const focused = Boolean(accessibilityState?.selected);
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        tabStyles.tabButton,
        focused && tabStyles.tabButtonFocused,
        pressed && tabStyles.tabButtonPressed,
      ]}
      android_ripple={{color: colors.border}}>
      {children}
    </Pressable>
  );
}

function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
      }}>
      <Tab.Screen
        name="Home"
        component={PokemonListScreen}
        options={{
          title: 'Home',
          tabBarButton: props => <TabBarButton {...props} />,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Busqueda',
          tabBarButton: props => <TabBarButton {...props} />,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarButton: props => <TabBarButton {...props} />,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabButtonFocused: {
    transform: [{scale: 1.03}],
  },
  tabButtonPressed: {
    opacity: 0.85,
    transform: [{scale: 0.96}],
  },
});

export function AppNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{title: 'Detalle'}}
      />
    </Stack.Navigator>
  );
}
