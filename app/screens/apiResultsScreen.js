import { useState } from "react";
import { View, Text, Modal, Image, StyleSheet, FlatList, Pressable, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomLoader from "../customs/CustomLoading/customLoader";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../Data/Firebase'; 
const ResultsScreen = ({ route, navigation }) => {
    const [userId, setUserId] = useState(null);

    const{data} = route.params;
    const[viewItem, setViewItem] = useState(false);
    //const[loading, setLoading] = useState(false);
    const[chosenDetails, setChosenDetails] = useState();
    const{ width } = useWindowDimensions();
    let details;

    const saveDetailsToFirestore = async () => {
        // Get the current timestamp as the date taken
        const dateTaken = Date.now();

        try {
            const docRef = await addDoc(collection(db, 'user_plant_details'), {
                userId: 'ReplaceWithUserId', // You need to replace this with the actual user ID of the currently logged-in user.
                plantName: chosenDetails.name,
                plantData: chosenDetails.plantData,
                images: chosenDetails.images,
                dateTaken: Timestamp,
            });

            console.log('Document written with ID: ', docRef.id);
            // You can perform any additional actions after the details are saved here.
        } catch (error) {
            console.error('Error adding document: ', error);
            // Handle any errors that occur during the saving process
        }
    };

    return(
        
    <View style={{flex: 1, marginTop: 40}}>  
        {!viewItem ? (<View>
        <Text style={{marginLeft:"auto", marginRight:"auto", fontSize:18}}>Possible Suggestions</Text>     
        <FlatList 
          data={data}
          renderItem={({item}) => (
            <Pressable onPress={() => {            
                setChosenDetails({plantData: item.plant_details, name: item.plant_name, images: item.similar_images})
                details = {plantData: item.plant_details, name: item.plant_name, images: item.similar_images};
                //console.log(details.images);
                setViewItem(true);
            }} 
            style={myStyles.container}>
             <Image source={{ uri: item.similar_images[0].url }} style={myStyles.image} /> 

              <View style={myStyles.textStyle}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>{item.plant_name}</Text>
                <Text >{item.probability}</Text>
              </View>             
            </Pressable>
          )}
        />
        </View>) : (<View>
            <ScrollView>
               <FlatList 
               data={chosenDetails.images}
               renderItem={({img}) => (
                    <Image source={{ uri: img }} style={{width, height: 290, aspectRatio: 1, marginLeft: "auto", marginRight: "auto", borderRadius: 8,}} />
                    
               )}
                   horizontal
                   showsHorizontalScrollIndicator={false} 
                   pagingEnabled
               />
                {/* <Image source={{ uri: chosenDetails.images[0].url }} style={{width, height: 290, aspectRatio: 1, marginLeft: "auto", marginRight: "auto", borderRadius: 8,}} /> */}

                <View style={{margin: 10}}>
                    <Text style={{fontSize: 19, color: "green"}}>{chosenDetails.name}</Text>
                    <Text>{chosenDetails.plantData.wiki_description.value}</Text>
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <CustomButton text="save" onPress={saveDetailsToFirestore} />
                    <CustomButton text="discard" />
                </View>
            </ScrollView>
        </View>)}
    </View>
    )
}

const myStyles = StyleSheet.create({
    //style for the first main list
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    container: {
        width: '90%',
        display: 'flex',
        backgroundColor: '#FFFFFF',
        marginTop: '1%',
        marginLeft: 'auto',
        marginRight:'auto',
        borderRadius: 8,
        padding: '2%',
        flexDirection: 'row',       
    },
    textStyle: {
        justifyContent: 'center',
        marginLeft: '10%',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'green',
        fontWeight: '500',
    }

    //style for a specific selected plant
})

export default ResultsScreen; 