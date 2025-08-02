
export async function Search(input: string) {
  try {
    const res = await fetch(`https://localhost:7025/api/Daroo/Search?input=${input}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //props: JSON.stringify({ input }), // یا هر چیزی که بدنه API نیاز داره
    });

    if (!res.ok) {
      throw new Error("خطا در دریافت پاسخ از سرور");
    }

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("خطا در متد Search:", error);
    return [];
  }
}