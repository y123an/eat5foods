"use client";
import { Button } from "../ui/button";
import Spinner from "../shared/spinner";
interface Props {
  idle: string;
  busy: boolean;
  style?: string;
  action: () => void;
}

const PendingSpinner = ({
  busy,
  idle,
  action,
  style = "hover:bg-red-700",
}: Props) => {
  return (
    <Button
      onClick={action}
      disabled={busy}
      variant="destructive"
      className={style}
    >
      {busy ? (
        <div className="flex items-center space-x-2">
          <Spinner />
          <p>{idle} ....</p>
        </div>
      ) : (
        <p>{idle}</p>
      )}
    </Button>
  );
};

export default PendingSpinner;
