

export type TOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  };

  export type TFeedState = {
    orders: TOrder[] | null;
    success: boolean | null;
    total: number | null;
    totalToday: number | null;
  } ;