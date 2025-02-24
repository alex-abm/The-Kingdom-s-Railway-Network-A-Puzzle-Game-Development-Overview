const state = {
  difficulty: null,
  size: 5,
  timer: null,
  time: 0,
  rotation: 0,
};

const TILES = {
  EMPTY: 'empty',
  MOUNTAIN: 'mountain',
  WATER: 'water',
  BRIDGE: 'bridge',
  MOUNTAIN_RAIL: 'mountain-rail',
  BRIDGE_RAIL: 'bridge-rail'
};

const maps = {
  '5x5': [
    [
      ['empty', 'mountain', 'empty', 'empty', 'water'],
      ['empty', 'empty', 'empty', 'bridge', 'water'],
      ['bridge', 'empty', 'mountain', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'water', 'empty'],
      ['empty', 'empty', 'mountain', 'empty', 'empty']
    ],
    [
      ['water', 'empty', 'bridge', 'empty', 'empty'],
      ['empty', 'mountain', 'empty', 'empty', 'mountain'],
      ['bridge', 'water', 'mountain', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'water', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty']
    ]
  ],
  '5x5-rotations': [
    [
      [0, 90, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 180, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 270, 0, 0]
    ],
    [
      [0, 0, 90, 0, 0],
      [0, 180, 0, 0, 180],
      [0, 0, 270, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  ],
  '7x7': [
    [
      ['empty', 'mountain', 'water', 'water', 'empty', 'bridge', 'empty'],
      ['bridge', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'bridge', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'mountain', 'empty', 'empty', 'empty'],
      ['mountain', 'empty', 'mountain', 'empty', 'bridge', 'empty', 'water'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'bridge', 'empty', 'empty', 'empty']
    ],
    [
      ['empty', 'empty', 'water', 'empty', 'empty', 'empty', 'empty'],
      ['bridge', 'empty', 'bridge', 'empty', 'empty', 'mountain', 'empty'],
      ['empty', 'empty', 'bridge', 'empty', 'empty', 'empty', 'bridge'],
      ['mountain', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'water', 'empty', 'mountain', 'empty', 'empty', 'empty'],
      ['empty', 'mountain', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'water', 'empty', 'empty', 'empty', 'empty']
    ]
  ],
  '7x7-rotations': [
    [
      [0, 90, 0, 0, 0, 90, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 270, 0, 0, 0],
      [270, 0, 90, 0, 90, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 90, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 90, 0, 0, 180, 0],
      [0, 0, 90, 0, 0, 0, 0],
      [360, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 90, 0, 0, 0],
      [0, 360, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
  ]
};

const solutions = {
  '5x5': [
    [
      ['turn', 'mountain-rail', 'turn', 'turn', 'water'],
      ['straight', 'straight', 'straight', 'bridge-rail', 'water'],
      ['bridge-rail', 'turn', 'mountain-rail', 'turn', 'turn'],
      ['straight', 'turn', 'turn', 'water', 'straight'],
      ['turn', 'turn', 'mountain-rail', 'straight', 'turn']
    ],
    [
      ['water', 'turn', 'bridge-rail', 'straight', 'turn'],
      ['turn', 'mountain-rail', 'turn', 'straight', 'mountain-rail'],
      ['bridge-rail', 'water', 'mountain-rail', 'straight', 'turn'],
      ['straight', 'turn', 'turn', 'water', 'straight'],
      ['turn', 'turn', 'turn', 'straight', 'turn']
    ]
  ],
  '7x7': [
    [
      ['turn', 'mountain-rail', 'water', 'water', 'turn', 'bridge-rail', 'turn'],
      ['bridge-rail', 'straight', 'turn', 'turn', 'straight', 'turn', 'turn'],
      ['straight', 'straight', 'bridge-rail', 'straight', 'straight', 'turn', 'turn'],
      ['straight', 'turn', 'turn', 'mountain-rail', 'turn', 'turn', 'turn'],
      ['mountain-rail', 'straight', 'mountain-rail', 'turn', 'bridge-rail', 'turn', 'water'],
      ['turn', 'straight', 'turn', 'turn', 'straight', 'straight', 'turn'],
      ['turn', 'straight', 'straight', 'bridge-rail', 'straight', 'straight', 'turn']
    ],
    [
      ['turn', 'turn', 'water', 'turn', 'turn', 'turn', 'turn'],
      ['bridge-rail', 'turn', 'bridge-rail', 'turn', 'turn', 'mountain-rail', 'straight'],
      ['turn', 'straight-', 'bridge-rail', 'straight', 'straight', 'turn', 'bridge-rail'],
      ['mountain-rail', 'straight', 'straight', 'straight', 'straight', 'turn', 'straight'],
      ['straight', 'water', 'turn', 'mountain-rail', 'turn', 'straight', 'turn'],
      ['straight', 'mountain-rail', 'turn', 'straight', 'turn', 'straight', 'turn'],
      ['turn', 'turn', 'oasis', 'turn', 'straight', 'straight', 'turn']
    ]
  ]
};

function handleDifficulty(event) {
  setDifficulty(event.target.dataset.level, event);
}

function setDifficulty(level, event) {
  state.difficulty = level;
  state.size = level === '5x5' ? 5 : 7;

  document.querySelectorAll('.difficulty-button').forEach(button => {
    button.classList.remove('active');
  });
  event.target.classList.add('active');
}

function startGame() {
  const playerName = document.querySelector('#player-name').value;
  if (!validateInput(playerName)) {
    return;
  }

  document.querySelector("#player-display").textContent = playerName;
  showGame();
  setupGrid(state.size);
  startTimer();
}

function validateInput(playerName) {
  if (!playerName) {
    showAlert("Please enter your name to start the game.");
    return false;
  }
  if (!state.difficulty) {
    showAlert("Please select a difficulty level.");
    return false;
  }
  return true;
}

function setupGrid(size) {
  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  grid.style.gridTemplateRows = `repeat(${size}, 50px)`;

  const mapIndex = Math.floor(Math.random() * maps[state.difficulty].length);
  const terrainMap = maps[state.difficulty][mapIndex];
  const rotationMap = maps[`${state.difficulty}-rotations`][mapIndex];

  terrainMap.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const cell = document.createElement('div');
      const rotation = rotationMap[rowIndex][colIndex];
      cell.classList.add('grid-cell', tile, `rotate-${rotation}`);
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      cell.dataset.rotation = rotation;
      cell.dataset.type = tile;
      cell.addEventListener('dragover', (e) => e.preventDefault());
      cell.addEventListener('drop', (e) => placeTile(e, cell));
      cell.addEventListener('click', () => rotateTile(cell));
      grid.appendChild(cell);
    });
  });

  grid.dataset.mapIndex = mapIndex;
}

function setupDrag() {
  document.querySelectorAll('.rail-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('type', item.dataset.type);
      e.dataTransfer.setData('rotation', item.dataset.rotation);
    });
  });
}

