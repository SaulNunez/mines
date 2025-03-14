import React, { useEffect } from "react";
import { FlatList, View, Text, Pressable, StyleSheet, Button, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CurrentGameState, GameState, Square, SquareState } from "../../redux/reducers/state_types";
import { GameAction } from "../../redux/reducers/action_types";
import { Dispatch } from "@reduxjs/toolkit";
import useSound from "./UseSound";

export default function Mines(){
    const gridSize = useSelector<GameState, number>((state) => state.gridSize);
    const gameState = useSelector<GameState, CurrentGameState>((state) => state.gameState);
    const grid = useSelector<GameState, Square[]>((state) => state.board.flat());
    const dispatch = useDispatch<Dispatch<GameAction>>();

    const {width, height} =  Dimensions.get('window');
    const minSize = Math.min(width, height);
    const itemSize = (0.6 * minSize) / gridSize;

    //const playBombExplosion = useSound("./assets/760509__samsterbirdies__astronomical-explosion.mp3");
    //const playWin = useSound("./assets/270402__littlerobotsoundfactory__jingle_win_00.mp3");

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

    const gameStateEmoji = (state: CurrentGameState) => {
        switch(state){
            case CurrentGameState.LOST:
                return '😔';
            case CurrentGameState.WON:
                return '🤩';
            case CurrentGameState.WIP:
                return '🙂';
        }
    }

    useEffect(() => {
        dispatch({type: 'NEW_GAME', board_size: 9});
    }, []);

    useEffect(() => {
        if(gameState === CurrentGameState.LOST){
            //playBombExplosion();
        }
        if(gameState === CurrentGameState.WON){
            //playWin();
        }
    }, [gameState]);

    return (
        <View>
        <Pressable
            onPress={() => {
                dispatch({type: 'NEW_GAME', board_size: gridSize});
            }}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>New Game</Text>
                </View>
            </Pressable>
        <Text style={[styles.face, styles.itemDisabled]}>{gameStateEmoji(gameState)}</Text>
        <FlatList
            data={grid} 
            numColumns={9}
            renderItem={({item}) => {        
                return (
                    <Pressable 
                        disabled={item.state === SquareState.OPENED || gameState !== CurrentGameState.WIP}
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
            contentContainerStyle={styles.contentContainer}
            columnWrapperStyle={styles.columnWrapper}
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
        justifyContent: "center",
        alignItems: "center",
    },
    itemDisabled: {
        margin: 10,
        borderRadius: 16,
        backgroundColor: '#dddddd',
        justifyContent: "center",
        alignItems: "center",
    },
    face: {
        textAlign: 'center',
        fontSize: 32,
        alignSelf: 'center',
        padding: 8
    },
    text: {
        textAlign: 'center',
        fontSize: 19,
        color: '#4b4b4b',
        fontWeight: 'bold'
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "center", // Center items vertically when content is smaller than screen
        alignItems: "center", // Center items horizontally
      },
    columnWrapper: {
        justifyContent: "center", // Center items in each row
    },
    button: {
        backgroundColor: '#1CB0F6',
        borderStyle: 'solid',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#1899D6',
        borderBottomWidth: 6,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        textTransform: 'uppercase'
    },
  });