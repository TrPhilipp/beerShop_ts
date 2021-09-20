import React, { FC } from 'react'
import { IBeer } from '../../types'
import { Draggable } from 'react-beautiful-dnd'
import classes from './BeerItem.module.css'
import { useTypedSelector } from './../../hooks/UseTypedSelector'
import { useDispatch } from 'react-redux'
import { BUTTON_ICON_CLASSNAMES, COLORS, COLUMN_ID } from '../../utils/consts'
import { BeerActionCreators } from './../../redux/actionCreators/beer'

interface BeerProps {
  item: IBeer
  index: number
  columnId: string
}

const BeerItem: FC<BeerProps> = ({ item, index, columnId }) => {
  const { columns } = useTypedSelector((state) => state.beer)
  const dispatch = useDispatch()

  const handleItem = (columnId: string, index: number): void => {
    const secondColumn = Object.values(columns).filter(
      (column) => column.name !== columnId
    )[0]
    const sourceItems = [...columns[columnId].items]
    const destItems = [...secondColumn.items]
    const [removed] = sourceItems.splice(index, 1)
    destItems.push(removed)
    const newColumns = {
      ...columns,
      [columns[columnId].name]: {
        ...columns[columnId],
        items: sourceItems,
      },
      [secondColumn.name]: {
        ...secondColumn,
        items: destItems,
      },
    }
    dispatch(BeerActionCreators.setCurrentBeer(newColumns.beer.items))
    dispatch(BeerActionCreators.reshuflleColums(newColumns))
    if (columnId === COLUMN_ID.BEER) {
      dispatch(BeerActionCreators.setBeer(1))
    }
  }

  return (
    <Draggable key={item.id} draggableId={item.name} index={index}>
      {(provided, snapshot) => (
        <div
          className={classes.beer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: snapshot.isDragging
              ? COLORS.ITEM_DRAGGING
              : COLORS.ITEM_STANDART,
            ...provided.draggableProps.style,
          }}
        >
          <span className={classes.beer__name}>{item.name}</span>
          <button
            className={classes.beer__btn}
            onClick={() => handleItem(columnId, index)}
          >
            <i
              className={
                columnId === COLUMN_ID.BEER
                  ? BUTTON_ICON_CLASSNAMES.SHOPPING_CART
                  : BUTTON_ICON_CLASSNAMES.TRASH
              }
            ></i>
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default BeerItem
