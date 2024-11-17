import {create} from 'zustand';

const colorStore = create(set => ({
  color: {
    PrimaryColor: '##0D242D',
    SecondaryColor: '##2A3A45',
    white: '#fff',
  },
}));
export default colorStore;
