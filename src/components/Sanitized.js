import React from "react";
import DOMPurify from "dompurify";

/**
 * Componente che effettua il render di una stringa HTML
 * dopo averla sanificata.
 */

const Sanitized = ({ htmlString = "", className = null, style = {} }) => {
  const data = DOMPurify.sanitize(htmlString);
  return (
    <p
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
};

export default Sanitized;
