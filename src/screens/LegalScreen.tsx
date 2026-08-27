import { ArrowLeft } from "lucide-react";

export type LegalDoc = "terms" | "privacy" | "contact";

const DOCS: Record<LegalDoc, { title: string; body: string }> = {
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    body: `
1. Anbieter

Name: Dr. Szonja Katalin Krizsán (Privatperson)
Wohnsitz: Torony, Ungarn
E-Mail: szonjakrizsan@gmail.com

2. Gegenstand der Dienstleistung

Apartment Assistant ist eine webbasierte Anwendung zur
Unterstützung von Betreibern von Ferienwohnungen.
Die Anwendung ermöglicht insbesondere die Zusammenführung von
Buchungskalendern (iCal) verschiedener Buchungsplattformen sowie
die Verwaltung von Buchungen, täglichen Aufgaben und
Gästeinformationen.
Der Funktionsumfang kann während der Beta-Phase jederzeit
erweitert, geändert oder eingeschränkt werden.

3. Registrierung und Nutzung

Die Nutzung der Dienstleistung setzt eine Registrierung voraus.
Mit der Registrierung bestätigt die Nutzerin bzw. der Nutzer, diese
Allgemeinen Geschäftsbedingungen sowie die Datenschutzerklärung
gelesen und akzeptiert zu haben.
Apartment Assistant befindet sich derzeit in einer kostenlosen
Beta-Phase.
Ein kostenpflichtiges Abonnement wird frühestens nach dem
offiziellen Produktstart eingeführt. Registrierte Nutzer werden
mindestens 14 Tage vor Einführung kostenpflichtiger Leistungen per
E-Mail informiert.

4. Verfügbarkeit der Dienstleistung

Der Anbieter ist bemüht, die Dienstleistung möglichst
unterbrechungsfrei bereitzustellen.
Ein Anspruch auf eine jederzeitige oder fehlerfreie Verfügbarkeit
besteht jedoch nicht.
Insbesondere können Wartungsarbeiten, technische Störungen oder
Einflüsse Dritter die Verfügbarkeit zeitweise einschränken.

5. Haftung

Apartment Assistant verarbeitet Daten, die von externen
Buchungsplattformen (z. B. Airbnb oder Booking.com) über
iCal-Schnittstellen bereitgestellt werden.
Für die Vollständigkeit, Aktualität und Richtigkeit dieser Daten
ist ausschließlich die jeweilige Plattform verantwortlich.
Soweit gesetzlich zulässig, haftet der Anbieter nicht für Schäden,
die auf fehlerhafte, unvollständige oder verspätet übermittelte
Daten der angebundenen Plattformen zurückzuführen sind.
Die Dienstleistung wird während der Beta-Phase ohne Gewähr und im
jeweiligen Entwicklungsstand bereitgestellt.
Die Haftung für Vorsatz und grobe Fahrlässigkeit sowie nach
zwingenden gesetzlichen Vorschriften bleibt unberührt.

6. Kündigung und Löschung des Kontos

Die Nutzerin bzw. der Nutzer kann das Benutzerkonto jederzeit ohne
Angabe von Gründen löschen.
Mit der Löschung des Kontos werden sämtliche gespeicherten
personenbezogenen Daten gelöscht, soweit keine gesetzlichen
Aufbewahrungspflichten entgegenstehen.

7. Änderungen dieser AGB

Der Anbieter behält sich vor, diese Allgemeinen
Geschäftsbedingungen anzupassen, sofern dies aufgrund technischer,
rechtlicher oder organisatorischer Änderungen erforderlich ist.
Über wesentliche Änderungen werden registrierte Nutzer rechtzeitig
per E-Mail informiert.

8. Anwendbares Recht

Für diese Nutzungsbedingungen gilt das Recht Ungarns unter
Ausschluss des UN-Kaufrechts, soweit dem keine zwingenden
gesetzlichen Verbraucherschutzvorschriften entgegenstehen.

9. Schlussbestimmungen

Sollten einzelne Bestimmungen dieser Allgemeinen
Geschäftsbedingungen ganz oder teilweise unwirksam sein oder
werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.

Gültig ab: Juni 2026
`,
  },
  privacy: {
    title: "Datenschutzerklärung",
    body: `
1. Verantwortliche Stelle

Name: Dr. Szonja Katalin Krizsán
Wohnsitz: Torony, Ungarn
E-Mail: szonjakrizsan@gmail.com

2. Welche Daten werden verarbeitet?

Im Rahmen der Nutzung von Apartment Assistant können folgende
personenbezogene Daten verarbeitet werden:

Kontodaten
- Name
- E-Mail-Adresse
- Passwort (ausschließlich in verschlüsselter Form)

Vom Nutzer eingegebene Daten
- Bezeichnungen der Ferienwohnungen
- iCal-Kalenderlinks
- Gästedaten (z. B. Name, Telefonnummer, E-Mail-Adresse)
- Zahlungsvermerke
- Aufgaben
- Notizen

3. Zweck und Rechtsgrundlage der Verarbeitung

Die Verarbeitung personenbezogener Daten erfolgt zur
Bereitstellung und Nutzung der Dienstleistung Apartment Assistant.
Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO
(Vertragserfüllung).
Soweit Nutzer personenbezogene Daten ihrer Gäste innerhalb der
Anwendung speichern, erfolgt dies ausschließlich auf ihre eigene
Verantwortung.
Die Nutzerin bzw. der Nutzer ist insoweit datenschutzrechtlich
Verantwortliche(r) im Sinne der DSGVO.
Apartment Assistant verarbeitet diese Daten ausschließlich im
Rahmen der technischen Bereitstellung der Anwendung.

4. Auftragsverarbeiter

Zur Bereitstellung der Dienstleistung werden folgende
Dienstleister eingesetzt:

- Supabase — Datenbank und Benutzerauthentifizierung
- Cloudflare — Hosting und technische Infrastruktur
- Resend — Versand von System-E-Mails
- Meta Platforms — Erfolgsmessung von Werbekampagnen (Meta Pixel),
  nur nach vorheriger Einwilligung

Mit sämtlichen Auftragsverarbeitern bestehen – soweit gesetzlich
erforderlich – Vereinbarungen zur Auftragsverarbeitung gemäß
Art. 28 DSGVO.

5. Speicherung der Daten

Die Daten werden ausschließlich über verschlüsselte Verbindungen
übertragen.
Der Zugriff auf gespeicherte Daten ist ausschließlich der
jeweiligen Nutzerin bzw. dem jeweiligen Nutzer möglich.
Personenbezogene Daten werden nur so lange gespeichert, wie dies
für die Bereitstellung der Dienstleistung erforderlich ist oder
gesetzliche Aufbewahrungspflichten bestehen.

6. Datenübermittlung in Drittländer

Soweit einzelne eingesetzte Dienstleister personenbezogene Daten
außerhalb der Europäischen Union oder des Europäischen
Wirtschaftsraums verarbeiten, erfolgt dies ausschließlich auf
Grundlage der von der Europäischen Kommission anerkannten
geeigneten Garantien gemäß Art. 44 ff. DSGVO.

7. Rechte der betroffenen Personen

Betroffene Personen haben insbesondere folgende Rechte:

- Auskunft über die verarbeiteten personenbezogenen Daten
- Berichtigung unrichtiger Daten
- Löschung personenbezogener Daten
- Einschränkung der Verarbeitung
- Datenübertragbarkeit
- Widerspruch gegen die Verarbeitung nach Maßgabe der gesetzlichen
  Vorschriften

Zur Ausübung dieser Rechte genügt eine Mitteilung an:
szonjakrizsan@gmail.com

8. Löschung des Benutzerkontos

Die Nutzerin bzw. der Nutzer kann das Benutzerkonto jederzeit
löschen.
Mit der Löschung des Kontos werden sämtliche personenbezogenen
Daten gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten
entgegenstehen.

9. Beschwerderecht

Betroffene Personen haben das Recht, sich bei einer
Datenschutzaufsichtsbehörde zu beschweren.
Da sich die verantwortliche Stelle in Ungarn befindet, ist
insbesondere zuständig: Nemzeti Adatvédelmi és Információszabadság
Hatóság (NAIH).
Darüber hinaus kann eine Beschwerde auch bei der
Datenschutzaufsichtsbehörde des gewöhnlichen Aufenthaltsortes, des
Arbeitsplatzes oder des Ortes des mutmaßlichen Datenschutzverstoßes
eingereicht werden.

10. Änderungen dieser Datenschutzerklärung

Der Anbieter behält sich vor, diese Datenschutzerklärung
anzupassen, sofern dies aufgrund gesetzlicher, technischer oder
organisatorischer Änderungen erforderlich wird.
Die jeweils aktuelle Fassung ist jederzeit innerhalb der Anwendung
abrufbar.

Gültig ab: Juni 2026
`,
  },
  contact: {
    title: "Impressum",
    body: `
Angaben gemäß § 5 DDG und § 18 Abs. 2 MStV

Betreiberin

Dr. Szonja Katalin Krizsán
H-9791 Torony
Akácos Str. 21
Ungarn
E-Mail: szonjakrizsan@gmail.com

Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV

Dr. Szonja Katalin Krizsán
Anschrift wie oben.

Diese Anwendung wird von einer in Ungarn ansässigen Privatperson
betrieben.
Derzeit erfolgt der Betrieb nicht im Rahmen eines Unternehmens.
Eine Umsatzsteuer-Identifikationsnummer (USt-IdNr.) besteht nicht.

Haben Sie Fragen zur Anwendung oder einen Fehler entdeckt?
Dann schreiben Sie gerne eine E-Mail an szonjakrizsan@gmail.com.
Ich bemühe mich, so schnell wie möglich zu antworten.
`,
  },
};

export function LegalScreen({ doc, onBack }: { doc: LegalDoc; onBack: () => void }) {
  const d = DOCS[doc];
  return (
    <div className="min-h-dvh bg-surface px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <button type="button" onClick={onBack}
          className="pressable mb-5 flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium"
          style={{ background: "rgb(86 176 187 / 0.12)", color: "#56b0bb" }}>
          <ArrowLeft className="h-4 w-4" /> Zurück
        </button>
        <h1 className="text-[18px] font-bold text-text-primary mb-4">{d.title}</h1>
        <div className="card-elevated rounded-2xl p-5">
          <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-text-secondary"
            style={{ fontFamily: "inherit" }}>
            {d.body.trim()}
          </pre>
        </div>
      </div>
    </div>
  );
}
