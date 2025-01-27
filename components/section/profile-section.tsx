import { cn } from "@/lib/utils";
import ProfileCard from "../cards/profile-card";
import { gooddogFont } from "@/lib/local-font";
type Props = {
    users: {
        id: string;
        author: string;
        authorImage: string;
    }[]
}
export default function ProfileSection({ users }: Props) {

    return (
        <section className="flex bg-[#491C2E] py-5 text-white space-y-4 flex-col items-center justify-center">
            <div className="my-3 text-center">
                <h3 className="text-2xl font-bold">Stars ❤️ us</h3>
                <p className={cn(gooddogFont.className, "text-xl relative")}>and we didn&apos;t even have to pay <span className="absolute -top-3 underline">ask</span> for it</p>
            </div>
            <div className="grid grid-cols-3  md:flex items-center ">
                {/* profile will render here  */}
                {users.map((user) => (
                    <ProfileCard
                        key={user.id}
                        id={user.id}
                        imageUrl={user.authorImage}
                        name={user.author}
                    />
                ))}
            </div>
        </section>
    );
}