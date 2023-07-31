import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  db,
  auth,
  updateProfile,
  getDoc,
  doc,
  collection,
  updateDoc,
  deleteDoc,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "../Data/Firebase";
import { Ionicons } from "@expo/vector-icons";
import PasswordVerificationModal from "../customs/Validations/PasswordVerificationModal";
import { getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";

const Settings = () => {
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePictureURI, setProfilePictureURI] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Function to handle opening the delete account modal
  const onDeleteAccountPressed = () => {
    setDeleteModalVisible(true);
  };
  const auth = getAuth();

  const onLogout = () => {
    auth.signOut();
    const onSignUpPress = () => {
      navigation.navigate("signInScreen");
    };
  };

  const onEditPasswordPressed = () => {
    setShowModal(true);
  };

  // Function to handle closing the password verification modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Delete user data from Firestore
        const userRef = doc(db, "users", user.uid);
        await deleteDoc(userRef);

        // Delete the user from Firebase Auth
        await deleteUser(user);

        console.log("User account and data deleted successfully!");
        // You can perform any additional actions after the account deletion here, such as navigating to a different screen, etc.
      } catch (error) {
        console.error("Error deleting user account:", error);
        // Handle any errors that occur during the account deletion process
      }
    }
  };

  const handleUpdatePassword = async (password) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await user.updatePassword(password);
        console.log("User password updated successfully!");
      } catch (error) {
        console.error("Error updating user password:", error);
        
      }
    }
  };

  // ...

  // Function to handle updating user details
  const onUpdatePressed = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Update user profile in Firebase Auth
        await updateProfile(user, {
         
          photoURL: profilePictureURI ? profilePictureURI.uri : user.photoURL,
        });

        // Checks firstName, lastName, and phoneNumber have valid values
        if (!firstname || !lastname || !phonenumber) {
          console.error("Please fill all required fields.");
          return;
        }

        // Update user details in Firestore using the collection method
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          firstname,
          lastname,
          phonenumber,
        });

        console.log("User profile and details updated successfully!");
      } catch (error) {
        console.error("Error updating user profile and details:", error);
      }
    }
  };

  // Function to handle selecting a new profile picture from the camera roll
  const pickProfilePicture = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        console.log("Camera roll permission not granted!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 100,
      });

      if (!result.canceled) {
        setProfilePictureURI(result.uri); // Set the image URI in the state
      }
    } catch (error) {
      console.error("Error picking profile picture:", error);
    }
  };

  // Use useEffect to handle profile picture selection only once when the component mounts
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData({ ...docSnap.data(), id: docSnap.id }); // Include the document ID in the user data
          setFirstName(docSnap.data().firstname);
          setLastName(docSnap.data().lastname);
          setPhoneNumber(docSnap.data().phonenumber);
          setEmail(docSnap.data().email);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickProfilePicture}>
          {profilePictureURI ? ( 
            <Image
              source={{ uri: profilePictureURI }} 
              style={styles.profilePicture}
            />
          ) : (
            <Image
              source={require("../../assets/images/defaultProfilePicture.png")}
              style={styles.profilePicture}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={onEditPasswordPressed}
        >
          <Text style={styles.buttonText}>Edit Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
          <Ionicons name="log-out-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.personalDetail}>
        <Text style={styles.title}>Personal Details</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phonenumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value="***************"
            editable={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={onUpdatePressed}
            >
              <Text style={styles.buttonText}>Update Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onDeleteAccountPressed}
            >
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Password Verification Modal for Deleting Account */}
      {deleteModalVisible && (
        <PasswordVerificationModal
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onVerify={handleDeleteAccount}
        />
      )}

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileContainer: {
    width: "90%",
    marginTop: "5%",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    paddingVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  editButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    width: "70%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    margin: 2,
    textAlign: "center",
  },
  icon: {
    color: "white",
    marginLeft: 5,
  },
  personalDetail: {
    width: "90%",
    paddingVertical: "5%",
  },
  title: {
    margin: 8,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "45%",
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "green",
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default Settings;
