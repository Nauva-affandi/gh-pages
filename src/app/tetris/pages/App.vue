<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white"
  >
    <h1
      class="mb-6 text-center text-4xl font-bold tracking-wider text-teal-400"
    >
      TETRIS
    </h1>

    <div class="flex flex-col items-center gap-8 md:flex-row">
      <!-- Game Board -->
      <div
        class="relative overflow-hidden rounded-lg border-4 border-gray-700 bg-gray-800 shadow-lg"
      >
        <div
          v-if="gameState.gameOver"
          class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-80 p-4"
        >
          <h2 class="mb-4 text-4xl font-bold text-red-500">Game Over</h2>
          <p class="mb-4 text-xl">Score: {{ gameState.score }}</p>
          <button
            @click="game.resetGame()"
            class="rounded-lg bg-teal-500 px-6 py-3 font-bold transition duration-200 hover:bg-teal-600"
          >
            Mulai Lagi
          </button>
        </div>

        <div
          v-if="!gameState.gameStarted"
          class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-80 p-4"
        >
          <h2 class="mb-4 text-4xl font-bold text-teal-400">Tetris</h2>
          <p class="mb-6 text-center text-xl">Siap untuk bermain?</p>
          <button
            @click="game.startGame()"
            class="rounded-lg bg-teal-500 px-6 py-3 font-bold transition duration-200 hover:bg-teal-600"
          >
            Mulai Game
          </button>
        </div>

        <div class="grid grid-cols-10 gap-0">
          <div
            v-for="(cell, index) in boardWithCurrentPiece"
            :key="index"
            :class="[
              'h-6 w-6 border border-gray-700 sm:h-8 sm:w-8',
              cell ? `bg-${game.getColor(cell)}` : 'bg-gray-900',
            ]"
          ></div>
        </div>
      </div>

      <!-- Game Controls & Info -->
      <div class="flex flex-col gap-6">
        <div class="rounded-lg bg-gray-800 p-4">
          <p class="mb-1 text-xl font-bold">Score:</p>
          <p class="text-3xl font-bold text-teal-400">{{ gameState.score }}</p>
        </div>

        <div class="rounded-lg bg-gray-800 p-4">
          <p class="mb-2 text-xl font-bold">Next Piece:</p>
          <div class="grid h-32 w-32 grid-cols-4 gap-1 rounded bg-gray-900 p-2">
            <div
              v-for="(cell, index) in nextPieceDisplay"
              :key="`next-${index}`"
              :class="[
                'h-6 w-6 rounded',
                cell ? `bg-${game.getColor(cell)}` : 'bg-transparent',
              ]"
            ></div>
          </div>
        </div>

        <div class="rounded-lg bg-gray-800 p-4">
          <p class="mb-2 text-xl font-bold">Controls:</p>
          <div class="mb-4 grid grid-cols-3 gap-2">
            <div></div>
            <button
              @click="game.movePiece(0, -1)"
              class="rounded bg-gray-700 p-2 hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <div></div>

            <button
              @click="game.movePiece(-1, 0)"
              class="rounded bg-gray-700 p-2 hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              @click="game.dropPiece()"
              class="rounded bg-gray-700 p-2 hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              @click="game.movePiece(1, 0)"
              class="rounded bg-gray-700 p-2 hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div class="flex justify-center gap-4">
            <button
              @click="game.rotatePiece('left')"
              class="rounded-lg bg-teal-600 px-4 py-2 hover:bg-teal-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              @click="game.rotatePiece('right')"
              class="rounded-lg bg-teal-600 px-4 py-2 hover:bg-teal-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-8c-1.11 0-2.08.402-2.599 1M12 8V7m0 1v8m0 0v1m0-1c1.11 0 2.08-.402 2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          v-if="gameState.gameStarted && !gameState.gameOver"
          @click="game.pauseGame()"
          class="rounded-lg bg-yellow-600 px-4 py-2 font-bold hover:bg-yellow-700"
        >
          {{ gameState.isPaused ? "Lanjutkan" : "Pause" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

// Classes using OOP principles
class TetrisPiece {
  constructor(shape, color) {
    this.shape = shape.map((row) => [...row]);
    this.color = color;
  }

  clone() {
    return new TetrisPiece(this.shape, this.color);
  }

  rotate(direction) {
    const size = this.shape.length;
    const newShape = Array(size)
      .fill()
      .map(() => Array(size).fill(0));

    if (direction === "right") {
      // Rotate 90 degrees clockwise
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          newShape[x][size - 1 - y] = this.shape[y][x];
        }
      }
    } else {
      // Rotate 90 degrees counterclockwise
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          newShape[size - 1 - x][y] = this.shape[y][x];
        }
      }
    }

    this.shape = newShape;
    return this;
  }
}

