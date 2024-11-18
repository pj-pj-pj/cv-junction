import { Button } from "@/components/ui/button";
import { ArrowLeft, PenOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div
      id="not-found"
      className="h-screen flex flex-col justify-center"
    >
      <p className="gap-5 align-middle font-black mb-5 justify-center flex text-2xl text-primary">
        <PenOff />
        CVJunction
      </p>
      <p className="justify-center gap-3 text-5xl flex text-center font-black text-primary">
        Page<span className="text-black">not found</span>
      </p>

      <Button
        onClick={() => {
          navigate("/");
        }}
        className="mx-auto mt-4"
      >
        Go back <ArrowLeft />
      </Button>
    </div>
  );
}

export default PageNotFound;
