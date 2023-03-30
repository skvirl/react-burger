import React from "react";
 
const useFetch = (requestFn:Function) => {
  const [hasError, setHasError] = React.useState<Error|null>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean|null>(null);
  const [data, setData] = React.useState<unknown>();

  const executeApiRequest = ()=>{
    requestFn()
      .then((result:unknown) => {
        setData(result);
      })
      .catch((error:Error) => {
        setHasError(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }  

    return {
    executeApiRequest,    
    hasError,
    isLoaded,
    data,
    };
};

export default useFetch;
