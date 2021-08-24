import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  ViewStyle,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
} from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { toJS } from "mobx"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  padding: spacing[1],
}
const SEPERATOR: ViewStyle = {
  borderBottomWidth: 1,
  borderTopWidth: 1,
  padding: spacing[1],
  backgroundColor: color.palette.lighterGrey,
}
const CONTAINER: ViewStyle = {
  flex: 1,
}
const LISTCONTAINER: ViewStyle = {
  paddingHorizontal: spacing[2],
}
const TITLE: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
}
const VALUE: TextStyle = {
  fontSize: 14,
  color: color.palette.black,
  lineHeight: 20,
}

export const PostListScreen = observer(function PostListScreen() {
  // Pull in one of our MST stores
  const { postListStore } = useStores()

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  useEffect(() => {
    postListStore.fetchPost()
    const interval = setInterval(() => {
      postListStore.fetchMorePost()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onItemPress = (item: any) => {
    postListStore.updatePostListDetail(item)
    navigation.navigate("postListDetail")
  }

  const renderRows = (title: string, value: any) => {
    return (
      <View style={ROWS}>
        <Text preset={"bold"} text={title} style={TITLE} />
        <Text preset={"default"} text={value} style={VALUE} />
      </View>
    )
  }

  const renderItem = (item: any, index: number) => {
    const { title, author, url } = item
    return (
      <TouchableOpacity
        style={LISTCONTAINER}
        onPress={() => {
          onItemPress(item)
        }}
      >
        {renderRows("Title : ", title)}
        {renderRows("Author : ", author)}
        {renderRows("URL :", url)}
      </TouchableOpacity>
    )
  }

  function onEndReach() {
    if (!postListStore.isLoading) {
      postListStore.fetchMorePost()
    }
  }
  const itemSeparatorComponent = () => {
    return <View style={SEPERATOR} />
  }
  const listFooterComponent = () => {
    return <ActivityIndicator size={"small"} color={color.palette.deepPurple} />
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Header leftIcon={"back"} />
      <View style={CONTAINER}>
        <FlatList
          data={toJS(postListStore.postListData)}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.7}
          onEndReached={onEndReach}
          ListFooterComponent={listFooterComponent}
          ItemSeparatorComponent={itemSeparatorComponent}
        />
      </View>
    </Screen>
  )
})
