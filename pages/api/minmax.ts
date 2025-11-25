import leaf from "./type"
import { getValidMoves } from "./start_game";
type Pos = [number, number];

const knightMoves = [
  [+2, +1], [+2, -1], [-2, +1], [-2, -1],
  [+1, +2], [+1, -2], [-1, +2], [-1, -2]
];
/*  parentWhite:[number,number];
    parentBlack:[number,number];
    postBlack:[number,number];
    postWhite:[number,number];
    valAcum:number;
    currentBoard:number[][];
    boolBoard:boolean[][];
    depth:number;
    whiteMoves:boolean;
    blackMoves:boolean; */
export async function minimax(
    leafIter: leaf,
    depthIter: number
    ): Promise<[number, [number, number]]> {
    if (depthIter < 0 || (!leafIter.blackMoves && !leafIter.whiteMoves)) {
        return [leafIter.valAcum, leafIter.parentBlack];
    }
    if (depthIter % 2 === 0) {
        let best = -Infinity;
        let bestMove: [number, number] = leafIter.parentBlack;
        const totalMoves = getValidMoves(
        leafIter.postBlack,
        leafIter.currentBoard,
        leafIter.boolBoard
        );
        for (const possible of totalMoves) {
        const newBoard = leafIter.currentBoard.map(row => [...row]);
        const newBooleanBoard = leafIter.boolBoard.map(row => [...row]);
        let value = leafIter.valAcum + newBoard[possible[0]][possible[1]];
        newBoard[possible[0]][possible[1]] = 0;
        newBooleanBoard[leafIter.postBlack[0]][leafIter.postBlack[1]] = true;
        const whiteMoves = getValidMoves(
                leafIter.postWhite,
                newBoard,
                newBooleanBoard
        );

            let nextBlackTurn = true;
            let nextWhiteTurn = true;

            if (whiteMoves.length === 0) {
                value -= 4; 
                nextWhiteTurn = false; 
            }
        const child = new leaf(
            leafIter.parentWhite,
            possible,
            leafIter.postWhite,
            possible,
            value,
            newBoard,
            newBooleanBoard,
            depthIter - 1,
            nextWhiteTurn,
            nextBlackTurn
        );
        const [childValue] = await minimax(child, depthIter - 1);
        if (childValue > best) {
            best = childValue;
            bestMove = possible;
        }
        }
        return [best, bestMove];
    }
    else {
        let best = +Infinity;
        let bestMove: [number, number] = leafIter.parentWhite;
        const totalMoves = getValidMoves(
        leafIter.postWhite,
        leafIter.currentBoard,
        leafIter.boolBoard
        );
        for (const possible of totalMoves) {
        const newBoard = leafIter.currentBoard.map(row => [...row]);
        const newBooleanBoard = leafIter.boolBoard.map(row => [...row]);

        let value = leafIter.valAcum - newBoard[possible[0]][possible[1]];

        newBoard[possible[0]][possible[1]] = 0;
        newBooleanBoard[leafIter.postWhite[0]][leafIter.postWhite[1]] = true;
        const blackMoves = getValidMoves(
                leafIter.postWhite,
                newBoard,
                newBooleanBoard
        );
        let nextBlackTurn = true;
        let nextWhiteTurn = true;

        if (blackMoves.length === 0) {
                value -= 4; 
                nextWhiteTurn = false; 
            }
        const child = new leaf(
            possible,
            leafIter.parentBlack,
            possible,
            leafIter.postBlack,
            value,
            newBoard,
            newBooleanBoard,
            depthIter - 1,
            true,
            leafIter.blackMoves
        );

        const [childValue] = await minimax(child, depthIter - 1);

        if (childValue < best) {
            best = childValue;
            bestMove = possible;
        }
        }
        return [best, bestMove];
    }
    }
