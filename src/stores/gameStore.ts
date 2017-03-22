import { observable, action, reaction, computed } from 'mobx'

import { RiddleStore } from './riddleStore'
import { UIStore } from './gameUIStore'

import { Room, rooms, getGameDoor, Door } from '../config/map'
import { Dialog, getDialogById } from '../config/dialogs'
import { Inventory, Item, defaultInventory, addItem, Computer } from '../config/inventory'

import PhaserGame from '../phaser'

export const GAME = 'GAME'
export const RIDDLE = 'RIDDLE'

export interface IGameStore {
    room: Room
    lastDoor: Door
    dialog: Dialog
    gameState: string
    inventory: Inventory
}

export class GameStore {

    game: PhaserGame
    riddleStore: RiddleStore
    uiStore: UIStore
    computer: Computer

    @observable lineId: number

    @observable state: IGameStore

    @computed get room(): Room {
        return this.state.room
    }

    @computed get lastDoor(): Door {
        return this.state.lastDoor
    }

    @computed get dialog(): Dialog {
        return this.state.dialog
    }

    @computed get gameState(): string {
        return this.state.gameState
    }

    @computed get inventory(): Inventory {
        return this.state.inventory
    }

    constructor() {
        this.state = {
            room: null,
            lastDoor: null,
            dialog: null,
            gameState: GAME,
            inventory: defaultInventory(),
        }
    }

    init(riddleStore: RiddleStore, uiStore: UIStore) {
        this.riddleStore = riddleStore
        this.uiStore = uiStore

        // localStorage.setItem('gameState', null)
        this.state = {
            ...this.state,
            room: rooms[0],
            ...JSON.parse(localStorage.getItem('gameState'))
        }
        this.computer = this.state.inventory[0] as Computer

        // React to riddle solved by the user
        reaction(
            () => this.riddleStore.isSolved,
            (isSolved: boolean) => isSolved && this.riddleSolved()
        )

        // React to dialog opening
        reaction(
            () => this.dialog,
            (dialog: Dialog) => {
                if ( dialog ) {
                    this.lineId = 0
                    let timer = setInterval(() => {
                        if ( this.lineId < this.dialog.lines.length - 1 ) {
                            this.lineId++
                        } else {
                            gameStore.hideDialog()
                            clearInterval(timer)
                        }
                    }, 2000)
                }
            }
        )
        reaction(
            () => this.state.room,
            () => this.saveGameState()
        )
        reaction(
            () => this.uiStore.selectedRiddle,
            () => this.saveGameState()
        )

    }

    @action startGame = () => {
        this.game = new PhaserGame()
        this.game.start()
    }

    saveGameState = () => {
        console.error('SAVING')
        localStorage.setItem('gameState', JSON.stringify(this.state))
    }

    /**
     * To call when a door is touched
     * @param x: x position of the door
     * @param y: y position of the door
     */
    @action activateRiddle = (x: number, y: number) => {
        const gameDoor = getGameDoor(this.room, x, y)
        const userCode = this.computer.userCode[gameDoor.door.riddle.id]

        this.riddleStore.activateDoor(gameDoor, userCode)
        this.state = {
            ...this.state,
            lastDoor: gameDoor.door,
            gameState: RIDDLE
        }
    }

    @action deactivateRiddle = () => {
        this.state = {
            ...this.state,
            gameState: GAME,
        }
        this.game.loadRoom()
    }

    @action riddleSolved = () => {
        let newState = this.state
        if (this.gameState === RIDDLE) {
            newState = {
                ...newState,
                room: this.riddleStore.currentGameDoor.to,
                gameState: GAME,
            }
        }
        this.state = newState
        this.game.loadRoom()
    }

    @action showDialog = (dialogId: string) => {
        if ( !this.state.dialog ) {
            this.state = {
                ...this.state,
                dialog: getDialogById(dialogId),
            }
        }
    }

    @action hideDialog = () => {
        this.state = {
            ...this.state,
            dialog: null,
        }
    }

    @action addItem = (item: Item) => {
        this.state = {
            ...this.state,
            inventory: addItem(this.state.inventory, item)
        }
    }

    @action setUserCode = (riddleId: string, userCode: string) => {
        this.computer.userCode[riddleId] = userCode
        this.state = {
            ...this.state
        }
    }

    getUserCode = (riddleId: string) => this.computer.userCode[riddleId]
}

const gameStore = new GameStore()

export default gameStore