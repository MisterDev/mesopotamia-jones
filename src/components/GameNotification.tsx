import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { arvo } from '../utils/fonts'

const height = 150

const styles = StyleSheet.create({
    notificationContainer: {
        position: 'absolute',
        height: `${height}px`,
        width: '100%',
        backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
        color: 'white',
        textAlign: 'center',
        fontSize: 'xx-large',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.5s, opacity 0.5s',
        boxShadow:
            'rgba(0, 0, 0, 0.2) 0px -25px 25px inset, rgba(0, 0, 0, 0.2) 0px -12px 25px',
        fontFamily: [arvo]
    }
})

export interface GameNotificationProps {
    visible: boolean
    text: string
}

export interface GameNotificationState {
    zIndex: number
}

class GameNotification extends React.PureComponent<
    GameNotificationProps,
    GameNotificationState
> {
    constructor(props: GameNotificationProps) {
        super(props)
        this.state = {
            zIndex: -1
        }
    }

    componentWillReceiveProps(props: GameNotificationProps) {
        if (props.visible !== this.props.visible && props.visible === true) {
            this.setState({ zIndex: 1 })
            setTimeout(() => this.setState({ zIndex: -1 }), 3000)
        }
    }

    render() {
        const { visible, text } = this.props
        const { zIndex } = this.state

        return (
            <div
                className={css(styles.notificationContainer)}
                style={{
                    opacity: visible ? 1 : 0,
                    zIndex,
                    transform: `translateY(${visible ? -height : 0}px)`
                }}
            >
                {text}
            </div>
        )
    }
}

export default GameNotification