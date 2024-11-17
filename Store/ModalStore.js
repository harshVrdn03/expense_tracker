import { create } from 'zustand';

const ModalStore = create(set => ({
    deleteModalVisible: false,
    deleteId: null,
    setDeleteModalVisible: data => set(state => ({ deleteModalVisible: data })),
    setDeleteId: data => set(state => ({ deleteId: data })),
}));
export default ModalStore;
