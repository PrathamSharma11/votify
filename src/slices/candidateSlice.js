import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidates: [], // कैंडिडेट्स का डेटा स्टोर करने के लिए खाली लिस्ट
};

const candidateSlice = createSlice({
  name: 'candidates', // स्लाइस का नाम
  initialState,       // स्टेट की शुरुआती स्थिति
  reducers: {
    getCandidates: (state, action) => {
      state.candidates = action.payload; // एक्शन के साथ आने वाले डेटा से कैंडिडेट्स स्टेट को अपडेट करें,//state.candidated mein jo candidates h voh store vala candidates h
    },
  },
});

export const { getCandidates } = candidateSlice.actions; // Export actions
export default candidateSlice.reducer; // Export reducer
