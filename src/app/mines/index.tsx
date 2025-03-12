import React, { useEffect } from "react";
import { FlatList, View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GameState, Square, SquareState } from "../../redux/reducers/state_types";
import { GameAction } from "../../redux/reducers/action_types";
import { Dispatch } from "@reduxjs/toolkit";

const renderItem = ({item}) => {
    const itemSize = 32;
    if(item.state == SquareState.FLAGGED) {
        return (
            <Pressable>
                <View style={[styles.item, { width: itemSize, height: itemSize }]}>
                    <Text>🚩</Text>
                </View>
            </Pressable>

        );
    } else if (item.state == SquareState.OPENED){
        return (
            <Pressable>
                <View style={[styles.item, { width: itemSize, height: itemSize }]}>
                    <Text>Open</Text>
                </View>
            </Pressable>
        );
    } else {
        return (
            <Pressable>
                <View style={[styles.item, { width: itemSize, height: itemSize }]}>
                    {item.hasMine? <Text>💣</Text> : <Text>{item.nearMines}</Text>}
                </View>
            </Pressable>
        );
    }
}

export default function Mines(){
    const gridSize = useSelector<GameState, number>((state) => state.gridSize);
    const grid = useSelector<GameState, Square[]>((state) => state.board.flat());
    const dispatch = useDispatch<Dispatch<GameAction>>();
    
    useEffect(() => {
        dispatch({type: 'NEW_GAME', board_size: 9});
    }, []);

    return (
        <FlatList
            data={grid} 
            numColumns={9}
            renderItem={renderItem}
            scrollEnabled={false}
        />
    );
}

const styles = StyleSheet.create({
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      margin: 2,
    },
    text: {
      color: 'white',
      fontSize: 18,
    },
  });