import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Address, User } from "@prisma/client";

type Props = {
    userAddresses: Address[],
    userInfo: User
}

export default function MyAddresses({ userAddresses, userInfo }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User  Addresses</CardTitle>
                <CardDescription>
                    all   delivery addresses added by
                    {" "}{userInfo.name}.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {userAddresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-md p-4">
                            <div className="font-medium mb-2">{address.street}</div>
                            <div className="text-sm text-gray-600">
                                {`${address.city}, ${address.state} ${address.zipCode}, ${address.country}`}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}