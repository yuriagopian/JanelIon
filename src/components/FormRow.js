import React from 'react' ;
import {StyleSheet, View} from 'react-native';




const FormRow = props  => {
    const { children }  = props;
    return (
        <View  style= {styles.container}> 
            { children }
        
        </View>
    

)};

const styles = StyleSheet.create({
    container:{
        padding: 2 ,
        backgroundColor: 'white',
        marginTop: 2,
        marginBottom: 2,
        elevation:1, 
          
            },

});

export default FormRow;