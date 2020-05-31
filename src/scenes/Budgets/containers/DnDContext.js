import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useMonth } from '../useMonth'
import { useCallback } from 'react'
import { MoveMoneyModal } from './MoveMoneyModal'

export const IsDraggingContext = React.createContext(false)

export function DnDContext({ children }) {
  const [month] = useMonth()
  const [isDragging, setIsDragging] = useState()
  const [moneyModalProps, setMoneyModalProps] = useState({ open: false })

  const moveMoney = useCallback(
    e => {
      setIsDragging(false)
      if (
        e.source &&
        e.destination &&
        e.source.droppableId !== e.destination.droppableId
      ) {
        const source = e.source.droppableId
        const destination = e.destination.droppableId

        setMoneyModalProps({
          open: true,
          source,
          destination,
          month,
          key: source + destination + month,
        })
      }
    },
    [month]
  )
  const onDragStart = useCallback(e => {
    setIsDragging(true)
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100)
    }
  }, [])

  return (
    <DragDropContext onDragEnd={moveMoney} onDragStart={onDragStart}>
      <IsDraggingContext.Provider value={isDragging}>
        {children}
        <MoveMoneyModal
          {...moneyModalProps}
          onClose={() => setMoneyModalProps({ open: false })}
        />
      </IsDraggingContext.Provider>
    </DragDropContext>
  )
}
