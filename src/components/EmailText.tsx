/**
 * Shows an email address without ever splitting the domain (no "calmrestoredwellness.c / om").
 * On very narrow screens it may wrap once, after the "@", keeping each half whole.
 */
export default function EmailText({ address }: { address: string }) {
  const at = address.indexOf("@");
  if (at < 0) return <span className="whitespace-nowrap">{address}</span>;
  return (
    <>
      <span className="whitespace-nowrap">{address.slice(0, at + 1)}</span>
      <wbr />
      <span className="whitespace-nowrap">{address.slice(at + 1)}</span>
    </>
  );
}
