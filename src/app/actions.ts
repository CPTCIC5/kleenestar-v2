"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string) {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value;
}
