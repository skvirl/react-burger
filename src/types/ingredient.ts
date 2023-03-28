type TIngredient = {
  _id: string;
  image: string;
  image_large: string;
  price: number;
  name: string;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  type?:string
};

export default TIngredient;
