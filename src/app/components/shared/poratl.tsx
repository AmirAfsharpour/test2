import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const portalRoot = useRef(document.getElementById("portal-root"));

  useEffect(() => {
    if (!portalRoot.current) {
      const div = document.createElement("div");
      div.id = "portal-root";
      document.body.appendChild(div);
      portalRoot.current = div;
    }
  }, []);

  if (!portalRoot.current) return null;

  return createPortal(children, portalRoot.current);
}
