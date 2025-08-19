import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign,MaterialIcons} from '@expo/vector-icons'

export default function ItemLoja(){
    return(
        <View style={styles.container}>
            <Pressable>
                <AntDesign name="checkcircleo" color='black' size={24}/>
            </Pressable>
            <Text style={styles.title}>Mouse Gamer</Text>
            <Pressable>
                <MaterialIcons name="delete" size={24} color='black'/>
            </Pressable>
        </View>
    )
} 

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'lightgray',
        justifyContent:'space-between',
        alignItems:"center",
        padding:10,
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        marginTop:5
    },
    title:{
        flex:1,
        backgroundColor:'orange',
        marginLeft:20,
        fontSize:17,
        fontWeight:800
    }
})