import React, { FC } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import ColumnItem from '../Column/ColumnItem'
import classes from './BeerCatalog.module.css'
import { useTypedSelector } from './../../hooks/UseTypedSelector'
import { IColumn, IColumns } from '../../types'
import { BeerActionCreators } from './../../redux/actionCreators/beer'
import { COLUMN_ID } from '../../utils/consts'

const BeerCatalog: FC = () => {
  const { columns } = useTypedSelector((state) => state.beer)
  const dispatch = useDispatch()

  const onDragEnd = (result: DropResult, columns: IColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }
      dispatch(BeerActionCreators.reshuflleColums(newColumns))
      if (source.droppableId === COLUMN_ID.BEER) {
        dispatch(BeerActionCreators.addBeer(1))
      }
      return
    }
    const column = columns[source.droppableId] as IColumn
    const columnName = source.droppableId
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    const newColumn = { ...column, items: copiedItems }

    dispatch(BeerActionCreators.reshuffleColumn(columnName, newColumn))
  }

  return (
    <div className={classes.catalog}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
        {Object.entries(columns).map(([columnId, column]) => (
          <ColumnItem columnId={columnId} column={column} key={columnId} />
        ))}
      </DragDropContext>
    </div>
  )
}

export default BeerCatalog
