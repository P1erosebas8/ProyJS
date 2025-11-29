import { useEffect, useState } from "react";

export const Mensaje = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (!show) return null;
  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center p-4">
          <h4 className="mb-3">Bienvenido</h4>
          <p className="mb-0">Comineza a agregar cualquier cosa :p.</p>
        </div>
      </div>
    </div>
  );
};
