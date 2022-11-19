import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import Ionicons from "react-native-vector-icons/Ionicons";
  
  import logo from "../assets/loginPage/Logo.png";
  import apple from "../assets/loginPage/apple.png";
  import google from "../assets/loginPage/google.png";
  import ms from "../assets/loginPage/MS.png";
  
  import InputField from "../components/InputField";
  import CustomButton from "../components/CustomButton";
  
  const LoginScreen = ({ navigation }: { navigation: any }) => {
    return (
      <SafeAreaView style={styles.backg}>
        <View style={{ paddingHorizontal: 50, marginTop: 50 }}>
          {/* <View style={{ alignItems: "center" }}>
            <Image source={logo} style={styles.logo} />
          </View> */}

          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            Account Details
          </Text>

          <View style={{
    flexDirection: "row",
    width: '100%',
    
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    justifyContent: "space-between"
   
  }}>
          <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "purple",
            opacity: .5,
            marginTop: 20,
            

           
            
            }}
            >Name</Text>
            <TouchableOpacity>
         
       
             <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "red",
            marginTop: 20,
            
        }}
            >Edit</Text>
            </TouchableOpacity>
            </View>
            <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            marginLeft: 10
            }}
            >Test Name</Text>
            
 
            <View style={{
    flexDirection: "row",
    width: '100%',
    
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    justifyContent: "space-between"
   
  }}>
          <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "purple",
            opacity: .5,
            marginTop: 20,
            

           
            
            }}
            >E-mail</Text>
            <TouchableOpacity>
         
       
             <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "red",
            marginTop: 20,
            
        }}
            >Edit</Text>
            </TouchableOpacity>
            </View>
            <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            marginLeft: 10
            }}
            >test@email.com</Text>
            <View style={{
    flexDirection: "row",
    width: '100%',
    
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    justifyContent: "space-between"
   
  }}>
          <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "purple",
            opacity: .5,
            marginTop: 20,
            

           
            
            }}
            >Phone Number</Text>
            <TouchableOpacity>
         
       
             <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "red",
            marginTop: 20,
            
        }}
            >Edit</Text>
            </TouchableOpacity>
            </View>
            <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            marginLeft: 10
            }}
            >403-597-9824</Text>

<TouchableOpacity
          ><Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "red",
            marginBottom: 30,
            marginTop: 20,
           
            
            }}
            >Delete Account</Text></TouchableOpacity>
          {/* <InputField
            label={"Email ID"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
          />
  
          <InputField
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          /> */}
  
          <CustomButton label={"Sign Out"} onPress={() => {}} />
  
       
  
          
        
  
          
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    backg:{
        ...StyleSheet.absoluteFillObject,
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      backgroundColor: "#fff49b",
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#fff49b",
    },
    header: {
      fontSize: 30,
      alignItems: "center",
      fontFamily: "Roboto-Regular",
    },
    logo: {
      width: 150,
      height: 100,
      resizeMode: "stretch",
    },
    logoContainer: {
      marginTop: 100,
    },
  });