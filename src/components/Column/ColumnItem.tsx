import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { IBeer, IColumn } from '../../types'
import { Droppable } from 'react-beautiful-dnd'
import classes from './ColumnItem.module.css'
import { BUTTON_LABEL, COLUMN_ID } from '../../utils/consts'
import BeerItem from './../Beer/BeerItem'
import { BeerActionCreators } from './../../redux/actionCreators/beer'

interface ColumnProps {
  columnId: string
  column: IColumn
}

const ColumnItem: FC<ColumnProps> = ({ columnId, column }) => {
  const dispatch = useDispatch()
  const buttonClasses = [classes.column__btn, classes[`btn__${columnId}`]]
  const handleItems = (columnId: string) => {
    if (columnId === COLUMN_ID.BEER) {
      dispatch(BeerActionCreators.addAll())
      return
    }
    dispatch(BeerActionCreators.removeAll())
  }

  const checkHeight = (e: React.UIEvent<HTMLDivElement>): boolean =>
    (e.currentTarget.scrollTop + e.currentTarget.clientHeight) /
      e.currentTarget.scrollHeight >
    0.75

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    if (columnId !== COLUMN_ID.BEER) return
    if (checkHeight(e)) {
      dispatch(BeerActionCreators.setBeer(10))
    }
  }

  return (
    <div className={classes.column} key={columnId}>
      <button
        disabled={!column.items.length}
        className={buttonClasses.join(' ')}
        onClick={() => handleItems(columnId)}
      >
        {columnId === COLUMN_ID.BEER
          ? BUTTON_LABEL.ADD_ALL
          : BUTTON_LABEL.REMOVE_ALL}
      </button>
      <div className={classes.column__wrapper}>
        <Droppable droppableId={columnId}>
          {(provided, snapshot) => (
            <div
              onScroll={handleScroll}
              className={classes.column__item}
              style={{
                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.items.map((item: IBeer, index: number) => (
                <BeerItem
                  key={item.id}
                  item={item}
                  index={index}
                  columnId={columnId}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default ColumnItem
