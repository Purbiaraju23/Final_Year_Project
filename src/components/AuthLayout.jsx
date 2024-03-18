import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Function to render a protected route.
 * @param {React.ReactNode} children - The children to be rendered if the user is authenticated.
 * @param {boolean} authentication - Whether or not the route requires authentication. Defaults to true.
 * @returns {JSX.Element} A JSX element that renders the protected route.
 */
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <h1>Loading....</h1> : <>{children}</>;
}
