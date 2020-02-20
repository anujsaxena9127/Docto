import { StyleSheet, Dimensions } from "react-native";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 95;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default styles = StyleSheet.create({
  container: {
    flex: 1,        
      },
      container2: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 20,
        backgroundColor: '#ffffff',
        padding: 20
      },
  contentContainer: {
    flexGrow: 1
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "transparent"
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 30
  }
});
