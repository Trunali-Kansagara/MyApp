import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  padding: spacing[2],
  borderBottomWidth: 1,
}
const TITLE: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
}
const VALUE: TextStyle = {
  fontSize: 14,
  fontWeight: "400",
  color: color.palette.black,
}

export const PostListDetailScreen = observer(function PostListDetailScreen() {
  // Pull in one of our MST stores
  const { postListStore } = useStores()
  const { postListDetail } = postListStore

  const renderRows = (title, value) => {
    return (
      <View style={ROWS}>
        <Text text={title + " : "} style={TITLE} preset={"bold"} />
        <Text text={value} style={VALUE} preset={"secondary"} />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={"post detail"} />
      <View style={CONTAINER}>
        {renderRows("Title", postListDetail.title)}
        {renderRows("Author", postListDetail.author)}
        {renderRows("Value", postListDetail.url)}
      </View>
    </Screen>
  )
})
