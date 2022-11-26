import { useState, useEffect } from "react";

const useDisplayError = (...args) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(args.find((error) => error.display));
    // if (errorRecipes.display) {
    //   setErrorPage(errorRecipes);
    // }
  }, [args]);

  // return error;
  return error;
};

export default useDisplayError;
