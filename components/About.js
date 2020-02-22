import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Linking
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Button, Avatar, SocialIcon } from "react-native-elements";
import { GetMedicineCountIncart } from "../shared/Functions";
import styles from "../shared/Styles";

const DevelopersData = [
  {
    id: "1",
    name: "Rishi singh",
    img:
      "https://avatars1.githubusercontent.com/u/47683539?s=400&u=69de166fad6eade9f1bac3d940c883a3e9eac520&v=4",
    github: "https://www.github.com/rishi-singh26",
    linkedin: "https://www.linkedin.com/in/rishi-singh-b2226415b/",
    description: "Lead developer and Database designer"
  },
  {
    id: "2",
    name: "Aniket",
    img: "https://avatars2.githubusercontent.com/u/40296077?s=400&v=4",
    github: "https://github.com/imanik8",
    linkedin: "https://www.linkedin.com/in/imanik8/",
    description: "FrontEnd and Database developer"
  },
  {
    id: "3",
    name: "Anuj Kumar",
    img: "https://avatars2.githubusercontent.com/u/47420066?s=400&v=4",
    github: "https://github.com/anujsaxena9127/",
    linkedin: "https://www.linkedin.com/in/anuj-kumar-b85247183/",
    description: "Database Developer"
  }
];

function Item({ title, image, description, github, linkedin }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 10,
        padding: 20
      }}
    >
      <View style={{ flex: 5 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            minHeight: 20
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 17, maxWidth: 300 }}>{description}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <SocialIcon
            type="linkedin"
            light
            raised={false}
            onPress={() => Linking.openURL(linkedin)}
          />
          <SocialIcon
            type="github"
            light
            raised={false}
            onPress={() => Linking.openURL(github)}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <Avatar
          rounded
          size="medium"
          source={{
            uri: image
          }}
        />
      </View>
    </View>
  );
}

const renderDevelopersData = state => {
  if (state) {
    return (
      <ScrollView>
        <FlatList
          data={DevelopersData}
          renderItem={({ item }) => (
            <Item
              title={item.name}
              image={item.img}
              description={item.description}
              github={item.github}
              linkedin={item.linkedin}
            />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    );
  }
};

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDevelopersData: false,
      showDevelopersBtnText: "More About Developers"
    };
  }

  static navigationOptions = {
    title: "About",
    headerStyle: {
      backgroundColor: "#8641F7"
    },
    headerTintColor: "#fff"
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: "#fff",
              margin: 15,
              borderRadius: 35,
              padding: 20
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
                maxHeight: 100
              }}
            >
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
                maxHeight: 40
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  alignSelf: "center"
                }}
              >
                DOCTO
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
                maxHeight: 80,
                minHeight: 80
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                An app to create appointments with doctors and to buy medicines
                from the pharmacy in your neighbourhood.
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (this.state.showDevelopersData) {
                    this.setState({
                      showDevelopersBtnText: "More About Developers"
                    });
                  } else {
                    this.setState({
                      showDevelopersBtnText: "Less About Developers"
                    });
                  }
                  this.setState({
                    showDevelopersData: !this.state.showDevelopersData
                  });
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "#33a1f5"
                  }}
                >
                  {this.state.showDevelopersBtnText}
                </Text>
              </TouchableOpacity>
            </View>
            {renderDevelopersData(this.state.showDevelopersData)}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default About;
