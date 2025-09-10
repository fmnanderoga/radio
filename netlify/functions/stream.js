import fetch from "node-fetch";

export default async (req, res) => {
  try {
    const RADIO_URL = "https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957";
    // 👆 este es tu link actual de la radio

    const response = await fetch(RADIO_URL);

    // Configurar como audio
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-cache");

    // Reenviar el audio en vivo
    response.body.pipe(res);
  } catch (err) {
    console.error("Error con la radio:", err);
    res.statusCode = 500;
    res.end("Error al conectar con la radio");
  }
};
