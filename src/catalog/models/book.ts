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

 bookShema.index( {datePublished: -1} );

const Book = mongoose.model<IBook>("Book", bookShema);

export default Book;
