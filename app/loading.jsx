import BarLoader from "react-spinners/BarLoader";


export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full pt-[60%] grid place-items-center">
    <BarLoader color="#334155" />
    </div>
    )
}


