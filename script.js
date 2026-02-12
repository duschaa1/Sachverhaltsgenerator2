{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0  (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' \
diff --git a/script.js b/script.js\
index 258ccbf11b2750db7a8c59b2c286be34538e5a5a..211fc3b2d783497f7b17919111407595b351b2af 100644\
--- a/script.js\
+++ b/script.js\
@@ -1,58 +1,225 @@\
-\{\\rtf1\\ansi\\ansicpg1252\\cocoartf2709\
-\\cocoatextscaling0\\cocoaplatform0\{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;\}\
-\{\\colortbl;\\red255\\green255\\blue255;\}\
-\{\\*\\expandedcolortbl;;\}\
-\\paperw11900\\paperh16840\\margl1440\\margr1440\\vieww11520\\viewh8400\\viewkind0\
-\\pard\\tx720\\tx1440\\tx2160\\tx2880\\tx3600\\tx4320\\tx5040\\tx5760\\tx6480\\tx7200\\tx7920\\tx8640\\pardirnatural\\partightenfactor0\
-\
-\\f0\\fs24 \\cf0 function renderForm() \\\{\\\
-  const delikt = document.getElementById('delikt').value;\\\
-  const container = document.getElementById('form-container');\\\
-  container.innerHTML = '';\\\
-\\\
-  if(!delikt) return;\\\
-\\\
-  const fields = [\\\
-    \\\{id:'name1', label:'Beteiligter 01 Name', placeholder:'Max Mustermann'\\\},\\\
-    \\\{id:'name2', label:'Beteiligter 02 Name', placeholder:'Erika Beispiel'\\\},\\\
-    \\\{id:'ort', label:'Ort', placeholder:'Musterstadt'\\\},\\\
-    \\\{id:'datum', label:'Datum', type:'date'\\\},\\\
-    \\\{id:'uhrzeit', label:'Uhrzeit', type:'time'\\\}\\\
-  ];\\\
-\\\
-  // Deliktspezifische Felder\\\
-  if(delikt === 'diebstahl') \\\{\\\
-    fields.push(\\\{id:'objekt', label:'Tatobjekt', placeholder:'Laptop'\\\});\\\
-    fields.push(\\\{id:'wert', label:'Wert', placeholder:'500 EUR'\\\});\\\
-  \\\} else if(delikt === 'koerperverletzung') \\\{\\\
-    fields.push(\\\{id:'tatmittel', label:'Tatmittel', placeholder:'Faust'\\\});\\\
-    fields.push(\\\{id:'verletzung', label:'Verletzung', placeholder:'Prellung am Arm'\\\});\\\
-  \\\} else if(delikt === 'betrug') \\\{\\\
-    fields.push(\\\{id:'betrugshandlung', label:'T\\'e4uschungshandlung', placeholder:'Online-Anzeige'\\\});\\\
-    fields.push(\\\{id:'schaden', label:'Schaden', placeholder:'1000 EUR'\\\});\\\
-  \\\} else if(delikt === 'sachbeschaedigung') \\\{\\\
-    fields.push(\\\{id:'gegenstand', label:'Besch\\'e4digtes Objekt', placeholder:'Fensterscheibe'\\\});\\\
-  \\\} else if(delikt === 'hausfriedensbruch') \\\{\\\
-    fields.push(\\\{id:'objekt', label:'Ort des Hausfriedensbruchs', placeholder:'Wohnung'\\\});\\\
-  \\\} else if(delikt === 'noetigung') \\\{\\\
-    fields.push(\\\{id:'handlung', label:'N\\'f6tigungshandlung', placeholder:'Drohung'\\\});\\\
-  \\\} else if(delikt === 'trunkenheitsfahrt') \\\{\\\
-    fields.push(\\\{id:'fahrzeug', label:'Fahrzeugart', placeholder:'Pkw'\\\});\\\
-    fields.push(\\\{id:'alkohol', label:'Promille', placeholder:'1,2'\\\});\\\
-  \\\} else if(delikt === 'wildunfall') \\\{\\\
-    fields.push(\\\{id:'tier', label:'Wildart', placeholder:'Reh'\\\});\\\
-  \\\}\\\
-\\\
-  fields.forEach(f => \\\{\\\
-    const label = document.createElement('label');\\\
-    label.textContent = f.label;\\\
-    container.appendChild(label);\\\
-\\\
-    const input = document.createElement('input');\\\
-    input.id = f.id;\\\
-    input.placeholder = f.placeholder || '';\\\
-    input.type = f.type || 'text';\\\
-    container.appendChild(input);\\\
-  \\\});\\\
-\\\}\\\
-\}\
\\ No newline at end of file\
+const participantContainer = document.getElementById("participants");\
+const participantTemplate = document.getElementById("participant-template").innerHTML;\
+const participantIds = ["01", "02"];\
+const extraBausteine = [];\
+\
+const deliktMuster = \{\
+  "K\'f6rperverletzung": "Der Beschuldigte verletzte den Gesch\'e4digten k\'f6rperlich durch Schl\'e4ge. Die Angaben wurden durch Zeugen best\'e4tigt.",\
+  "Beleidigung": "Der Beschuldigte beleidigte den Gesch\'e4digten durch ehrverletzende \'c4u\'dferungen im \'f6ffentlichen Raum.",\
+  "gef\'e4hrliche K\'f6rperverletzung": "Der Beschuldigte setzte ein gef\'e4hrliches Tatmittel ein und verletzte den Gesch\'e4digten erheblich.",\
+  "Bedrohung": "Der Beschuldigte bedrohte den Gesch\'e4digten mit der Begehung eines Verbrechens gegen ihn.",\
+  "N\'f6tigung": "Der Beschuldigte n\'f6tigte den Gesch\'e4digten durch Drohung zu einem bestimmten Verhalten.",\
+  "N\'f6tigung im Stra\'dfenverkehr": "Der Beschuldigte n\'f6tigte andere Verkehrsteilnehmer durch dichtes Auffahren und aggressives Fahrverhalten.",\
+  "Trunkenheit im Stra\'dfenverkehr": "Der Beschuldigte f\'fchrte ein Kraftfahrzeug unter alkoholischer Beeinflussung im \'f6ffentlichen Stra\'dfenverkehr.",\
+  "Unerlaubtes Entfernen vom Unfallort": "Der Beschuldigte entfernte sich nach einem Verkehrsunfall vom Unfallort, ohne die Feststellungen zu erm\'f6glichen.",\
+  "Sachbesch\'e4digung": "Der Beschuldigte besch\'e4digte eine fremde Sache vors\'e4tzlich."\
+\};\
+\
+function val(id, fallback = "") \{\
+  const el = document.getElementById(id);\
+  return el && el.value ? el.value.trim() : fallback;\
+\}\
+\
+function addParticipant(id) \{\
+  if (participantIds.includes(id)) return;\
+  participantIds.push(id);\
+  renderParticipants();\
+  updateRoleLabels();\
+\}\
+\
+function renderParticipants() \{\
+  participantContainer.innerHTML = participantIds\
+    .map((id) => participantTemplate.replaceAll("__ID__", id))\
+    .join("");\
+\}\
+\
+function initDragAndDrop() \{\
+  document.querySelectorAll(".drag-item").forEach((item) => \{\
+    item.addEventListener("dragstart", (e) => \{\
+      e.dataTransfer.setData("text/plain", item.dataset.type || item.textContent.trim());\
+      e.dataTransfer.effectAllowed = "copy";\
+    \});\
+  \});\
+\
+  const caseDrop = document.getElementById("caseTypeDrop");\
+  caseDrop.addEventListener("dragover", (e) => e.preventDefault());\
+  caseDrop.addEventListener("drop", (e) => \{\
+    e.preventDefault();\
+    const dropped = e.dataTransfer.getData("text/plain");\
+    if (["verkehrsunfall", "verkehrsstraftat", "straftat"].includes(dropped)) \{\
+      document.getElementById("caseType").value = dropped;\
+      caseDrop.textContent = dropped === "verkehrsunfall"\
+        ? "Verkehrsunfall"\
+        : dropped === "verkehrsstraftat"\
+          ? "Verkehrsstraftat"\
+          : "Straftat";\
+      applyCaseTypeUI();\
+    \}\
+  \});\
+\
+  const bDrop = document.getElementById("bausteinDrop");\
+  bDrop.addEventListener("dragover", (e) => e.preventDefault());\
+  bDrop.addEventListener("drop", (e) => \{\
+    e.preventDefault();\
+    const txt = e.dataTransfer.getData("text/plain");\
+    if (!extraBausteine.includes(txt)) extraBausteine.push(txt);\
+    bDrop.textContent = extraBausteine.join(" | ");\
+  \});\
+\}\
+\
+function setVorfahrtEnabled() \{\
+  const enabled = val("unfallart") === "Vorfahrtsversto\'df";\
+  const v = document.getElementById("vorfahrtRegel");\
+  v.disabled = !enabled;\
+  if (!enabled) v.value = "";\
+\}\
+\
+function applyCaseTypeUI() \{\
+  const caseType = val("caseType", "verkehrsunfall");\
+  const isStraftat = caseType === "straftat";\
+  const isVU = caseType === "verkehrsunfall";\
+\
+  document.getElementById("vuOnlyFields").style.display = isStraftat ? "none" : "grid";\
+  document.getElementById("straftatVehicleFields").style.display = isStraftat ? "grid" : "none";\
+\
+  document.getElementById("dateLabel").firstChild.textContent = isStraftat ? "Tatdatum" : (isVU ? "Unfalldatum" : "Tattag");\
+  document.getElementById("timeLabel").firstChild.textContent = isStraftat ? "Tatzeit" : (isVU ? "Unfallzeit" : "Tatzeit");\
+  document.getElementById("ortLabel").firstChild.textContent = isStraftat ? "Tatort" : (isVU ? "Unfallort" : "Tatort");\
+\
+  document.querySelectorAll(".direction-field").forEach((el) => \{\
+    el.style.display = isStraftat ? "none" : "flex";\
+  \});\
+\
+  updateRoleLabels();\
+  setVorfahrtEnabled();\
+\}\
+\
+function updateRoleLabels() \{\
+  const caseType = val("caseType", "verkehrsunfall");\
+  const role01 = caseType === "verkehrsstraftat" ? "Beschuldigter 01" : "Beteiligter 01";\
+  participantIds.forEach((id) => \{\
+    const el = document.getElementById(`participantTitle_$\{id\}`);\
+    if (el) el.textContent = id === "01" ? role01 : `Beteiligter $\{id\}`;\
+  \});\
+\}\
+\
+function participantData(id) \{\
+  return \{\
+    id,\
+    anrede: val(`anrede_$\{id\}`, "Herr"),\
+    name: val(`name_$\{id\}`, "..."),\
+    fahrzeugart: val(`fahrzeugart_$\{id\}`, "Pkw"),\
+    kennzeichen: val(`kennzeichen_$\{id\}`, "XX-XX111"),\
+    richtung: val(`richtung_$\{id\}`, "Norden"),\
+    verletzung: val(`verletzung_$\{id\}`, "unverletzt"),\
+    schadensart: val(`schadensart_$\{id\}`, "nicht bekannt"),\
+    schadenshoehe: val(`schadenshoehe_$\{id\}`, "nicht beziffert"),\
+  \};\
+\}\
+\
+function buildMassnahmen() \{\
+  const lines = [];\
+  if (document.getElementById("mLichtbilder").checked) lines.push("Es wurden Lichtbilder gefertigt und eine Lichtbildtafel erstellt.");\
+  if (document.getElementById("mSkizze").checked) lines.push("Eine Handskizze der Situation wurde gefertigt.");\
+  if (document.getElementById("mAnhoerung01").checked) lines.push("Beteiligter 01 wurde belehrt und zur Sache vernommen.");\
+  if (document.getElementById("mZeuge02").checked) lines.push("Beteiligter 02 wurde als Zeuge belehrt und vernommen.");\
+\
+  Array.from(document.getElementById("nichtGeaeussert").selectedOptions)\
+    .map((o) => o.value)\
+    .filter((id) => participantIds.includes(id))\
+    .forEach((id) => \{\
+      lines.push(`\'c4u\'dferungsbogen Beteiligter $\{id\}: Kein R\'fccklauf; es wird davon ausgegangen, dass sich Beteiligter $\{id\} nicht \'e4u\'dfern m\'f6chte.`);\
+    \});\
+\
+  return lines.join(" ");\
+\}\
+\
+function generateSachverhalt() \{\
+  const caseType = val("caseType", "verkehrsunfall");\
+  const datum = val("datum", "__.__.____");\
+  const uhrzeit = val("uhrzeit", "__:__");\
+  const ort = val("ort", "...");\
+  const delikt = val("delikt", "K\'f6rperverletzung");\
+  const unfallart = val("unfallart", "Vorfahrtsversto\'df");\
+  const vorfahrt = val("vorfahrtRegel", "");\
+\
+  const people = participantIds.map(participantData);\
+  const role01 = caseType === "verkehrsstraftat" ? "Beschuldigter 01" : "Beteiligter 01";\
+\
+  let header = "";\
+  let kern = "";\
+\
+  if (caseType === "verkehrsunfall") \{\
+    header = `Unfallhergang:\\nAm $\{datum\}, um $\{uhrzeit\} Uhr, ereignete sich in $\{ort\} ein Verkehrsunfall ($\{unfallart\}).`;\
+    const fahrten = people.map((p) => `Beteiligter $\{p.id\}, $\{p.anrede\} $\{p.name\}, befuhr mit $\{p.anrede === "Frau" ? "ihrem" : "seinem"\} Fahrzeug ($\{p.fahrzeugart\}, Kennzeichen $\{p.kennzeichen\}) in Richtung $\{p.richtung\}.`).join(" ");\
+    kern = unfallart === "Vorfahrtsversto\'df" ? `Es kam zum Vorfahrtsversto\'df, geregelt durch $\{vorfahrt || "nicht angegeben"\}. $\{fahrten\}` : `Es kam zum Zusammensto\'df. $\{fahrten\}`;\
+  \} else if (caseType === "verkehrsstraftat") \{\
+    header = `Sachverhalt Verkehrsstraftat:\\nAm $\{datum\}, um $\{uhrzeit\} Uhr, ereignete sich in $\{ort\} ein Vorfall im Stra\'dfenverkehr.`;\
+    kern = `$\{role01\} ($\{people[0].anrede\} $\{people[0].name\}) steht im Verdacht des Delikts: $\{delikt\}. $\{deliktMuster[delikt]\}`;\
+  \} else \{\
+    const kfzText = document.getElementById("kfzBezug").checked\
+      ? ` Kfz-Bezug: $\{val("kfzBeschreibung", "Fahrzeug nicht n\'e4her bezeichnet")\}, Kennzeichen $\{val("kfzKennzeichen", "unbekannt")\}.`\
+      : "";\
+    header = `Sachverhalt Straftat:\\nTatdatum: $\{datum\}, Tatzeit: $\{uhrzeit\}, Tatort: $\{ort\}.`;\
+    kern = `Delikt: $\{delikt\}. $\{deliktMuster[delikt]\}$\{kfzText\}`;\
+  \}\
+\
+  const folgen = people.map((p) => `Beteiligter $\{p.id\}: Verletzung $\{p.verletzung\}; Schadensart $\{p.schadensart\}; Schadensh\'f6he $\{p.schadenshoehe\}.`).join("\\n");\
+  const massnahmen = buildMassnahmen() || "Keine besonderen Ma\'dfnahmen dokumentiert.";\
+  const bausteine = extraBausteine.length ? `Zusatzbausteine: $\{extraBausteine.join(", ")\}.` : "";\
+\
+  const text = [\
+    header,\
+    kern,\
+    "",\
+    "Unfallfolgen / Folgen:",\
+    folgen,\
+    "",\
+    "Ma\'dfnahmen:",\
+    massnahmen,\
+    bausteine,\
+    "",\
+    "Bewertung:",\
+    `Mustersachverhalt f\'fcr Delikt "$\{delikt\}" wurde angewendet.`,\
+  ].join("\\n");\
+\
+  document.getElementById("output").value = text;\
+  return text;\
+\}\
+\
+async function copyToClipboard() \{\
+  const output = document.getElementById("output");\
+  if (!output.value) generateSachverhalt();\
+  try \{\
+    await navigator.clipboard.writeText(output.value);\
+    alert("Kopiert.");\
+  \} catch \{\
+    output.select();\
+    document.execCommand("copy");\
+  \}\
+\}\
+\
+function exportWord() \{\
+  const text = generateSachverhalt();\
+  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body><pre>$\{text.replace(/</g, "&lt;")\}</pre></body></html>`;\
+  const blob = new Blob([html], \{ type: "application/msword;charset=utf-8" \});\
+  const link = document.createElement("a");\
+  link.href = URL.createObjectURL(blob);\
+  link.download = "Sachverhalt.doc";\
+  document.body.appendChild(link);\
+  link.click();\
+  link.remove();\
+  URL.revokeObjectURL(link.href);\
+\}\
+\
+renderParticipants();\
+initDragAndDrop();\
+applyCaseTypeUI();\
+\
+document.getElementById("caseTypeDrop").textContent = "Verkehrsunfall";\
+document.getElementById("btnAdd3").addEventListener("click", () => addParticipant("03"));\
+document.getElementById("btnAdd4").addEventListener("click", () => addParticipant("04"));\
+document.getElementById("unfallart").addEventListener("change", setVorfahrtEnabled);\
+document.getElementById("btnGenerate").addEventListener("click", generateSachverhalt);\
+document.getElementById("btnCopy").addEventListener("click", copyToClipboard);\
+document.getElementById("btnWord").addEventListener("click", exportWord);\
 \
EOF\
)}