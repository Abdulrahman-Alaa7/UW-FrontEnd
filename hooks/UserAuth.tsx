"use client";
import useUser from "./useUser";

export default function UserAuth() {
  const { user } = useUser();

  if (user) {
    return true;
  } else {
    return false;
  }
}
