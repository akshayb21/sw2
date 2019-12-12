import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { Card, Title } from "react-native-paper";
import axios from 'axios'
import Colors from "../constant/color";
import { ProgressDialog } from 'react-native-simple-dialogs';
import CardComponent from './cardComponent'



function Home() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(new Map());
    const [page, setPage] = useState(1)//PAGE COUNT
    const [dataFetched, setDataFetched] = useState(true)//PROGRESS DIALOG 
    const [scrollLoading, setScrollLoading] = useState(true)//SCROLL LOADER

    useEffect(() => {
        //GET DATA
        axios.get(`https://swapi.co/api/people/?page=${page}`)
            .then(function (response) {
                setData(data.concat(response.data.results))//ADD NEW DATA TO LIST
                setDataFetched(false)//PROGRESS DIALOG OFF
                setScrollLoading(false)//OFF SCROLL LOADING
            })
            .catch(function (error) {
                console.log("axios", error);
                setPage(1)
            });
    }, [page]);//RESTRICT UNNESESARY RERENDER

    const handleLoadMore = () => {
        setPage(page + 1)//NEXTPAGE
        console.log("loadmore")
        setScrollLoading(true)//SHOW LOADER
    }

    function renderFooter() {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!scrollLoading) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000', paddingBottom: 50 }}
            />
        );
    };
    function Item({ id, data, onSelect }) {
        return (
            <CardComponent
                characterData={data}
            />
        );
    }

    return (

        <View style={{ backgroundColor: "gainsboro", paddingBottom: 50 }}>
            <ProgressDialog
                visible={dataFetched}
                title="Progress Dialog"
                message="Please, wait... Star-War is Loading...."
                activityIndicatorColor='#0074C8'
                activityIndicatorSize='large'
            />
            <View style={styles.header}>
                <Title style={styles.title}>Star-War Characters {data.count === null ? 2 : data.count}</Title>
            </View>
            <FlatList

                data={data}
                renderItem={({ item }) => (
                    <Item
                        id={item}
                        title={item.title}
                        data={item}
                        selected={!!selected.get(item.id)}
                    // onSelect={onSelect}

                    />
                )}
                keyExtractor={item => item.name + Math.random()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.00001}
                ListFooterComponent={renderFooter}
            // onScrollBeginDrag={console.log("scroll to")}
            // onMomentumScrollBegin
            />

        </View>
    );
}

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
export default Home