import { PayloadAction, createSlice} from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CounterState  {
    value: number;
}

const initialState: CounterState  = {
    value: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        increment: (state: CounterState, action: PayloadAction<void>) => {state.value += 1},
        decrement: (state: CounterState, action: PayloadAction<void>) => {state.value -= 1},
    },
})

export const {increment, decrement} = counterSlice.actions
export const selectCounterState = (state: RootState)=> state.counter   // ได้ profile ไปใช้ที่ ui ไหนก้ได้
export default counterSlice.reducer