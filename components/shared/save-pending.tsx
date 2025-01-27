import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SavePending() {
  const { pending } = useFormStatus();
  return <Button>{pending ? "Saving..." : "Save changes"}</Button>;
}
