import clsx from "clsx";
import { ProgressBar } from "primereact/progressbar";
import React, {
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";

export const LoadingContext = React.createContext<{
  setProgressBar: Dispatch<SetStateAction<boolean>>;
}>({
  setProgressBar: () => ({}),
});

function LoadingProvider(props: PropsWithChildren) {
  const [isActive, setProgressBar] = useState(false);

  // useEffect(() => {
  //   if (isActive) {
  //     setTimeout(() => {
  //       if (isActive) {
  //         setProgressBar(false);
  //       }
  //     }, 10000);
  //   }
  // }, [isActive]);

  return (
    <LoadingContext.Provider value={{ setProgressBar }}>
      <ProgressBar
        mode="indeterminate"
        className={clsx(isActive || "hidden", "sticky top-0 z-50 h-[0.375rem]")}
      />
      {props.children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
