import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import BlocklyEditor from './BlocklyEditor'
import Map from './Map'

import { computer, getToolbox, hasItem, translator } from '../config/inventory'
import { Riddle } from '../config/riddles'

import { GameStore } from '../stores/gameStore'
import l10nStore from '../stores/l10nStore'

import { onlyIf } from '../utils'
import { arvo } from '../utils/fonts'

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1
    },
    mapWrapperTab: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        padding: '24px'
    },
    tabHeader: {
        fontSize: 'xx-large',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: '2px solid white',
        paddingBottom: '24px',
        marginBottom: '24px',
        color: 'white',
        fontFamily: [arvo, 'sans-serif']
    },
    mapContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        border: '5px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
})

interface MapWrapperProps {
    selectedRiddle: Riddle
    onMapDoorClick: (riddle: Riddle) => void
    gameStore?: GameStore
}

export default class MapWrapper extends React.Component<MapWrapperProps> {
    workspaceXML: string
    riddleText: string

    componentWillMount() {
        if (this.props.selectedRiddle) {
            this.workspaceXML = this.props.gameStore.getRiddleWorkspaceXML(
                this.props.selectedRiddle.id
            )
        }
    }

    componentWillReceiveProps(nextProps: MapWrapperProps) {
        if (this.props.selectedRiddle !== nextProps.selectedRiddle) {
            this.workspaceXML = this.props.gameStore.getRiddleWorkspaceXML(
                nextProps.selectedRiddle.id
            )
            const type =
                nextProps.selectedRiddle.solutionType === 'number'
                    ? 'numero'
                    : 'lettera'

            this.riddleText = !hasItem(
                this.props.gameStore.inventory,
                translator
            )
                ? '*Testo indovinello cuneiforme incomprensibile*'
                : nextProps.selectedRiddle.question()([
                      `${type}1`,
                      `${type}2`,
                      `${type}3`,
                      `${type}4`
                  ])
            this.forceUpdate()
        }
    }

    render() {
        const { onMapDoorClick, selectedRiddle } = this.props
        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.mapWrapperTab)}>
                    <div className={css(styles.tabHeader)}>
                        {l10nStore.dictionary.map}
                    </div>
                    <div className={css(styles.mapContainer)}>
                        <div>
                            <Map onMapDoorClick={onMapDoorClick} />
                        </div>
                    </div>
                </div>
                {onlyIf(
                    hasItem(this.props.gameStore.inventory, computer),
                    <div className={css(styles.mapWrapperTab)}>
                        <BlocklyEditor
                            riddle={selectedRiddle}
                            readonly={true}
                            riddleText={this.riddleText}
                            workspaceXML={this.workspaceXML || ''}
                        />
                    </div>
                )}
            </div>
        )
    }
}
