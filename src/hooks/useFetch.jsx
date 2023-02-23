import React from "react";
 
const useFetch = (requestFn) => {
  const [hasError, setHasError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(null);
  const [data, setData] = React.useState();

  const executeApiRequest = ()=>{
    requestFn()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
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
