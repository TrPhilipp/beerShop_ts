import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/reducer'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
