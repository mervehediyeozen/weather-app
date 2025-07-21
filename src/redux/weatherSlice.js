import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchWeather = createAsyncThunk( 'weather/fetchWeather',
    async({latitude, longitude}) => {
        const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        timezone: 'Europe/Istanbul',
      },
    });
     return res.data;
    }
)

export const weatherSlice = createSlice({

    name:"weather",
    initialState:{
    data: null,
    status: 'idle',
    main:"",
    },
    reducers: {
     setMain : (state, action) => {
      state.main = action.payload
     }
    },

      extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = 'failed';
      });
  },


})

export default weatherSlice.reducer;
export const {setMain} = weatherSlice.actions;