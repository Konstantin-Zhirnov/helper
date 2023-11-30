import type { AppDispatch, RootState } from './config/redux/store'
import { store, useAppDispatch, useAppSelector } from './config/redux/store'
import App from './components/App'

export type { AppDispatch, RootState }
export { store, useAppDispatch, useAppSelector }
export { App }


