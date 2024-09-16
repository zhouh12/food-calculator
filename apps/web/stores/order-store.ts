import { create } from "zustand";

interface Order {
  id: string;
  name: string;
  price: number;
}

type BearState = {
  order: Order | undefined;
  setOrder: (order: Order) => void;
};

const useStore = create<BearState>((set) => ({
  order: undefined,
  setOrder: () => set((state) => ({ order:state.order })),
}));

export {useStore}


// import { getOrders } from 'src/services/order-request-service';
// import type { OrderEntryItemDto } from 'fb-shared/order-entry-api';

// type OrderState = {
//   orders: OrderEntryItemDto[];
// };

// type OrderActions = {
//   setOrders: (groupCodes: string[]) => Promise<void>;
// };

// export const useOrderStore = create<OrderState & OrderActions>((set) => ({
//   orders: [],
//   setOrders: async (groupCodes: string[]) => {
//     try {
//       const orders = await getOrders(groupCodes);
//       set({ orders });
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     }
//   },
// }));