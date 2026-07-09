import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Flame } from 'lucide-react';
import './StaggeredMenu.css';

export default function StaggeredMenu({
  isOpen,
  onClose,
  links = [],
  activeNav = '',
  setActiveNav
}) {
  const menuRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when menu is active
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.set(menuRef.current, { display: 'flex' })
        .to(layer1Ref.current, { x: '0%', duration: 0.45, ease: 'power3.inOut' })
        .to(layer2Ref.current, { x: '0%', duration: 0.45, ease: 'power3.inOut' }, '-=0.3')
        .to(layer3Ref.current, { x: '0%', duration: 0.45, ease: 'power3.inOut' }, '-=0.3')
        .fromTo(
          linksRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
          '-=0.1'
        );
    } else {
      document.body.style.overflow = 'auto';
      
      const tl = gsap.timeline();
      tl.to(linksRef.current, { x: 40, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'power2.in' })
        .to(layer3Ref.current, { x: '100%', duration: 0.4, ease: 'power3.inOut' }, '-=0.1')
        .to(layer2Ref.current, { x: '100%', duration: 0.4, ease: 'power3.inOut' }, '-=0.28')
        .to(layer1Ref.current, { x: '100%', duration: 0.4, ease: 'power3.inOut' }, '-=0.28')
        .set(menuRef.current, { display: 'none' });
    }
  }, [isOpen]);

  const handleLinkClick = (id) => {
    setActiveNav(id);
    onClose();
  };

  return (
    <div ref={menuRef} className="staggered-menu-overlay">
      {/* 3 Transition Panels (Red, White, Black) */}
      <div ref={layer1Ref} className="menu-layer menu-layer-1" />
      <div ref={layer2Ref} className="menu-layer menu-layer-2" />
      <div ref={layer3Ref} className="menu-layer menu-layer-3" />

      {/* Menu Overlay Content */}
      <div className="menu-content">
        <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">
          <X className="w-5 h-5" />
        </button>

        <div className="menu-header">
          <Flame className="menu-brand-logo" />
          <span className="menu-brand-name">
            VIPUL<span className="brand-accent">CHINMAY</span>
          </span>
        </div>

        <nav className="menu-links">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => (linksRef.current[index] = el)}
              className={`menu-link-item ${activeNav === link.id ? 'active' : ''}`}
              onClick={() => handleLinkClick(link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="menu-footer">
          <span className="menu-footer-label">Available for AI/ML roles</span>
          <a href="mailto:m.sai.vipul.18@gmail.com" className="menu-footer-mail">
            m.sai.vipul.18@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
