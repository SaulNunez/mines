import React, { useEffect } from "react";
import { FlatList, View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GameState, Square, SquareState } from "../../redux/reducers/state_types";
import { GameAction } from "../../redux/reducers/action_types";
import { Dispatch } from "@reduxjs/toolkit";

export default function Mines(){
    const gridSize = useSelector<GameState, number>((state) => state.gridSize);
    const gameEnded = useSelector<GameState, boolean>((state) => state.gameEnded);
    const grid = useSelector<GameState, Square[]>((state) => state.board.flat());
    const dispatch = useDispatch<Dispatch<GameAction>>();

    const itemContent = (item: Square) => {
        if(item.state == SquareState.FLAGGED){
            return "🚩";
        }
        if(item.state == SquareState.OPENED && item.hasMine){
            return "💣";
        }
        if(item.state == SquareState.OPENED && item.nearMines > 0){
            return item.nearMines;
        }
        return "";
    }

    useEffect(() => {
        dispatch({type: 'NEW_GAME', board_size: 9});
    }, []);

    return (
        <View>
        <Text style={styles.face}>{gameEnded? '😔' : '🙂'}</Text>
        <FlatList
            data={grid} 
            numColumns={9}
            renderItem={({item}) => {
                const itemSize = 64;
        
                return (
                    <Pressable 
                        disabled={item.state === SquareState.OPENED}
                        onLongPress={() => {
                            if(item.state == SquareState.FLAGGED){
                                dispatch({ type: 'UNFLAG', index_x: item.x, index_y: item.y });
                            } else {
                                dispatch({ type: 'FLAG', index_x: item.x, index_y: item.y });
                            }
                            
                        }}
                        onPress={() => {
                            if(item.state == SquareState.FLAGGED) return;
                            dispatch({ type: 'CLICK', index_x: item.x, index_y: item.y });
                        }}>
                        <View style={[item.state === SquareState.OPENED? styles.itemDisabled : styles.item, 
                            { width: itemSize, height: itemSize }]}>
                            <Text style={styles.text}>{itemContent(item)}</Text>
                        </View>
                    </Pressable>
        
                );
            }}
            scrollEnabled={false}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderRadius: 16,
        borderColor: '#e5e5e5',
        borderStyle: 'solid',
        borderWidth: 2,
        borderBottomWidth: 6,
        borderBottomColor: '#e5e5e5',
        margin: 10,
        alignItems: 'stretch'
    },
    itemDisabled: {
        margin: 10,
        borderRadius: 16,
        backgroundColor: '#dddddd',
        alignItems: 'stretch'
    },
    face: {
        textAlign: 'center',
        fontSize: 32,
    },
    text: {
        textAlign: 'center',
        fontSize: 19,
        color: '#4b4b4b',
        fontWeight: 'bold'
    },
  });