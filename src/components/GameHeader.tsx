import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { close, grid, help, image } from 'react-icons-kit/ionicons/'

import { onlyIf } from '../utils'
import Button from './Button'

import { GameUI, UIStore } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    inventoryHeader: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 20,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    button: {
        marginLeft: '12px',
        fontWeight: 'bold'
    },
    buttonRight: {
        position: 'absolute',
        right: 0,
        marginRight: '12px',
        fontWeight: 'bold'
    },
    item: {
        width: 20,
        height: 20,
        marginLeft: 10
    }
})

export interface GameHeaderProps {
    gameUi: GameUI
    width: number
    show: (gameUi: GameUI) => void
}

const GameHeader = ({ gameUi, show, width }: GameHeaderProps) => (
    // tslint:disable-next-line:jsx-no-lambda
    <div className={css(styles.inventoryHeader)} style={{ width }}>
        <Button
            icon={image}
            text={'Mappa'}
            onClick={show.bind(null, GameUI.Map)}
            customCSS={styles.button}
        />
        <Button
            icon={grid}
            text={'Inventario'}
            onClick={show.bind(null, GameUI.Inventory)}
            customCSS={styles.button}
        />
        {onlyIf(
            gameUi !== GameUI.Game,
            <Button
                icon={close}
                onClick={show.bind(null, GameUI.Game)}
                customCSS={styles.button}
            />
        )}
        <Button
            icon={help}
            text={'Aiuto'}
            onClick={show.bind(null, GameUI.Help)}
            customCSS={styles.buttonRight}
        />
    </div>
)

interface GameHeaderContainerProps {
    uiStore?: UIStore
}

export default inject('uiStore')(
    observer(({ uiStore }: GameHeaderContainerProps) => (
        <GameHeader
            gameUi={uiStore.state.ui}
            show={uiStore.show}
            width={uiStore.width}
        />
    ))
)
