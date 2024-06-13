const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}

const deposit = () => {

    while(true){

        const depositAmount = prompt("Enter deposit ammount : ");
        const depositAmountNumber = parseFloat(depositAmount);

        if(isNaN(depositAmountNumber) || depositAmountNumber <= 0){
            console.log("Invalid deposit amount. Please enter a valid amount.\n");
        }else{
            return depositAmountNumber;
        }
    }   
}

const getNumberOfLines = () => {

    while(true){

        const lines = prompt("Enter number of lines : ");
        const numberOfLines = parseInt(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number. Please enter a number.\n");
        }else{
            return numberOfLines;
        }
    }

}

const getBet = (balance,lines) => {

    while(true){

        const bet = prompt("Enter number of total bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){
            console.log("Invalid bet. Please enter valid bet.\n");
        }else{
            return numberBet;
        }
    }

}

const spin = () =>{

    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
        
    }
    const reels = [[],[],[]]
    for(let i=0;i<COLS;i++){
        const reelSymbol = [...symbols]
        for(let j = 0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()*reelSymbol.length);
            //const selectedSymbol = reelSymbol[randomIndex]
            reels[i].push(reelSymbol[randomIndex])
            reelSymbol.splice(randomIndex,1)
        }
    }
    
    return reels;

}

const transpose = (reels) =>{
    const rows = [];
    for(let i =0; i<ROWS ; i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    
    return rows;
}

const printRows = (rows) => {

    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString)
    }
}

const winning = (rows,bet,line) => {

    let win  = 0;
    for(let i = 0; i<line;i++){
        const symbols = rows[i]
        let allSame = true;

        for(symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break
            }
        }

        if(allSame){
            win += bet*SYMBOL_VALUE[symbols[0]]
        }
    }
    return win

}

const game = () => {

    let balance = deposit()

    while(true){

        console.log("Your balance = ",balance);

        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance , numberOfLines)
        balance -= bet*numberOfLines

        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)

        const win = winning(rows,bet,numberOfLines)
        balance +=win
        console.log("You win $" , win)

        if(balance <= 0){
            console.log("You ran out money")
            break;
        }

        const playAgain = prompt("You want play again (y/n) :")

        if(playAgain == "n"){
            break
        }

    }   
}

game();

