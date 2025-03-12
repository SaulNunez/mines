import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GameState, Square, SquareState } from "../../redux/reducers/state_types";
import { GameAction } from "../../redux/reducers/action_types";
import { Dispatch } from "@reduxjs/toolkit";

const renderItem = ({item}) => {
    if(item.state == SquareState.FLAGGED) {
        return (
            <View>
                <Text>🚩</Text>
            </View>
        );
    } else if (item.state == SquareState.OPENED){
        return (
            <View>
                <Text>Open</Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Click</Text>
            </View>
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