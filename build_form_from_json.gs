
/**
 * Crea un formulario de Google a partir de un JSON.
 * En el editor de Apps Script: pega este código y ejecuta buildFormFromJson().
 */
function buildFormFromJson() {
  var data = {
  "title": "Cuestionario: Introducción a la psicología del color",
  "description": "Mini cuestionario para activar conocimientos previos y comprobar la comprensión del el vídeo.",
  "isQuiz": true,
  "videoUrl": "https://www.youtube.com/watch?v=q7IuRT3vmVQ",
  "sections": [
    {
      "title": "Bloque 1 · Conocimientos previos y reflexión",
      "items": [
        {
          "type": "MULTIPLE_CHOICE",
          "title": "¿Habías oído antes hablar de la “psicología del color”?",
          "options": [
            "Sí, lo conocía bien",
            "Lo había oído, pero no sabía qué significaba",
            "No, nunca lo había escuchado"
          ],
          "required": true,
          "points": 0
        },
        {
          "type": "MULTIPLE_CHOICE",
          "title": "Cuando piensas en el color rojo, ¿qué emociones o ideas te transmite?",
          "options": [
            "Peligro / alerta",
            "Pasión / amor",
            "Fuerza / energía",
            "Otro (especifica en la siguiente pregunta)"
          ],
          "required": true,
          "points": 0
        },
        {
          "type": "SHORT_ANSWER",
          "title": "Si has respondido 'Otro', escribe aquí qué te transmite el color rojo:",
          "required": false,
          "points": 0
        },
        {
          "type": "MULTIPLE_CHOICE",
          "title": "Antes de ver el vídeo, ¿qué color habrías elegido para una app de salud o bienestar?",
          "options": [
            "Verde",
            "Azul",
            "Naranja",
            "Otro (especifica en la siguiente pregunta)"
          ],
          "required": true,
          "points": 0
        },
        {
          "type": "SHORT_ANSWER",
          "title": "Si has respondido 'Otro', indica qué color y por qué:",
          "required": false,
          "points": 0
        },
        {
          "type": "MULTIPLE_CHOICE",
          "title": "¿Crees que el color puede influir en la confianza que nos genera una marca o app?",
          "options": [
            "Sí, mucho",
            "Algo, pero no decisivo",
            "No lo creo"
          ],
          "required": true,
          "points": 0
        }
      ]
    },
    {
      "title": "Bloque 2 · Comprensión del vídeo",
      "items": [
        {
          "type": "MULTIPLE_CHOICE",
          "title": "Según el vídeo, el color azul suele transmitir…",
          "options": [
            "Calma, confianza y seguridad",
            "Peligro y advertencia",
            "Exclusividad y lujo",
            "Energía y dinamismo"
          ],
          "correctIndex": 0,
          "required": true,
          "points": 1
        },
        {
          "type": "MULTIPLE_CHOICE",
          "title": "El color amarillo se asocia principalmente con…",
          "options": [
            "Tristeza y apatía",
            "Alegría y optimismo",
            "Tecnología y precisión",
            "Naturaleza y ecología"
          ],
          "correctIndex": 1,
          "required": true,
          "points": 1
        },
        {
          "type": "MULTIPLE_CHOICE",
          "title": "El vídeo explica que el negro se usa en marcas como Chanel o Nike porque comunica…",
          "options": [
            "Sofisticación y elegancia",
            "Peligro",
            "Naturalidad",
            "Relajación"
          ],
          "correctIndex": 0,
          "required": true,
          "points": 1
        },
        {
          "type": "PARAGRAPH",
          "title": "Tras ver el vídeo, ¿qué color elegirías para una app de deporte y por qué?",
          "required": false,
          "points": 0
        }
      ]
    }
  ]
};
  var form = FormApp.create(data.title || "Cuestionario de psicología del color");
  if (data.description) form.setDescription(data.description);
  if (data.isQuiz) form.setIsQuiz(true);

  if (data.videoUrl) {
    try {
      form.addVideoItem().setVideoUrl(data.videoUrl).setTitle("Vídeo: Introducción a la psicología del color");
    } catch (e) {
      Logger.log("No se pudo añadir el vídeo: " + e);
    }
  }

  (data.sections || []).forEach(function(section, idx) {
    if (idx > 0) {
      form.addPageBreakItem().setTitle(section.title || ("Sección " + (idx+1)));
    } else if (section.title) {
      form.addSectionHeaderItem().setTitle(section.title);
    }
    (section.items || []).forEach(function(item) {
      var t = (item.type || "").toUpperCase();
      if (t === "MULTIPLE_CHOICE") {
        var mc = form.addMultipleChoiceItem().setTitle(item.title || "Pregunta").setRequired(!!item.required);
        var choices = [];
        (item.options || []).forEach(function(opt, i){
          if (typeof item.correctIndex === "number") {
            choices.push(mc.createChoice(opt, i === item.correctIndex));
          } else {
            choices.push(mc.createChoice(opt));
          }
        });
        if (choices.length) mc.setChoices(choices);
        if (data.isQuiz && item.points) { try { mc.setPoints(item.points); } catch(e) {} }
      } else if (t === "SHORT_ANSWER" || t === "SHORT") {
        var ti = form.addTextItem().setTitle(item.title || "Respuesta corta").setRequired(!!item.required);
        if (data.isQuiz && item.points) { try { ti.setPoints(item.points); } catch(e) {} }
      } else if (t === "PARAGRAPH") {
        var pi = form.addParagraphTextItem().setTitle(item.title || "Respuesta larga").setRequired(!!item.required);
        if (data.isQuiz && item.points) { try { pi.setPoints(item.points); } catch(e) {} }
      } else {
        form.addTextItem().setTitle(item.title || "Pregunta").setRequired(!!item.required);
      }
    });
  });

  Logger.log("Formulario creado. Edita aquí: " + form.getEditUrl());
  Logger.log("URL pública (para compartir): " + form.getPublishedUrl());
}
