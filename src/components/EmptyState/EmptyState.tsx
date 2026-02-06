import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

type EmptyStateProps = {
  title: string;
  subtitle?: string;
};

export function EmptyState({
  title,
  subtitle,
}: EmptyStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
