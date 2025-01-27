import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IMG2 } from "@/constants/images"
import { Ingredient, NutritionalFact } from "@prisma/client"
import Image from "next/image"



type Props = {
    ingredients: Ingredient[],
    nutritionalFacts: NutritionalFact[],
    nonIngredients: Ingredient[]
}
export default function NutritionalInfo({ ingredients, nonIngredients, nutritionalFacts }: Props) {
    return (
        <div className="bg-teal-500 p-6 min-h-screen flex flex-col md:flex-row items-start justify-center gap-6">
            <Card className="w-full md:w-1/2 bg-[#f8f2e4]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Nutritional Facts*</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]"></TableHead>
                                <TableHead className="text-right  text-black font-bold">50g</TableHead>
                                <TableHead className="text-right  text-black font-bold">%RDA</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nutritionalFacts.map((fact) => (
                                <TableRow key={fact.name}>
                                    <TableCell className="font-medium">{fact.name}</TableCell>
                                    <TableCell className="text-right">{fact.value}</TableCell>
                                    <TableCell className="text-right">{fact.unit || "-"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="w-full md:w-1/2 bg-[#f8f2e4]">
                <CardHeader className="">
                    <CardTitle className="text-xl text-dark-green font-extrabold">Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className=" flex space-x-1 w-full flex-wrap ">
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.name} className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-[#e8cbe8] flex items-center justify-center text-2xl">
                                    <Image src={IMG2}
                                        alt="Icon"
                                        className="w-10 h-10 rounded-full"
                                        width={50}
                                        height={50}

                                    />
                                </div>
                                <span className="text-xs mt-1 text-center">{ingredient.name}</span>
                            </div>
                        ))}
                    </div>

                </CardContent>
                <CardHeader className="bg-[#192d1e]">
                    <CardTitle className="text-lg text-white font-bold">Ingredients we don&lsquo;t use</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-1 w-full flex-wrap">
                        {nonIngredients.map((ingredient) => (
                            <div key={ingredient.name} className="flex flex-col items-center mt-2">
                                <div className="w-12 h-12 rounded-full bg-[#e8cbe8] flex items-center justify-center text-2xl">

                                    <Image src={IMG2}
                                        alt="Icon"
                                        className="w-10 h-10 rounded-full"
                                        width={50}
                                        height={50}

                                    />
                                </div>
                                <span className="text-xs mt-1 text-center">{ingredient.name}</span>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}