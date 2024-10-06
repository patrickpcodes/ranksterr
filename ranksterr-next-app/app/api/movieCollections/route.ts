import { NextResponse } from "next/server";
import { MovieCollection } from "@/types/MovieCollection";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("MovieCollection route called");
  
  try {
    const response = await fetch(`${apiUrl}/MovieCollections`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const movieCollections: MovieCollection[] = await response.json();

    return NextResponse.json(movieCollections);
  } catch (error) {
    console.error("Error fetching movie collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie collections" },
      { status: 500 }
    );
  }
}
