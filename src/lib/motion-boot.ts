/**
 * Runs before first paint. Enables motion unless the visitor prefers reduced motion,
 * and falls back to fully visible content if the observer hasn't started within 3.5 s.
 */
export const motionBootScript = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},3500)}catch(e){}})();`;
