import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: []
    };
  }

  static navigationOptions = {
    title: "Search",
    headerStyle: {
      backgroundColor: "#ff2974"
    },
    headerTintColor: "#fff"
  };

  fieldRef = React.createRef();

  onSubmit = () => {
    let { current: field } = this.fieldRef;
    const object = this.props.navigation.getParam("object", "");

    if (field.value().length > 0) {
      var searchDataArr = [];

      for (var i = 0; i < object.length; i++) {
        if (
          object[i].name.toUpperCase().includes(field.value().toUpperCase()) ||
          object[i].type.toUpperCase().includes(field.value().toUpperCase())
        ) {
          searchDataArr.push(object[i]);
        }
      }
      this.setState({
        searchData: searchDataArr
      });
    } else {
      return null;
    }
  };

  render() {
    renderSearch = this.state.searchData.map(data => {
      if (this.state.searchData.length > 0) {
        console.log("Printing Doctors");
        return (
          <View
            key={data.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 35,
              marginTop: 10,
              marginBottom: 10,
              padding: 20
            }}
          >
            <Text>{data.name}</Text>
            <Text>{data.type}</Text>
            <Text>{data.experiance}</Text>
            <Text>{data.location}</Text>
            <Text>{data.contact}</Text>
            <Text>{data.timing}</Text>
          </View>
        );
      } else {
        console.log("Not Printing Doctors");
        return (
          <View>
            <Text>No doctor Found.</Text>
          </View>
        );
      }
    });
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={{ margin: 5, marginTop: 10 }}>
              <OutlinedTextField
                label="Search Doctors"
                keyboardType="default"
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
                autoFocus={true}
              />
            </View>
            {renderSearch}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Search;
