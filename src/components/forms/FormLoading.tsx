export function FormLoading() {
  return (
    <div className="form-shell" aria-busy="true">
      <p className="muted" style={{ margin: 0 }}>
        Loading the form…
      </p>
    </div>
  );
}
