import Image from "next/image";

type Props = {
  id: string,
  imageUrl: string,
  name: string,
}
export default function ProfileCard({ id, imageUrl, name }: Props) {
  return (
    <div key={id} className="flex w-[100px] h-[130px] flex-col   items-center ">
      <div className="h-[84px] w-[84px] rounded-full border-2 border-[#dc3d50]">
        <div className="h-[80px] w-[80px] border-2  border-[#fff]  rounded-full" >
          <Image width={80}
            height={80}
            src={imageUrl}
            className="w-[82px] rounded-full"
            alt={name} />
        </div>
      </div>
      <p className=" w- full text-[12px]  text-center">{name}</p>
    </div>
  );
}