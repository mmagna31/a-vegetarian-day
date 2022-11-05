import React from "react";
import DOMPurify from "dompurify";

/**
 * Componente che effettua il render di una stringa HTML
 * dopo averla sanificata.
 */

const Sanitized = ({ htmlString = "" }) => {
  const data = DOMPurify.sanitize(htmlString);
  return <p dangerouslySetInnerHTML={{ __html: data }} />;
};

export default Sanitized;
