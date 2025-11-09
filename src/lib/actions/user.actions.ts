"use server";

import User, { IUser } from "@/database/user.modal";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}