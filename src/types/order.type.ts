export interface IOrder {
  _id: string;
  user: string;
  email: string;
  product: {
    _id: string;
    title: string;
    productImg: string;
    price: number;
  };
  status: string;
  quantity: number;
  totalPrice: number;
  payment: {
    status: string;
  };
  deliveryStatus: "pending" | "shipped" | "delivered" | "revoked";
  createdAt: string;
  updatedAt: string;
}
