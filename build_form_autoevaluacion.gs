/**
 * Crea un Google Form (Quiz) de 20 preguntas tipo test para autoevaluación.
 * 4 criterios (5 preguntas cada uno):
 *  1) Psicología del color y justificación
 *  2) Círculo cromático y armonías
 *  3) Regla 60/30/10 y uso de degradados
 *  4) Creatividad y coherencia visual
 *
 * Cada pregunta vale 1 punto. Incluye feedback por respuesta.
 */
function crearFormularioAutoevaluacionWebQuest() {
  const titulo = "Autoevaluación · WebQuest: Color en Interfaces (CFGS DAM)";
  const descripcion =
    "Autoevaluación tipo test (20 preguntas). Recibirás la corrección automática al enviar.\n" +
    "Criterios evaluados: Psicología del color, Círculo cromático y armonías, Regla 60/30/10 y degradados, Creatividad y coherencia visual.";

  const form = FormApp.create(titulo);
  form.setIsQuiz(true);
  form.setDescription(descripcion);
  form.setShuffleQuestions(true); // desactiva barajado global (puedes poner true si quieres aleatorizar)

  // Opcional: recopilar correo o nombre
  // form.setCollectEmail(true);
  form.addTextItem().setTitle("Nombre y apellidos").setRequired(true);
  form.addTextItem().setTitle("Grupo/Curso").setRequired(true);

  // Helpers de feedback
  const fbCorrecto = (txt) => FormApp.createFeedback().setText("✅ Correcto. " + (txt || "")).build();
  const fbIncorrecto = (txt) => FormApp.createFeedback().setText("❌ Incorrecto. " + (txt || "")).build();

  // Helper: añade pregunta de opción múltiple con respuesta correcta y feedback
  function addMC(title, options, correctIndex, pts, fbOK, fbKO) {
    const item = form.addMultipleChoiceItem();
    item.setTitle(title).setRequired(true);
    const choices = options.map((opt, i) => item.createChoice(opt, i === correctIndex));
    item.setChoices(choices);
    try { item.setPoints(pts || 1); } catch (e) {}
    if (fbOK) { try { item.setFeedbackForCorrect(fbOK); } catch (e) {} }
    if (fbKO) { try { item.setFeedbackForIncorrect(fbKO); } catch (e) {} }
  }

  // Helper: añade separador/portada de criterio
  function addCriterio(tituloSeccion, desc) {
    const page = form.addPageBreakItem();
    page.setTitle(tituloSeccion);
    if (desc) page.setHelpText(desc);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 1) Psicología del color y justificación (5 preguntas) – basado en el vídeo
  addCriterio("Criterio 1 · Psicología del color y justificación (5 preguntas)",
              "Asociaciones emocionales de colores según el vídeo de introducción.");

  addMC(
    "1) El color azul suele asociarse principalmente a…",
    ["Confianza y seguridad", "Peligro y advertencia", "Exclusividad y lujo", "Alta excitación/urgencia"],
    0, 1,
    fbCorrecto("El azul comunica calma, confianza y seguridad."),
    fbIncorrecto("Revisa las asociaciones del vídeo: el azul se vincula a confianza/seguridad.")
  );

  addMC(
    "2) El rojo en comunicación visual suele provocar…",
    ["Sensación de urgencia/alta activación", "Serenidad y calma", "Neutralidad emocional", "Frialdad y distancia"],
    0, 1,
    fbCorrecto("El rojo activa, transmite energía/urgencia."),
    fbIncorrecto("Según el vídeo, el rojo se asocia a energía, pasión y urgencia.")
  );

  addMC(
    "3) Para una app de salud o ecología, ¿qué paleta es más coherente?",
    ["Verdes y azules suaves", "Rojos saturados", "Negros con dorados", "Neones contrastados"],
    0, 1,
    fbCorrecto("Verdes y azules suaves transmiten calma, naturaleza, confianza."),
    fbIncorrecto("Para salud/eco se prefieren verdes/azules suaves por sus asociaciones.")
  );

  addMC(
    "4) El negro en marcas como Chanel o Nike transmite principalmente…",
    ["Sofisticación y elegancia", "Naturalidad", "Relajación", "Desorden"],
    0, 1,
    fbCorrecto("El negro se relaciona con elegancia, sofisticación y premium."),
    fbIncorrecto("El negro se vincula a sofisticación y elegancia en el vídeo.")
  );

  addMC(
    "5) Según el vídeo, el color amarillo se asocia sobre todo a…",
    ["Alegría y optimismo", "Tristeza y apatía", "Tecnología y precisión", "Misterio y lujo"],
    0, 1,
    fbCorrecto("El amarillo comunica optimismo, energía, positividad."),
    fbIncorrecto("Revisa el vídeo: el amarillo se asocia con optimismo/alegría.")
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 2) Círculo cromático y armonías (5 preguntas) – PDF 08-Color.pdf
  addCriterio("Criterio 2 · Círculo cromático y armonías (5 preguntas)",
              "Complementarios, análogos, tríadas, monocromía y contraste.");

  addMC(
    "6) Una armonía complementaria se basa en…",
    ["Colores opuestos en el círculo cromático", "Tres colores equidistantes", "Colores adyacentes", "Una gama neutra (grises)"],
    0, 1,
    fbCorrecto("Complementarios = opuestos en el círculo cromático."),
    fbIncorrecto("Complementarios son colores opuestos en el círculo cromático.")
  );

  addMC(
    "7) Una armonía análoga se compone de…",
    ["Colores adyacentes entre sí", "Negro, blanco y gris", "Opuestos exactos", "Un color y su complementario"],
    0, 1,
    fbCorrecto("Análogos = vecinos en el círculo cromático."),
    fbIncorrecto("Análogos son colores adyacentes en el círculo cromático.")
  );

  addMC(
    "8) Una tríada cromática se forma con…",
    ["Tres colores equidistantes en el círculo", "Un color y su complementario", "Dos análogos y un neutro", "Un color y dos acentos sin relación"],
    0, 1,
    fbCorrecto("Tríada: tres colores distribuidos a 120° (equidistantes)."),
    fbIncorrecto("Tríada son tres colores equidistantes en el círculo cromático.")
  );

  addMC(
    "9) Usar complementarios muy saturados juntos tiende a…",
    ["Generar vibración/alto contraste visual", "Bajar el contraste", "Mejorar siempre la legibilidad", "Eliminar la fatiga visual"],
    0, 1,
    fbCorrecto("Complementarios saturados juntos vibran y fatigan si no se moderan."),
    fbIncorrecto("Cuidado: complementarios saturados generan vibración visual.")
  );

  addMC(
    "10) Una armonía monocromática se define como…",
    ["Variaciones de un mismo color (valor/saturación)", "Opuestos exactos en el círculo", "Tres colores equidistantes", "Colores adyacentes"],
    0, 1,
    fbCorrecto("Monocromía: un color con variaciones de valor/saturación."),
    fbIncorrecto("Monocromía usa un único tono con variaciones de valor/saturación.")
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 3) Regla 60/30/10 y uso de degradados (5 preguntas) – PDF 08-Color.pdf
  addCriterio("Criterio 3 · Regla 60/30/10 y degradados (5 preguntas)",
              "Proporciones de color y buenas prácticas con degradados.");

  addMC(
    "11) En la regla 60/30/10, el reparto más acertado es…",
    [
      "60% color dominante (fondos), 30% secundario (componentes), 10% acento",
      "60% acento, 30% dominante, 10% secundario",
      "33% cada color para equilibrio perfecto",
      "50% dominante, 50% acento"
    ],
    0, 1,
    fbCorrecto("Dominante 60, secundario 30, acento 10."),
    fbIncorrecto("Recuerda: 60/30/10 = dominante/ secundario/ acento.")
  );

  addMC(
    "12) Un error común al aplicar el color de acento es…",
    [
      "Usarlo en más del ~10–15% de la interfaz",
      "Aplicarlo solo a elementos clave",
      "Controlar su contraste con el fondo",
      "Usarlo de forma consistente en estados"
    ],
    0, 1,
    fbCorrecto("Si el acento supera ~10–15%, pierde su valor jerárquico."),
    fbIncorrecto("El acento debe mantenerse bajo (~10%) para mantener su fuerza.")
  );

  addMC(
    "13) Buena práctica al usar degradados en fondos ‘hero’…",
    [
      "Transición sutil entre tonos análogos",
      "Complementarios puros saturados siempre",
      "Variar abruptamente el ángulo en cada pantalla",
      "Ignorar la paleta base"
    ],
    0, 1,
    fbCorrecto("Degradados sutiles y coherentes con la paleta suelen funcionar mejor."),
    fbIncorrecto("Evita cambios bruscos y combinaciones estridentes; usa análogos sutiles.")
  );

  addMC(
    "14) En un degradado con texto encima, lo esencial es…",
    [
      "Mantener contraste de texto conforme a WCAG (≥ 4.5:1)",
      "Bajar el contraste para suavidad",
      "Poner texto en degradado también",
      "Usar 3+ colores sin control"
    ],
    0, 1,
    fbCorrecto("La legibilidad manda: relación de contraste mínima AA 4.5:1."),
    fbIncorrecto("Asegura contraste suficiente (AA ≥ 4.5:1) para que el texto se lea.")
  );

  addMC(
    "15) Si el color de acento supera el 15% del diseño, ¿qué suele ocurrir?",
    [
      "Pierde fuerza jerárquica y satura la interfaz",
      "Aumenta la claridad del diseño",
      "Mejora siempre la accesibilidad",
      "Favorece la atención selectiva sin efectos secundarios"
    ],
    0, 1,
    fbCorrecto("Demasiado acento deja de ser ‘acento’ y contamina la jerarquía."),
    fbIncorrecto("El acento debe ser escaso para mantener su poder de destacar.")
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 4) Creatividad y coherencia visual (5 preguntas) – WebQuest + temario
  addCriterio("Criterio 4 · Creatividad y coherencia visual (5 preguntas)",
              "Consistencia, jerarquía, uso consciente de la paleta, estados y mensajes.");

  addMC(
    "16) La consistencia de color en estados (normal/hover/activo) sirve para…",
    [
      "Refuerzo de patrones mentales y usabilidad",
      "Evitar contrastes suficientes",
      "Hacer cada pantalla impredecible",
      "Reducir la accesibilidad"
    ],
    0, 1,
    fbCorrecto("La consistencia ayuda a aprender los patrones y mejora la UX."),
    fbIncorrecto("Mantén consistencia en estados para reforzar patrones de uso.")
  );

  addMC(
    "17) Para jerarquía visual, la mejor forma de destacar un elemento principal es…",
    [
      "Usar el color de acento definido para destacar",
      "Usar el mismo color que el fondo",
      "Quitar el acento de los botones",
      "Cambiar de color en cada pantalla"
    ],
    0, 1,
    fbCorrecto("Define un color de acento y úsalo con intención para lo importante."),
    fbIncorrecto("Usar el acento correctamente ayuda a priorizar la atención.")
  );

  addMC(
    "18) Una práctica que perjudica la coherencia visual es…",
    [
      "Usar muchos colores sin un propósito claro",
      "Limitar la paleta a la definida",
      "Restringir acentos a elementos clave",
      "Aplicar reglas consistentes por patrón"
    ],
    0, 1,
    fbCorrecto("La sobrecarga cromática sin criterio rompe la coherencia."),
    fbIncorrecto("Evita paletas arbitrarias; mantén una identidad cromática clara.")
  );

  addMC(
    "19) En pantallas de error o estados vacíos, lo más recomendable es…",
    [
      "Mantenerse dentro de la paleta y reforzar mensajes",
      "Usar colores aleatorios para llamar atención",
      "Quitar el acento para que no destaque",
      "Cambiar completamente la identidad cromática"
    ],
    0, 1,
    fbCorrecto("Sé coherente con la identidad y comunica con claridad."),
    fbIncorrecto("La coherencia cromática refuerza la comprensión del estado.")
  );

  addMC(
    "20) La excesiva variedad cromática sin justificación en una interfaz provoca…",
    [
      "Ruido visual y pérdida de coherencia",
      "Una jerarquía más clara",
      "Mayor legibilidad automática",
      "Mejor accesibilidad en todos los casos"
    ],
    0, 1,
    fbCorrecto("Demasiados colores sin criterio generan ruido y confusión."),
    fbIncorrecto("Reduce la paleta y mantén la coherencia para mejorar la UX.")
  );

  // Listo: enlaces de edición y publicación
  Logger.log("Formulario creado ✅");
  Logger.log("Editar (URL de edición): " + form.getEditUrl());
  Logger.log("Responder (URL pública): " + form.getPublishedUrl());
}