class TetrisGame {
  constructor(boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.gameState = reactive({
      board: [],
      currentPiece: null,
      currentPosition: { x: 0, y: 0 },
      nextPiece: null,
      score: 0,
      gameOver: false,
      gameStarted: false,
      isPaused: false,
      speed: 450, // milliseconds
    });

    this.gameInterval = null;
    this.pieces = this.definePieces();
    this.keyMappings = {
      ArrowLeft: () => this.movePiece(-1, 0),
      ArrowRight: () => this.movePiece(1, 0),
      ArrowDown: () => this.movePiece(0, 1),
      ArrowUp: () => this.rotatePiece("right"),
      z: () => this.rotatePiece("left"),
      x: () => this.rotatePiece("right"),
      " ": () => this.dropPiece(),
      p: () => this.pauseGame(),
    };

    this.initBoard();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  definePieces() {
    return [
      {
        // I piece
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        color: 1, // cyan
      },
      {
        // J piece
        shape: [
          [2, 0, 0],
          [2, 2, 2],
          [0, 0, 0],
        ],
        color: 2, // blue
      },
      {
        // L piece
        shape: [
          [0, 0, 3],
          [3, 3, 3],
          [0, 0, 0],
        ],
        color: 3, // orange
      },
      {
        // O piece
        shape: [
          [4, 4],
          [4, 4],
        ],
        color: 4, // yellow
      },
      {
        // S piece
        shape: [
          [0, 5, 5],
          [5, 5, 0],
          [0, 0, 0],
        ],
        color: 5, // green
      },
      {
        // T piece
        shape: [
          [0, 6, 0],
          [6, 6, 6],
          [0, 0, 0],
        ],
        color: 6, // purple
      },
      {
        // Z piece
        shape: [
          [7, 7, 0],
          [0, 7, 7],
          [0, 0, 0],
        ],
        color: 7, // red
      },
    ];
  }

  initBoard() {
    this.gameState.board = Array(this.boardHeight)
      .fill()
      .map(() => Array(this.boardWidth).fill(0));
    this.gameState.score = 0;
    this.gameState.gameOver = false;
  }

  getRandomPiece() {
    const index = Math.floor(Math.random() * this.pieces.length);
    const piece = this.pieces[index];
    return new TetrisPiece(piece.shape, piece.color);
  }

  startGame() {
    this.initBoard();
    this.gameState.gameStarted = true;
    this.gameState.isPaused = false;
    this.gameState.nextPiece = this.getRandomPiece();
    this.spawnNewPiece();
    this.setupGameInterval();
    window.addEventListener("keydown", this.handleKeyPress);
  }

  resetGame() {
    clearInterval(this.gameInterval);
    this.startGame();
  }

  pauseGame() {
    this.gameState.isPaused = !this.gameState.isPaused;
    if (this.gameState.isPaused) {
      clearInterval(this.gameInterval);
    } else {
      this.setupGameInterval();
    }
  }

  setupGameInterval() {
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => {
      if (!this.gameState.isPaused) {
        this.tick();
      }
    }, this.gameState.speed);
  }

  spawnNewPiece() {
    this.gameState.currentPiece = this.gameState.nextPiece;
    this.gameState.nextPiece = this.getRandomPiece();

    // Position the piece at the top center of the board
    const pieceWidth = this.gameState.currentPiece.shape[0].length;
    this.gameState.currentPosition = {
      x: Math.floor((this.boardWidth - pieceWidth) / 2),
      y: 0,
    };

    // Check if the piece can be placed (game over condition)
    if (
      !this.isValidPosition(
        this.gameState.currentPosition.x,
        this.gameState.currentPosition.y,
        this.gameState.currentPiece.shape,
      )
    ) {
      this.gameState.gameOver = true;
      clearInterval(this.gameInterval);
      window.removeEventListener("keydown", this.handleKeyPress);
    }
  }

  tick() {
    if (!this.movePiece(0, 1)) {
      // If the piece can't move down further, lock it in place
      this.lockPiece();
      this.clearLines();
      this.spawnNewPiece();

      // Increase speed every 5 levels
      const level = Math.floor(this.gameState.score / 1000);
      if (level > 0 && level % 5 === 0) {
        this.gameState.speed = Math.max(100, this.gameState.speed - 50);
        this.setupGameInterval();
      }
    }
  }

