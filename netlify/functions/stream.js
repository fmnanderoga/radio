export default async (req, res) => {
  try {
    const RADIO_URL = "https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957";

    const response = await fetch(RADIO_URL);

    if (!response.ok || !response.body) {
      throw new Error("No se pudo obtener el stream");
    }

    // Configurar como audio
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-cache");

    // Reenviar el audio en vivo
    response.body.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          res.end();
        },
      })
    );
  } catch (err) {
    console.error("Error con la radio:", err);
    res.statusCode = 500;
    res.end("Error al conectar con la radio");
  }
};
