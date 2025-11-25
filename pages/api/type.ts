export default class leaf{
    parentWhite:[number,number];
    parentBlack:[number,number];
    postBlack:[number,number];
    postWhite:[number,number];
    valAcum:number;
    currentBoard:(number)[][];
    boolBoard:(boolean)[][];
    depth:number;
    whiteMoves:boolean;
    blackMoves:boolean;
    
  constructor(
    parentWhite: [number, number],
    parentBlack: [number, number],
    postWhite: [number, number],
    postBlack: [number, number],
    valAcum: number,
    currentBoard: (number)[][],
    boolBoard:(boolean)[][],
    depth:number,
    whiteMoves:boolean,
    blackMoves:boolean,
  ) {
    this.parentWhite = parentWhite;
    this.parentBlack = parentBlack;
    this.postWhite = postWhite;
    this.postBlack = postBlack;
    this.valAcum = valAcum;
    this.currentBoard = currentBoard;
    this.depth=depth;
    this.boolBoard=boolBoard;
    this.blackMoves=blackMoves;
    this.whiteMoves=whiteMoves;
  }
}

