import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Feather, AntDesign, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Card, Paragraph } from "react-native-paper";

import Colors from "../constant/color";

function CardComponent(props) {
    const [modal, setModal] = useState(false);//MODAL ON/OFF
    const [personData, setPersonData] = useState({})//USER SPECIFIC DATA

    const onSelect = (data) => {
        console.log("select")
        setPersonData(data)//SET DATA
        setModal(true)//MODAL VISIBAL
    }
    const onCloseIcon = () => {
        setModal(false)//CLOSE MODAL
        
    }

    console.log(props)
    return (
        <TouchableOpacity
            onPress={() => onSelect(props.characterData)}
        >
            <Card style={styles.container}>
                <View style={styles.headerOne}>
                    <Text style={styles.titleOne}>{props.characterData.name}</Text>
                    <Text style={styles.liteText}>{props.characterData.created === undefined ? " NA" : props.characterData.created.slice(0, 10)}</Text>
                </View>

                <View style={styles.headerOne}>
                    <Text style={styles.liteText}>
                        <MaterialCommunityIcons name="eye" size={18} color={Colors.accent} />
                        {`  ${props.characterData.eye_color}`}
                    </Text>
                    <Text style={styles.liteText}>
                        Gender
                {props.characterData.gender === 'male' ?
                            <MaterialCommunityIcons name="gender-male" size={18} color={Colors.accent} /> :
                            props.characterData.gender === 'n/a' ? "NA" : <MaterialCommunityIcons name="gender-female" size={18} color={Colors.accent} />}
                    </Text>
                </View>


                <View style={styles.headerOne}>

                    <Text style={styles.liteText}>
                        <FontAwesome name="birthday-cake" size={18} color={Colors.accent} />
                        {`  ${props.characterData.birth_year}`}
                    </Text>
                </View>
            </Card>
            <Modal animationType={"slide"} onRequestClose={() => { setModal(false) }}
                visible={modal}
                transparent={true}
            >
                <Card style={styles.containerModal}>
                    <View style={{ marginBottom: -25 }}>
                        <MaterialCommunityIcons onPress={onCloseIcon} name="close-circle-outline" size={25} color={Colors.accent} />
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.title}>{personData.name}</Text>
                        <Text style={styles.liteText}>{personData.created === undefined ? " NA" : personData.created.slice(0, 10)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            <MaterialCommunityIcons name="eye" size={18} color={Colors.accent} />
                            {`  ${personData.eye_color}`}
                        </Text>
                        <Text style={styles.liteText}>
                            Gender
                                {personData.gender === 'male' ?
                                <MaterialCommunityIcons name="gender-male" size={18} color={Colors.accent} /> :
                                personData.gender === 'n/a' ? " NA" : <MaterialCommunityIcons name="gender-female" size={18} color={Colors.accent} />}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            <FontAwesome name="birthday-cake" size={18} color={Colors.accent} />
                            {`  ${personData.birth_year}`}
                        </Text>
                        <Text style={styles.liteText}>
                            <MaterialCommunityIcons name="home" size={18} color={Colors.accent} />
                            {`  ${personData.homeworld}`}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            height:  {`  ${personData.height}`}
                        </Text><Text style={styles.liteText}>
                            skin_color:  {`  ${personData.skin_color}`}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            hair_color:  {`  ${personData.hair_color}`}
                        </Text>
                        <Text style={styles.liteText}>
                            mass:  {`  ${personData.mass}`}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            species:  {`  ${personData.species}`}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            <MaterialCommunityIcons name="car" size={18} color={Colors.accent} />
                            {`  ${personData.vehicles === undefined || personData.vehicles.length === 0 ? " NA" : personData.vehicles}`}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            <MaterialCommunityIcons name="ship-wheel" size={18} color={Colors.accent} />
                            {`  ${personData.starships === undefined || personData.starships.length === 0 ? " NA" : personData.starships}`}
                        </Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.liteText}>
                            <MaterialCommunityIcons name="filmstrip" size={18} color={Colors.accent} />
                            {`  ${personData.films === undefined || personData.films.length === 0 ? " NA" : personData.films}`}
                        </Text>
                    </View>
                </Card>
            </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 30,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 30,
        color: "#6F00F8",
        // color:'royalblue',
        //marginTop: -13
    },
    container: {
        padding: 15,
        margin: 20,
    },
    containerModal: {
        padding: 15,
        margin: 20,
        height: "95%",
        width: "90%",
        backgroundColor: "white"
    },
    headerOne: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6
    },
    titleOne: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.primary
    },
    liteText: {
        color: Colors.liteGrey
    }
});

export default CardComponent;
