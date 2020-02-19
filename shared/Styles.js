import { StyleSheet, Dimensions } from "react-native";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 95;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  detail: {
    fontSize: 17,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  },
  renderCard: {
    backgroundColor: "#fff",
    borderRadius: 35,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    marginLeft: 13,
    marginRight: 13
  },
  renderMedicineCards: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 35,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    marginLeft: 13,
    marginRight: 13
  }
});
