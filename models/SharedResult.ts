import mongoose, { Schema, Document } from "mongoose";

export interface ISharedResult extends Document {
  shareId: string;
  message: string;
  result: any;
  createdAt: Date;
}

const SharedResultSchema = new Schema<ISharedResult>({
  shareId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  result: {
    type: Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // TTL Index: Expires after 86400 seconds (24 hours)
  },
});

export default mongoose.models.SharedResult ||
  mongoose.model<ISharedResult>("SharedResult", SharedResultSchema);
