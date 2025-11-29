import { useEffect, useState } from "react";

export const ImagenPorPalabra = ({ palabra }) => {
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (!palabra) return;

        const API_KEY = "TU_API_KEY_AQUI";

        fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(palabra)}&image_type=photo&per_page=3`)
            .then(res => res.json())
            .then(data => {
                if (data.hits && data.hits.length > 0) {
                    setImg(data.hits[0].previewURL);
                } else {
                    setImg(null);
                }
            })
            .catch(() => setImg(null));
    }, [palabra]);

    if (!img) return null;

    return (
        <img
            src={img}
            alt={palabra}
            width="80"
            className="rounded shadow ms-3"
            style={{ objectFit: "cover" }}
        />
    );
};
