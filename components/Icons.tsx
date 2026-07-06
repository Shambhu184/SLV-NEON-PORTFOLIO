const SPRITE = `
<symbol id="logoMark" viewBox="0 0 64 64">
  <path d="M44 9.5 32 3 7 17.5v29L32 61l12-6.5" fill="none" stroke="#F7941D" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
  <g fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M31 15c-4-3.2-11-2-13 3-5.2 0-8.4 5-6.2 9.2-4 3-3 9.4 2 11.2-1 5.2 4.2 9.2 9.2 7 2 3 6.4 3 8.4.8"/>
    <path d="M16.5 25c3-1.8 6-.8 7.6 1.4"/>
    <path d="M15 33.5c3.8-.9 6.8.9 8.6 3.8"/>
    <path d="M21 43c3 .2 5.2-1.4 6.4-3.6"/>
    <path d="M26.5 17.5c2 6.2 1.4 14.6-.6 21.5"/>
  </g>
  <g fill="#F7941D" stroke="none">
    <circle cx="36.5" cy="20" r="2.5"/><circle cx="42" cy="15.5" r="1.7"/><circle cx="38.5" cy="28.5" r="2.1"/>
    <circle cx="45" cy="23.5" r="1.5"/><circle cx="36.8" cy="36.5" r="2.7"/><circle cx="43" cy="34" r="1.8"/>
    <circle cx="48.5" cy="29.5" r="1.2"/><circle cx="40" cy="44.5" r="2"/><circle cx="46" cy="42" r="1.3"/>
    <circle cx="51" cy="37" r="1"/><circle cx="50" cy="18.5" r="1"/><circle cx="54" cy="26.5" r="1.2"/>
  </g>
</symbol>
<symbol id="ic-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ic-spark" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></g></symbol>
<symbol id="ic-user" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c1.2-3.4 4-5 6.5-5s5.3 1.6 6.5 5"/></g></symbol>
<symbol id="ic-brain" viewBox="0 0 24 24">
  <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.6 5C13 3.5 9.8 4 9 6 6.8 6 5.3 8.2 6.2 10.1 4.4 11.4 4.5 14.2 6.6 15c-.3 2.3 2 4.2 4.2 3.3.9 1.2 2.9 1.3 3.8.2"/>
    <path d="M9.4 9.2c1.4-.6 2.8.1 3.4 1.3M8.6 13.2c1.7-.3 2.9.7 3.3 2"/>
  </g>
  <g fill="currentColor"><circle cx="17.3" cy="7.8" r="1.25"/><circle cx="19.4" cy="11.8" r="1"/><circle cx="17.7" cy="15.6" r="1.1"/><circle cx="20.6" cy="9.4" r=".65"/></g>
</symbol>
<symbol id="ic-wave" viewBox="0 0 24 24"><path d="M2 12h2.4l2-5.2 3 10.4 2.6-8.2 2 4.6 1.5-2.4H22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ic-chip" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="6.5" y="6.5" width="11" height="11" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21M3 9h3.5M3 15h3.5M17.5 9H21M17.5 15H21"/></g></symbol>
<symbol id="ic-net" viewBox="0 0 24 24"><g stroke="currentColor" stroke-width="1.4" fill="none"><path d="M5 7l7-2.5M12 4.5 19 7M5 7l3 9M19 7l-3 9M8 16h8M5 7l11 9M19 7 8 16"/></g><g fill="currentColor"><circle cx="5" cy="7" r="1.9"/><circle cx="12" cy="4.5" r="1.9"/><circle cx="19" cy="7" r="1.9"/><circle cx="8" cy="16" r="1.9"/><circle cx="16" cy="16" r="1.9"/></g></symbol>
<symbol id="ic-assist" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="9.5" cy="7" r="3"/><path d="M3.8 20c.8-3.6 3.1-5.4 5.7-5.4 1.2 0 2.3.4 3.2 1.1M16.2 9a4.5 4.5 0 0 1 0 6M19 7a8 8 0 0 1 0 10"/></g></symbol>
<symbol id="ic-chat" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.4 3.4c-.5.4-1.6.3-1.6-.6V6.5Z"/><path d="M8 9h8M8 12.5h5"/></g></symbol>
<symbol id="ic-speaker" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z"/><path d="M16.2 9a4.5 4.5 0 0 1 0 6M19 7a8.5 8.5 0 0 1 0 10"/></g></symbol>
<symbol id="ic-heart" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.4C7.2 16.8 3.5 13.5 3.5 9.6c0-2.8 2.1-4.6 4.5-4.6 1.6 0 3.1.8 4 2.2.9-1.4 2.4-2.2 4-2.2 2.4 0 4.5 1.8 4.5 4.6 0 3.9-3.7 7.2-8.5 10.8Z"/><path d="M12 9.3v5M9.5 11.8h5"/></g></symbol>
<symbol id="ic-shield" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.6v5.1c0 4.6-3 8.4-7 10.3-4-1.9-7-5.7-7-10.3V5.6L12 3Z"/><path d="m9 12 2.2 2.2L15.5 10"/></g></symbol>
<symbol id="ic-bank" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 4l9 5.5H3Z"/><path d="M5 12v6M9.3 12v6M14.7 12v6M19 12v6M3.5 20.5h17"/></g></symbol>
<symbol id="ic-cap" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z"/><path d="M6.5 11.8V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.2M21 10v5"/></g></symbol>
<symbol id="ic-phone" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="7.5" y="3" width="9" height="18" rx="2.4"/><path d="M10.8 5.6h2.4"/></g><circle cx="12" cy="18" r=".95" fill="currentColor"/></symbol>
<symbol id="ic-car" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 17h17l-1.6-5.4A2.4 2.4 0 0 0 16.6 10H7.4a2.4 2.4 0 0 0-2.3 1.6L3.5 17Z"/><path d="M8 13.4h8"/><circle cx="7.3" cy="17.8" r="1.7"/><circle cx="16.7" cy="17.8" r="1.7"/></g></symbol>
<symbol id="ic-vr" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7.5" width="18" height="9" rx="3"/><path d="M10 16.5c.5-1.2 1.2-1.8 2-1.8s1.5.6 2 1.8"/></g><circle cx="8.2" cy="12" r="1" fill="currentColor"/><circle cx="15.8" cy="12" r="1" fill="currentColor"/></symbol>
<symbol id="ic-target" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/></g><circle cx="12" cy="12" r="1.4" fill="currentColor"/></symbol>
<symbol id="ic-eye" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></g></symbol>
<symbol id="ic-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.2"/><path d="m4 7.5 8 5.6 8-5.6"/></g></symbol>
<symbol id="ic-call" viewBox="0 0 24 24"><path d="M5.5 4h3l1.6 4-2 1.5a12 12 0 0 0 5.4 5.4l1.5-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ic-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.4-6.5 10-6.5 10Z"/><circle cx="12" cy="11" r="2.3"/></g></symbol>
<symbol id="ic-loop" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 9.2A8.6 8.6 0 1 0 21 13.6"/><path d="M21 4.6V9.2h-4.6"/></g></symbol>
<symbol id="ic-in" viewBox="0 0 24 24"><path d="M5 9.5h2.6V19H5zM6.3 4.9a1.55 1.55 0 1 1 0 3.1 1.55 1.55 0 0 1 0-3.1ZM10 9.5h2.5v1.3c.5-.9 1.5-1.6 3-1.6 2.3 0 3.5 1.4 3.5 4V19h-2.6v-5.1c0-1.4-.6-2.2-1.8-2.2-1.3 0-2 .9-2 2.2V19H10z" fill="currentColor"/></symbol>
<symbol id="ic-x" viewBox="0 0 24 24"><path d="M4 4l7 8.8L4.4 20H7l5-6 4.7 6H20l-7.3-9.2L19.4 4H17l-4.6 5.5L8.2 4H4Z" fill="currentColor"/></symbol>
<symbol id="ic-yt" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 9.8v4.4l4-2.2-4-2.2Z" fill="currentColor"/></symbol>
`;

export function IconDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: `<defs>${SPRITE}</defs>` }}
    />
  );
}

export function Icon({ id, size = 20, className }: { id: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href="#logoMark" />
    </svg>
  );
}
