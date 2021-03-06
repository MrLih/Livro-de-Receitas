import React, { useContext, useEffect } from 'react'
import { 
  Text,
  FlatList,
  Button,
  View,
  Alert
 } from 'react-native'
import RecipeContext from '../context/RecipeContext'
import { getRealm, migration } from '../services/realm'

export const List = () => {
  const { data, addRecipe, getAllRecipes } = useContext(RecipeContext)

  useEffect(()=>{
    
  }, [])

  return (
    <View>
      <Button title='ADD ITEM' onPress={()=>{
        getRealm().then(realm=>{
          realm.write(()=>{
            let ref = realm.create('Recipe',{
              id: `${new Date()}-${Math.floor(Math.random() * 1000)}`,
              title: `alexandre`,
              ingredients: '',
              directions: ''
            })
          })
        })
      }} />
      <Button title='SHOW ITEM' onPress={()=>{
        getRealm().then(realm=>{
          const data = realm.objects('Recipe')
          getAllRecipes(data)
        })
      }} />
      <Button title='DELETE ALL' onPress={()=>{
        getRealm().then(realm=>{
          realm.write(()=>{
            realm.deleteAll()
          })
        })
      }} />
      <Button title='CLOSE' onPress={()=>{
        getRealm().then(realm=>{
          realm.close()
        })
      }} />
      <Button title='MIGRATION' onPress={()=>{
        migration()
      }} />
      <FlatList
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({ item }) => {
          return <Text> {item.title} </Text>
        }}
        />
    </View>
  )
}