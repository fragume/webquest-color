/**
 * Autoevaluación WebQuest: Color en Interfaces (20 preguntas, 4 bloques)
 * - Sin números en los enunciados.
 * - Orden de bloques: Psicología → 60/30/10+degradados → Creatividad/coherencia → Armonías (al final).
 * - Baraja preguntas en cada bloque (no mezcla bloques).
 * - Baraja opciones en cada pregunta (correcta en posición aleatoria).
 * - Feedback por pregunta (correcto/incorrecto).
 */
function crearFormularioAutoevaluacionWebQuest() {
  const form = FormApp.create("Autoevaluación · WebQuest: Color en Interfaces (CFGS DAM)");
  form.setIsQuiz(true);
  form.setDescription(
    "Autoevaluación tipo test (20 preguntas). Recibirás la corrección automática al enviar.\n" +
    "Bloques: Psicología del color · Regla 60/30/10 y degradados · Creatividad/coherencia visual · Armonías (extra, al final)."
  );
  // Mantenemos bloques; barajamos internamente en cada uno
  form.setShuffleQuestions(false);

  // Identificación
  form.addTextItem().setTitle("Nombre y apellidos").setRequired(true);
  form.addTextItem().setTitle("Grupo/Curso").setRequired(true);

  // Helpers de feedback
  const fbOk  = (txt) => FormApp.createFeedback().setText("✅ Correcto. " + (txt || "")).build();
  const fbErr = (txt) => FormApp.createFeedback().setText("❌ Incorrecto. " + (txt || "")).build();

  // Mezcla in-situ (Fisher–Yates)
  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Crea un bloque como página, barajando preguntas y opciones.
   * q: { title, options[], correctIndex, points, okMsg?, errMsg? }
   */
  function addMCSection(sectionTitle, questions) {
    form.addPageBreakItem().setTitle(sectionTitle);

    const qs = shuffleInPlace(questions.slice()); // baraja preguntas del bloque

    qs.forEach(q => {
      if (!q || !Array.isArray(q.options) || q.options.length < 2) {
        throw new Error("Pregunta mal definida en bloque: " + sectionTitle + " → " + (q && q.title));
      }
      const pts = (typeof q.points === "number" ? q.points : 1);
      const ci  = (typeof q.correctIndex === "number" && q.correctIndex >= 0 && q.correctIndex < q.options.length)
        ? q.correctIndex : 0;

      const item = form.addMultipleChoiceItem();
      item.setTitle(q.title).setRequired(true);

      // Construir opciones con flag de correcta y barajar
      const opts = q.options.map((text, i) => ({ text, correct: i === ci }));
      shuffleInPlace(opts);

      // Crear choices marcando la correcta por flag (no por posición)
      const choices = opts.map(o => item.createChoice(o.text, o.correct));
      item.setChoices(choices);

      try { item.setPoints(pts); } catch (e) {}

      // Feedback (opcional)
      try { if (q.okMsg)  item.setFeedbackForCorrect(fbOk(q.okMsg)); } catch (e) {}
      try { if (q.errMsg) item.setFeedbackForIncorrect(fbErr(q.errMsg)); } catch (e) {}
    });
  }

  // ───────────────────────────────────────────────────────────────
  // 1) Psicología del color (5 preguntas) — vídeo + PDF
  addMCSection("Bloque 1 · Psicología del color (5 preguntas)", [
    {
      title: "El color azul suele asociarse principalmente a…",
      options: ["Confianza y seguridad", "Peligro y advertencia", "Exclusividad y lujo", "Alta excitación/urgencia"],
      correctIndex: 0, points: 1,
      okMsg: "El azul comunica calma, confianza y seguridad.",
      errMsg: "Revisa el vídeo: el azul se vincula a confianza/seguridad."
    },
    {
      title: "El rojo en comunicación visual suele provocar…",
      options: ["Sensación de urgencia/alta activación", "Serenidad y calma", "Neutralidad emocional", "Frialdad y distancia"],
      correctIndex: 0, points: 1,
      okMsg: "El rojo activa: energía, pasión, urgencia.",
      errMsg: "El rojo se asocia a alta activación, no a calma/neutralidad."
    },
    {
      title: "Para una app de salud o ecología, ¿qué paleta es más coherente?",
      options: ["Verdes y azules suaves", "Rojos saturados", "Negros con dorados", "Neones contrastados"],
      correctIndex: 0, points: 1,
      okMsg: "Verdes/azules suaves transmiten calma, naturaleza, confianza.",
      errMsg: "Para salud/eco se priorizan verdes/azules suaves."
    },
    {
      title: "El negro en marcas como Chanel o Nike transmite principalmente…",
      options: ["Sofisticación y elegancia", "Naturalidad", "Relajación", "Desorden"],
      correctIndex: 0, points: 1,
      okMsg: "Negro: elegancia, sofisticación, premium.",
      errMsg: "El negro en el vídeo se asocia a sofisticación."
    },
    {
      title: "Según el vídeo, el color amarillo se asocia sobre todo a…",
      options: ["Alegría y optimismo", "Tristeza y apatía", "Tecnología y precisión", "Misterio y lujo"],
      correctIndex: 0, points: 1,
      okMsg: "Amarillo: optimismo, energía, positividad.",
      errMsg: "Revisa el vídeo: el amarillo se vincula a optimismo/alegría."
    }
  ]);

  // 2) Regla 60/30/10 y degradados (5 preguntas) — PDF
  addMCSection("Bloque 2 · Regla 60/30/10 y degradados (5 preguntas)", [
    {
      title: "En la regla 60/30/10, el reparto más acertado es…",
      options: [
        "60% color dominante (fondos), 30% secundario (componentes), 10% acento",
        "60% acento, 30% dominante, 10% secundario",
        "33% cada color para equilibrio perfecto",
        "50% dominante, 50% acento"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Dominante 60, secundario 30, acento 10.",
      errMsg: "Recuerda: 60/30/10 = dominante/ secundario/ acento."
    },
    {
      title: "Un error común al aplicar el color de acento es…",
      options: [
        "Usarlo en más del ~10–15% de la interfaz",
        "Aplicarlo solo a elementos clave",
        "Controlar su contraste con el fondo",
        "Usarlo de forma consistente en estados"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Si el acento supera ~10–15%, pierde su valor jerárquico.",
      errMsg: "El acento debe mantenerse bajo (~10%) para mantener fuerza."
    },
    {
      title: "Buena práctica al usar degradados en fondos ‘hero’…",
      options: [
        "Transición sutil entre tonos análogos",
        "Complementarios puros saturados siempre",
        "Variar abruptamente el ángulo en cada pantalla",
        "Ignorar la paleta base"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Degradados sutiles y coherentes con la paleta funcionan mejor.",
      errMsg: "Evita cambios bruscos y combinaciones estridentes; usa análogos."
    },
    {
      title: "En un degradado con texto encima, lo esencial es…",
      options: [
        "Mantener contraste de texto conforme a WCAG (≥ 4.5:1)",
        "Bajar el contraste para suavidad",
        "Poner texto en degradado también",
        "Usar 3+ colores sin control"
      ],
      correctIndex: 0, points: 1,
      okMsg: "La legibilidad manda: relación de contraste mínima AA 4.5:1.",
      errMsg: "Asegura un contraste suficiente para que el texto se lea."
    },
    {
      title: "Si el color de acento supera el 15% del diseño, ¿qué suele ocurrir?",
      options: [
        "Pierde fuerza jerárquica y satura la interfaz",
        "Aumenta la claridad del diseño",
        "Mejora siempre la accesibilidad",
        "Favorece la atención selectiva sin efectos secundarios"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Demasiado acento deja de ser ‘acento’ y contamina la jerarquía.",
      errMsg: "El acento debe ser escaso para mantener su poder de destacar."
    }
  ]);

  // 3) Creatividad y coherencia visual (5 preguntas) — PDF
  addMCSection("Bloque 3 · Creatividad y coherencia visual (5 preguntas)", [
    {
      title: "La consistencia de color en estados (normal, hover, activo) sirve para…",
      options: [
        "Refuerzo de patrones mentales y usabilidad",
        "Evitar contrastes suficientes",
        "Hacer cada pantalla impredecible",
        "Reducir la accesibilidad"
      ],
      correctIndex: 0, points: 1,
      okMsg: "La consistencia ayuda a aprender patrones y mejora la UX.",
      errMsg: "Mantén consistencia en estados para reforzar patrones de uso."
    },
    {
      title: "Para jerarquía visual, la mejor forma de destacar un elemento principal es…",
      options: [
        "Usar el color de acento definido para destacar",
        "Usar el mismo color que el fondo",
        "Quitar el acento de los botones",
        "Cambiar de color en cada pantalla"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Define un color de acento y úsalo con intención en lo importante.",
      errMsg: "Usar el acento correctamente ayuda a priorizar la atención."
    },
    {
      title: "Una práctica que perjudica la coherencia visual es…",
      options: [
        "Usar muchos colores sin un propósito claro",
        "Limitar la paleta a la definida",
        "Restringir acentos a elementos clave",
        "Aplicar reglas consistentes por patrón"
      ],
      correctIndex: 0, points: 1,
      okMsg: "La sobrecarga cromática sin criterio rompe la coherencia.",
      errMsg: "Evita paletas arbitrarias; mantén identidad cromática clara."
    },
    {
      title: "En pantallas de error o estados vacíos, lo más recomendable es…",
      options: [
        "Mantenerse dentro de la paleta y reforzar mensajes",
        "Usar colores aleatorios para llamar atención",
        "Quitar el acento para que no destaque",
        "Cambiar completamente la identidad cromática"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Sé coherente con la identidad y comunica con claridad.",
      errMsg: "La coherencia cromática refuerza la comprensión del estado."
    },
    {
      title: "La excesiva variedad cromática sin justificación en una interfaz provoca…",
      options: [
        "Ruido visual y pérdida de coherencia",
        "Una jerarquía más clara",
        "Mayor legibilidad automática",
        "Mejor accesibilidad en todos los casos"
      ],
      correctIndex: 0, points: 1,
      okMsg: "Demasiados colores sin criterio generan ruido y confusión.",
      errMsg: "Reduce la paleta y mantén coherencia para mejorar la UX."
    }
  ]);

  // 4) Armonías cromáticas (5 preguntas) — EXTRA al final
  addMCSection("Bloque 4 · Armonías cromáticas (extra, 5 preguntas)", [
    {
      title: "Una armonía complementaria se basa en…",
      options: ["Colores opuestos en el círculo cromático", "Tres colores equidistantes", "Colores adyacentes", "Una gama neutra (grises)"],
      correctIndex: 0, points: 1,
      okMsg: "Complementarios = opuestos en el círculo.",
      errMsg: "Complementarios no son adyacentes; son opuestos."
    },
    {
      title: "Una armonía análoga se compone de…",
      options: ["Colores adyacentes entre sí", "Negro, blanco y gris", "Opuestos exactos", "Un color y su complementario"],
      correctIndex: 0, points: 1,
      okMsg: "Análogos = vecinos en el círculo cromático.",
      errMsg: "Análogos no son opuestos; son adyacentes."
    },
    {
      title: "Una tríada cromática se forma con…",
      options: ["Tres colores equidistantes en el círculo", "Un color y su complementario", "Dos análogos y un neutro", "Un color y dos acentos sin relación"],
      correctIndex: 0, points: 1,
      okMsg: "Tríada: tres colores separados ~120°.",
      errMsg: "Tríada implica equidistancia en el círculo cromático."
    },
    {
      title: "Usar complementarios muy saturados juntos tiende a…",
      options: ["Generar vibración/alto contraste visual", "Bajar el contraste", "Mejorar siempre la legibilidad", "Eliminar la fatiga visual"],
      correctIndex: 0, points: 1,
      okMsg: "Complementarios saturados vibran/fatigan si no se moderan.",
      errMsg: "Cuidado: complementarios saturados generan vibración visual."
    },
    {
      title: "Una armonía monocromática se define como…",
      options: ["Variaciones de un mismo color (valor/saturación)", "Opuestos exactos en el círculo", "Tres colores equidistantes", "Colores adyacentes"],
      correctIndex: 0, points: 1,
      okMsg: "Monocromía: un tono con variaciones de valor/saturación.",
      errMsg: "Monocromía no usa opuestos; es un solo tono con variaciones."
    }
  ]);

  Logger.log("Formulario creado ✅");
  Logger.log("Editar (URL de edición): " + form.getEditUrl());
  Logger.log("Responder (URL pública): " + form.getPublishedUrl());
}
