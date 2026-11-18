export function EstadoDashboard({ tipo, titulo, children, acao }) {
  return (
    <div className={`estado-dashboard estado-dashboard--${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
      <div className="estado-dashboard__marcador" aria-hidden="true" />
      <div className="estado-dashboard__conteudo">
        <strong>{titulo}</strong>
        {children && <p>{children}</p>}
        {acao}
      </div>
    </div>
  );
}
