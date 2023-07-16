import { deepClone2DArray } from "./helper";

// Checks if the board is in a terminal state
function isTerminal(s) {
    // Check for a horizontal match
    for (let i = 0; i < 3; i++) {
        if (s.board[i][0] !== '' && s.board[i][0] === s.board[i][1] && s.board[i][0] === s.board[i][2]) {
            return s.board[i][0]
        }
    }

    // Check for a vertical match
    for (let j = 0; j < 3; j++) {
        if (s.board[0][j] !== '' && s.board[0][j] === s.board[1][j] && s.board[0][j] === s.board[2][j]) {
            return s.board[0][j]
        }
    }

    // Check for a diagonal match
    if (s.board[0][0] !== '' && s.board[0][0] === s.board[1][1] && s.board[0][0] === s.board[2][2]) {
        return s.board[0][0]
    }
    if (s.board[0][2] !== '' && s.board[0][2] === s.board[1][1] && s.board[0][2] === s.board[2][0]) {
        return s.board[0][2]
    }

    let filled = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            filled += Number(s.board[i][j] !== '')
        }
    }

    if (filled === 9) { // draw
        return '-'
    }
    
    return null
}

// Returns the current value of the state s to a player p
function utility(s) {
    let winner = isTerminal(s)
    if (winner === 'X' && s.type === 'max')
        return [null, -1]
    if (winner === 'O' && s.type === 'min')
        return [null, 1]
    return [null, 0]
}

// Returns the action with the corresponding min/max value based on the current state
function value(s) {
    if (isTerminal(s))
        return utility(s)
    if (s.type === 'max')
        return maxValue(s)
    if (s.type === 'min')
        return minValue(s)
}

// Returns the action and the corresponding min value based on the current state
function minValue(s) {
    let m = Infinity
    let action = null
    for (const [a, s1] of successors(s)) {
        const [_, v] = value(s1)
        // if v is less than current min, we pick that action
        if (v < m)
            action = a
        m = Math.min(m, v)
    }

    return [action, m]
}

// Returns the action and the corresponding max value based on the current state
function maxValue(s) {
    let m = -Infinity
    let action = null
    for (const [a, s1] of successors(s)) {
        const [_, v] = value(s1)
        // if v is greater than current max, we pick that action
        if (v > m)
            action = a
        m = Math.max(m, v)
    }
    return [action, m]
}

function successors(s) {
    const items = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (s.board[i][j] === '') {
                const s1 = {
                    board: deepClone2DArray(s.board)
                }
                if (s.type === 'min') {
                    s1.type = 'max'
                    s1.board[i][j] = 'X'
                } else {
                    s1.type = 'min'
                    s1.board[i][j] = 'O'
                }
                items.push([[i,j], s1])
            }
        }
    }

    return items
}
  
export default value;