import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  BackHandler
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Button, Avatar } from "react-native-elements";
import { GetCityData } from "../shared/Functions";
class Pharmacycart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("Pharmacydetail");
    // We can move to any screen. If we want
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  static navigationOptions = {
    title: "Cart",
    headerStyle: {
      backgroundColor: "#8641F7"
    },
    headerTintColor: "#fff"
  };

  //   fieldRef = React.createRef();

  //   onSubmit = () => {
  //     let { current: field } = this.fieldRef;
  //     const object = this.props.navigation.getParam("object", "");
  //     const city = this.props.navigation.getParam("city", "");
  //     const cityIndex = GetCityData(object, city);
  //     const cityDoctors = object[cityIndex].doctorList;

  //     if (field.value().length > 0) {
  //       var searchDataArr = [];

  //       for (var i = 0; i < cityDoctors.length; i++) {
  //         if (
  //           cityDoctors[i].name
  //             .toUpperCase()
  //             .includes(field.value().toUpperCase()) ||
  //           cityDoctors[i].type
  //             .toUpperCase()
  //             .includes(field.value().toUpperCase()) ||
  //           cityDoctors[i].location
  //             .toUpperCase()
  //             .includes(field.value().toUpperCase())
  //         ) {
  //           searchDataArr.push(cityDoctors[i]);
  //         }
  //       }
  //       this.setState({
  //         searchData: searchDataArr
  //       });
  //     } else {
  //       return null;
  //     }
  //   };

  render() {
    // renderSearch = this.state.searchData.map(data => {
    //   if (this.state.searchData.length > 0) {
    //     console.log("Printing Doctors");
    //     return (
    //       <View
    //         key={data.id}
    //         style={{
    //           backgroundColor: "#fff",
    //           borderRadius: 35,
    //           margin: 13,
    //           padding: 20
    //         }}
    //       >
    //         <View
    //           style={{
    //             flex: 1,
    //             flexDirection: "row",
    //             justifyContent: "space-between"
    //           }}
    //         >
    //           <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
    //             {data.name}
    //           </Text>
    //           <Avatar
    //             rounded
    //             size="medium"
    //             source={{
    //               uri:
    //                 "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
    //             }}
    //           />
    //         </View>
    //         <Text style={{ fontSize: 17 }}>Specilist in : {data.type}</Text>
    //         <Text style={{ fontSize: 17 }}>Location : {data.location}</Text>
    //         <Text style={{ fontSize: 17 }}>Timing : {data.timing}</Text>

    //         <Button
    //           title="Details"
    //           titleStyle={{ fontSize: 14 }}
    //           type="clear"
    //           onPress={() => {
    //             console.log(data.name + "Pressed");
    //             this.props.navigation.navigate("Doctordetail", {
    //               object: data
    //             });
    //           }}
    //         />
    //       </View>
    //     );
    //   } else {
    //     console.log("Not Printing Doctors");
    //     return (
    //       <View>
    //         <Text>No doctor Found.</Text>
    //       </View>
    //     );
    //   }
    // });
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View
              style={{ margin: 13, marginTop: 10, backgroundColor: "#f2f2f2" }}
            >
              <OutlinedTextField
                label="Search Doctors"
                keyboardType="default"
                // onSubmitEditing={this.onSubmit}
                // ref={this.fieldRef}
                autoFocus={true}
              />
            </View>
            {/* {renderSearch} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Pharmacycart;
