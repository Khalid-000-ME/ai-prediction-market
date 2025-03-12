import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row text-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Market-based predictions</CardTitle>
            <CardDescription>Make on-chain market-based predictions.</CardDescription>
          </CardHeader>
          <CardFooter>
              <Link href="/market-predictions">
                <p className="text-xl cursor-pointer hover:underline">Predict now &gt;</p>
              </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>General predictions</CardTitle>
            <CardDescription>Market general predictions. Predict about anything!</CardDescription>
          </CardHeader>
          <CardFooter>
              <Link href="/general-predictions">
                <p className="text-xl cursor-pointer hover:underline">Predict now &gt;</p>
              </Link>
          </CardFooter>
        </Card>

        </div>
      </main>
    </div>
  );
}
