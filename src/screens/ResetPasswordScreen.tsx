import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Home, Eye, EyeOff } from "lucide-react";

export function ResetPasswordScreen({ onDone }: { onDone: () => void }) {
  const [password, setPassword]   = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError("");
    if (password.length < 6) { setError("Das Passwort muss mindestens 6 Zeichen lang sein."); return; }
    if (password !== password2) { setError("Die beiden Passwörter stimmen nicht überein."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
  if (error.message.includes("different from the old password")) {
    setError("Das neue Passwort darf nicht mit dem alten identisch sein.");
  } else {
    setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
  }
  return;
}
 await supabase.auth.signOut();
setSuccess(true);
setTimeout(onDone, 2000);
  }

  const inputCls = "w-full rounded-xl border bg-surface-inset px-4 py-3 pr-12 text-[13px] text-text-primary outline-none input-teal";
  const inputStyle = { borderColor: "rgb(86 176 187 / 0.25)" } as React.CSSProperties;

  return (
    <div className="min-h-dvh bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgb(99 190 162 / 0.15)", outline: "1px solid rgb(99 190 162 / 0.25)" }}>
            <Home className="h-6 w-6" style={{ color: "#63bea2" }} />
          </span>
          <div className="text-center">
            <h1 className="text-[18px] font-bold text-text-primary">Neues Passwort festlegen</h1>
            <p className="text-[12px] text-text-muted mt-0.5">Geben Sie Ihr neues Passwort ein</p>
          </div>
        </div>

        <div className="card-elevated rounded-2xl p-6 flex flex-col gap-4">
          {success ? (
            <p className="text-[13px] rounded-lg px-3 py-2 text-center"
              style={{ background: "rgb(90 191 138 / 0.12)", color: "#5abf8a" }}>
              Passwort geändert! Sie werden weitergeleitet…
            </p>
          ) : (
            <>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Neues Passwort" className={inputCls} style={inputStyle} />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: "rgb(143 168 158 / 0.8)" }}
                  aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <input type={showPassword ? "text" : "password"} value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Neues Passwort wiederholen" className={inputCls} style={inputStyle} />

              {error && (
                <p className="text-[12px] rounded-lg px-3 py-2"
                  style={{ background: "rgb(207 102 85 / 0.12)", color: "#cf6655" }}>
                  {error}
                </p>
              )}

              <button type="button" onClick={handleSubmit} disabled={loading}
                className="pressable w-full rounded-xl py-3 text-[13px] font-semibold transition-soft"
                style={{ background: "rgb(86 176 187 / 0.20)", color: "#56b0bb", outline: "1px solid rgb(86 176 187 / 0.30)" }}>
                {loading ? "..." : "Passwort speichern"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