  isValidPosition(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const boardX = x + col;
          const boardY = y + row;

          // Check if out of bounds
          if (
            boardX < 0 ||
            boardX >= this.boardWidth ||
            boardY >= this.boardHeight
          ) {
            return false;
          }

          // Check if position already occupied (ignore if above the board)
          if (boardY >= 0 && this.gameState.board[boardY][boardX] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  movePiece(deltaX, deltaY) {
    const newX = this.gameState.currentPosition.x + deltaX;
    const newY = this.gameState.currentPosition.y + deltaY;

    if (this.isValidPosition(newX, newY, this.gameState.currentPiece.shape)) {
      this.gameState.currentPosition.x = newX;
      this.gameState.currentPosition.y = newY;
      return true;
    }
    return false;
  }

  rotatePiece(direction) {
    if (!this.gameState.currentPiece) return;

    // Create a temporary rotated piece
    const rotatedPiece = this.gameState.currentPiece.clone().rotate(direction);

    // Try the rotation
    if (
      this.isValidPosition(
        this.gameState.currentPosition.x,
        this.gameState.currentPosition.y,
        rotatedPiece.shape,
      )
    ) {
      this.gameState.currentPiece = rotatedPiece;
    } else {
      // Wall kick algorithm - try shifting the piece to make the rotation fit
      const kicks = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 2, y: 0 },
        { x: -2, y: 0 },
      ];

      for (const kick of kicks) {
        const kickX = this.gameState.currentPosition.x + kick.x;
        const kickY = this.gameState.currentPosition.y + kick.y;

        if (this.isValidPosition(kickX, kickY, rotatedPiece.shape)) {
          this.gameState.currentPosition.x = kickX;
          this.gameState.currentPosition.y = kickY;
          this.gameState.currentPiece = rotatedPiece;
          break;
        }
      }
    }
  }

  lockPiece() {
    if (!this.gameState.currentPiece) return;

    this.gameState.currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          const boardY = y + this.gameState.currentPosition.y;
          const boardX = x + this.gameState.currentPosition.x;

          if (
            boardY >= 0 &&
            boardY < this.boardHeight &&
            boardX >= 0 &&
            boardX < this.boardWidth
          ) {
            this.gameState.board[boardY][boardX] = cell;
          }
        }
      });
    });
  }

  clearLines() {
    let linesCleared = 0;

    for (let y = this.boardHeight - 1; y >= 0; y--) {
      if (this.gameState.board[y].every((cell) => cell !== 0)) {
        // Remove the line
        this.gameState.board.splice(y, 1);
        // Add empty line at the top
        this.gameState.board.unshift(Array(this.boardWidth).fill(0));
        linesCleared++;
        y++; // Re-check the same row
      }
    }

    // Score points based on lines cleared
    if (linesCleared > 0) {
      // Standard scoring system: 100, 300, 500, 800 for 1, 2, 3, 4 lines
      const points = [0, 100, 300, 500, 800];
      this.gameState.score += points[linesCleared] || 800;
    }
  }

  dropPiece() {
    while (this.movePiece(0, 1)) {
      // Keep moving down until it can't anymore
    }
    this.lockPiece();
    this.clearLines();
    this.spawnNewPiece();
    this.gameState.score += 20; // Bonus for hard drop
  }

  handleKeyPress(event) {
    if (this.gameState.gameOver || !this.gameState.gameStarted) return;

    const action = this.keyMappings[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  getColor(cellValue) {
    const colors = [
      "gray-900", // Empty
      "cyan-500", // I piece
      "blue-500", // J piece
      "orange-500", // L piece
      "yellow-500", // O piece
      "green-500", // S piece
      "purple-500", // T piece
      "red-500", // Z piece
    ];

    return colors[cellValue] || "gray-900";
  }

  cleanup() {
    clearInterval(this.gameInterval);
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  getBoardWithCurrentPiece() {
    if (!this.gameState.currentPiece || this.gameState.gameOver) {
      return [...this.gameState.board.flat()];
    }

    // Create a copy of the board
    const boardCopy = this.gameState.board.map((row) => [...row]);

    // Add current piece to the board
    this.gameState.currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          const boardY = y + this.gameState.currentPosition.y;
          const boardX = x + this.gameState.currentPosition.x;

          if (
            boardY >= 0 &&
            boardY < this.boardHeight &&
            boardX >= 0 &&
            boardX < this.boardWidth
          ) {
            boardCopy[boardY][boardX] = cell;
          }
        }
      });
    });

    // Flatten the 2D array to 1D for easy rendering
    return boardCopy.flat();
  }

  getNextPieceDisplay() {
    if (!this.gameState.nextPiece) return Array(16).fill(0);

    const result = Array(16).fill(0);
    const shape = this.gameState.nextPiece.shape;

    // Center the piece in the 4x4 display
    shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          const index = y * 4 + x;
          if (index >= 0 && index < 16) {
            result[index] = cell;
          }
        }
      });
    });

    return result;
  }
}

// Create game instance
const game = new TetrisGame(10, 20);
const gameState = game.gameState;

// Computed properties
const boardWithCurrentPiece = computed(() => game.getBoardWithCurrentPiece());
const nextPieceDisplay = computed(() => game.getNextPieceDisplay());

// Lifecycle hooks
onMounted(() => {
  game.initBoard();
});

onUnmounted(() => {
  game.cleanup();
});
</script>

<style>
/* Custom styles */
@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.line-clear {
  animation: flash 0.3s linear 3;
}

/* Tailwind CSS classes are applied directly in the template */
</style>
