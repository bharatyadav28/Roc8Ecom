import { Triangle } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="my-10  flex  w-full justify-center">
      <Triangle
        height="80"
        width="80"
        color="#404040"
        ariaLabel="triangle-loading"
        wrapperStyle={{ mx: "auto" }}
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
