import { EUserRole, EUserStatus } from "@/types/enums";
import { model, models, Schema } from "mongoose";

// clerk id
export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email_address: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: EUserStatus;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, unique: true },
  email_address: { type: String, unique: true },
  avatar: { type: String, required: false },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },    
});

const User = models.User || model<IUser>("User", userSchema);

export default User;