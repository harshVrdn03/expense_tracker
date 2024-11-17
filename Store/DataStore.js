import {create} from 'zustand';

const DataStore = create(set => ({
  spentData: [],
  incomeData: [],
  currentFilter: 'Days',
  total: {
    income: 0,
    spent: 0,
  },
  totalAmountSpentByCategory: [],
  totalIncomeByCategory: [],
  setFilter: data => set(state => ({currentFilter: data})),
  setTotalIncome: data =>
    set(state => ({total: {...state.total, income: data}})),
  setTotalSpent: data => set(state => ({total: {...state.total, spent: data}})),
  setSpentData: data => set(state => ({spentData: data})),
  setIncomeData: data => set(state => ({incomeData: data})),
  setTotalAmountSpentByCategory: data =>
    set(state => ({totalAmountSpentByCategory: data})),
  setTotalIncomeByCategory: data =>
    set(state => ({totalIncomeByCategory: data})),
}));

export default DataStore;
