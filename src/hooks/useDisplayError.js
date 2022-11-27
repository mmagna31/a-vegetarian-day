import { useState, useEffect } from "react";

const useDisplayError = (...args) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(args.find((error) => error.display));
  }, [args]);

  return error;
};

export default useDisplayError;
