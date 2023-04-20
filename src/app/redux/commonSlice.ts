import { createSlice } from "@reduxjs/toolkit";
import { ITable } from "@/app/types/ITable";

interface IState {
  tables: ITable[];
  choosenTable: ITable | null;
  isModelOpen: boolean;
  deletedTables: ITable[];
  filteredTables: ITable[];
  isLoading: boolean;
}

const initialState: IState = {
  tables: [],
  choosenTable: null,
  isModelOpen: false,
  filteredTables: [],
  isLoading: false,
  deletedTables: []
};

export const commentSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    // Action to add tables to the store
    addTables: (state, action) => {
      state.tables = [...state.tables, action.payload];
    },

    // Action to set tables to the store
    setTables: (state, action) => {
      state.tables = action.payload;
    },

    // Action to add deleted tables to the store
    adddDeletedTables: (state, action) => {
      state.deletedTables = [...state.deletedTables, action.payload];
    },

    // Action to choose one of tables in the store
    chooceTable: (state, action) => {
      state.choosenTable = action.payload;
    },

    // Action to open modal in the store
    openModal: (state) => {
      state.isModelOpen = !state.isModelOpen;
    },

    // Action to filter tables in the store
    filterTables: (state, action) => {
      state.filteredTables = action.payload;
    },

    makeLoading: (state) => {
      state.isLoading = !state.isLoading;
    },

    //Action to change one of tables in the store
    changeTable: (state, action) => {
      state.tables = state.tables.map((table) => {
        if (table.id === action.payload.id) {
          return {
            ...table,
            xcod: action.payload.xcod,
            ycod: action.payload.ycod,
            name: action.payload.name,
            rotate: action.payload.rotate,
            size: action.payload.size,
          };
        }
        return table;
      });
    },
    // Action to remove one of tables in the store
    removeTable: (state, action) => {
      const index = state.tables.findIndex(table => table.id === action.payload);
      if (index !== -1) {
        const removedTable = state.tables[index];
        state.tables.splice(index, 1);
        state.tables.forEach(table => {
          if (table.xcod === removedTable.xcod && table.ycod === removedTable.ycod) {
            table.xcod = table.xcod-10;
            table.ycod = table.ycod-10;
          }
        });
      }
    }
  }
});

export const {
  addTables,
  changeTable,
  removeTable,
  chooceTable,
  openModal,
  filterTables,
  makeLoading,
  adddDeletedTables,
  setTables,
} = commentSlice.actions;
export const selectTables = (state: IState) => state.tables;
export const selectChoosenTable = (state: IState) => state.choosenTable;
export const selectIsModelOpen = (state: IState) => state.isModelOpen;
export const selectFilteredTables = (state: IState) => state.filteredTables;
export const selectDeletedTables = (state: IState) => state.deletedTables;
export const selectIsLoading = (state: IState) => state.isLoading;
export default commentSlice;
