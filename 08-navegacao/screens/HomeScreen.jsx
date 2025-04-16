import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Paragraph, Text, Title } from 'react-native-paper'

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>HomeScreen</Text>

        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Title>Um título</Title>
            <Paragraph>sadad sadad sadad sadad sadad sadadsadad sadad sadadsadad sadad sadadsadad sadad </Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        </Card>

        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Title>Um título</Title>
            <Paragraph>sadad sadad sadad sadad sadad sadadsadad sadad sadadsadad sadad sadadsadad sadad </Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        </Card>

        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Title>Um título</Title>
            <Paragraph>sadad sadad sadad sadad sadad sadadsadad sadad sadadsadad sadad sadadsadad sadad </Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        </Card>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'fff',
    alignItems: 'center',
    paddingTop: 10
  }
})