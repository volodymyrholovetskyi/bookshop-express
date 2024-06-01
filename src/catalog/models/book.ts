import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: String;
  description: String;
  orderId: number;
  price: number;
  available: number;
  datePublished: Date;
}

const bookShema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  datePublished: {
    type: Date,
    required: true,
  },
});

bookShema.index(
  { orderId: 1 },
  { name: "index by orderId" }
);

bookShema.index(
  {
    orderId: 1,
    datePublished: -1,
  },
  { name: "index by orderId and datePublished" }
);

const Book = mongoose.model<IBook>("Book", bookShema);

export default Book;
