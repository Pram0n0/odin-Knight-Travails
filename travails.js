console.log("TRAVAILS");

class Node {
    constructor(start, end) {
        if (
            (start[0] >= 0 && start[0] <= 7 && start[1] >= 0 && start[1] <= 7) &&
            (end[0] >= 0 && end[0] <= 7 && end[1] >= 0 && end[1] <= 7)
        ) {
            this.start = start;
            this.end = end;
        } else {
            return null;
        }
    }

    getValidMoves() {
        const moves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        const validMoves = [];
        for (const move of moves) {
            const newX = this.start[0] + move[0];
            const newY = this.start[1] + move[1];

            if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
                validMoves.push([newX, newY]);
            }
        }

        return validMoves;
    }
}

function travails([x,y], [a,b]) {
    const queue = [new Node([x,y],[a,b])];
    const visited = new Set();

    while (queue.length > 0) {
        const currentNode = queue.shift();
        const currentPos = currentNode.start;

        if (currentPos[0] === a && currentPos[1] === b) {
            // Found the destination, construct the path
            const path = [currentPos];
            let traceNode = currentNode;
            while (traceNode.parent) {
                path.unshift(traceNode.parent.start);
                traceNode = traceNode.parent;
            }
            console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
            path.forEach(pos => console.log(pos));
            return path;
        }

        const validMoves = currentNode.getValidMoves();
        for (const move of validMoves) {
            const nextNode = new Node(move, [a, b]);
            if (!visited.has(`${move[0]},${move[1]}`)) {
                nextNode.parent = currentNode;
                queue.push(nextNode);
                visited.add(`${move[0]},${move[1]}`);
            }
        }
    }

    console.log("No valid path found.");
    return null;
}

travails([0, 0], [2, 1]);