function rotateTile(cell) {
  if (![TILES.EMPTY, TILES.MOUNTAIN, TILES.WATER, TILES.BRIDGE_RAIL, TILES.MOUNTAIN_RAIL, TILES.BRIDGE].includes(cell.dataset.type)) {
    let rotation = parseInt(cell.dataset.rotation);
    rotation = (rotation + 90) % 360;
    cell.dataset.rotation = rotation;
    cell.classList.remove('rotate-0', 'rotate-90', 'rotate-180', 'rotate-270');
    cell.classList.add(`rotate-${rotation}`);
  }
}

function placeTile(e, cell) {
  const type = e.dataTransfer.getData('type');
  let rotation = e.dataTransfer.getData('rotation');

  if (!canPlace(cell, type)) {
    return;
  }

  if ([TILES.BRIDGE_RAIL, TILES.MOUNTAIN_RAIL].includes(type)) {
    cell.classList.add(type);
    cell.dataset.type = type;
    cell.dataset.rotation = rotation;
    cell.classList.add(`rotate-${rotation}`);
  } else {
    cell.classList.add(type);
    cell.dataset.type = type;
    cell.dataset.rotation = rotation;
    cell.classList.add(`rotate-${rotation}`);
  }

  checkWin();
}

function canPlace(cell, type) {
  if (cell.dataset.type === TILES.WATER || cell.dataset.type === TILES.MOUNTAIN_RAIL || cell.dataset.type === TILES.BRIDGE_RAIL) {
    return false;
  }
  if (type === TILES.BRIDGE_RAIL && cell.dataset.type !== TILES.BRIDGE) return false;
  if (type === TILES.MOUNTAIN_RAIL && cell.dataset.type !== TILES.MOUNTAIN) return false;
  if (cell.dataset.type === TILES.MOUNTAIN && type !== TILES.MOUNTAIN_RAIL) return false;
  if (cell.dataset.type === TILES.BRIDGE && type !== TILES.BRIDGE_RAIL) return false;
  return true;
}

function checkWin() {
  const grid = document.querySelector('#grid');
  const cells = grid.querySelectorAll('.grid-cell');
  const mapIndex = grid.dataset.mapIndex;
  const solution = solutions[state.difficulty][mapIndex];

  let isComplete = true;
  cells.forEach((cell, index) => {
    const row = Math.floor(index / state.size);
    const col = index % state.size;
    const expectedType = solution[row][col].type;
    const expectedRotation = solution[row][col].rotation;

    if (cell.dataset.type !== expectedType || parseInt(cell.dataset.rotation) !== expectedRotation) {
      isComplete = false;
    }
  });

  if (isComplete) {
    clearInterval(state.timer);
    const playerName = document.querySelector('#player-name').value;
    showAlert(`${playerName}, You Did It! You finished in ${state.time}s`);
  }
}


function startTimer() {
  state.time = 0;
  state.timer = setInterval(() => {
    state.time++;
    document.querySelector('#time-elapsed').textContent = `${state.time}s`;
  }, 1000);
}

function showGame() {
  document.querySelector('#menu').style.display = 'none';
  document.querySelector('#game').style.display = 'block';
  document.querySelector('#rail-menu').style.display = 'flex';
}

function showAlert(message) {
  document.querySelector('#alertMessage').innerText = message;
  showModal('alertModal');
}

function showModal(modalId) {
  document.querySelector(`#${modalId}`).style.display = 'flex';
}

function closeModal(modalId) {
  document.querySelector(`#${modalId}`).style.display = 'none';
}

document.querySelector('#start-game-button').addEventListener('click', startGame);

document.querySelectorAll('.difficulty-button').forEach(button => {
  button.addEventListener('click', handleDifficulty);
});

document.querySelector('#rules-button').addEventListener('click', () => {
  showModal('rulesModal');
});

document.querySelector('#close-alert').addEventListener('click', () => {
  closeModal('alertModal');
});

document.querySelector('#close-rules').addEventListener('click', () => {
  closeModal('rulesModal');
});

setupDrag();